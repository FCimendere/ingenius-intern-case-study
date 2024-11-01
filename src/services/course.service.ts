import fs from "fs/promises";
import path from "path";
import { Course, CourseUpdateData } from "../types/course.types";

const coursesPath = path.join(__dirname, "..", "data", "courses.json");
const modulesPath = path.join(__dirname, "..", "data", "modules.json");
const lessonsPath = path.join(__dirname, "..", "data", "lessons.json");

export const readCourses = async (): Promise<Course[]> => {
  try {
    const data = await fs.readFile(coursesPath, "utf-8");
    if (!data || data.trim() === "") {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getNextCourseId = async (): Promise<number> => {
  const courses = await readCourses();
  return courses.length > 0
    ? Math.max(...courses.map((course) => course.id)) + 1
    : 1;
};

export const writeCourses = async (data: Course[]): Promise<void> => {
  await fs.writeFile(coursesPath, JSON.stringify(data, null, 2));
};

export const writeModules = async (data: Course[]): Promise<void> => {
  const dataObj = await readCourses();

  const moduleData = {
    modules: dataObj.flatMap((course) =>
      course.modules.map((module, moduleIndex) => ({
        moduleId: `${course.id}-${moduleIndex + 1}`,
        title: module.title,
      }))
    ),
  };

  await fs.writeFile(modulesPath, JSON.stringify(moduleData, null, 2));
};

export const writeLessons = async (data: Course[]): Promise<void> => {
  const dataObj = await readCourses();

  const lessonData = {
    lessons: dataObj.flatMap((course) =>
      course.modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
          lessonId: `${course.id}-${moduleIndex + 1}-${lessonIndex + 1}`, // Ders ID'si
          title: lesson.title,
          description: lesson.description || "",
          topics: lesson.topics,
        }))
      )
    ),
  };

  console.log(JSON.stringify(lessonData, null, 2));
  await fs.writeFile(lessonsPath, JSON.stringify(lessonData, null, 2));
};

export const findAll = async (): Promise<Course[]> => {
  return await readCourses();
};

export const findCourseById = async (
  courseId: number
): Promise<Course | undefined> => {
  const courses = await readCourses();
  const course = courses.find((c) => c.id == courseId);

  return course;
};

export const create = async (courseData: CourseUpdateData): Promise<Course> => {
  const courses = await readCourses();
  const newCourse: Course = {
    id: await getNextCourseId(),
    ...courseData,
  };

  courses.push(newCourse);
  await writeCourses(courses);
  await writeModules(courses);
  await writeLessons(courses);

  return newCourse;
};

export const updateCourseService = async (
  courseId: number,
  updateData: Partial<Course>
): Promise<Course | null> => {
  const courses = await readCourses();
  const index = courses.findIndex((c) => c.id === courseId);

  if (index === -1) {
    return null;
  }

  // Update the course
  const updatedCourse: Course = {
    ...courses[index],
    ...updateData,
    id: courses[index].id,
  };

  courses[index] = updatedCourse;
  await writeCourses(courses);
  await writeModules(courses);
  await writeLessons(courses);

  return updatedCourse;
};

export const deleteCourse = async (id: number): Promise<void> => {
  let courses = await readCourses();
  const courseExists = courses.some((c) => c.id === id);
  if (courseExists) {
    courses = courses.filter((c) => c.id !== id);
    await writeCourses(courses);
    await writeModules(courses);
    await writeLessons(courses);
    return;
  }
  throw new Error("No record found to delete");
};

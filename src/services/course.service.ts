import fs from "fs/promises";
import path from "path";
import { Course, CourseUpdateData } from "../types/course.types";

const coursesPath = path.join(__dirname, "..", "data", "courses.json");

export const readData = async (): Promise<Course[]> => {
  try {
    const data = await fs.readFile(coursesPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // TODO: add log
    throw error;
  }
};

export const writeData = async (data: Course[]): Promise<void> => {
  await fs.writeFile(coursesPath, JSON.stringify(data, null, 2));
};

// export const findAll = async (): Promise<Course[]> => {
//   const courses = await readData();
//   return courses;
// };

export const findAll = async (): Promise<Course[]> => {
  return await readData();
};

export const findCourseById = async (
  courseId: number
): Promise<Course | undefined> => {
  const courses = await readData();
  const course = courses.find((c) => c.id == courseId);

  return course;
};

export const create = async (courseData: CourseUpdateData): Promise<Course> => {
  const courses = await readData();
  const newCourse: Course = {
    id: courses[courses.length - 1].id + 1,
    ...courseData,
  };

  courses.push(newCourse);
  await writeData(courses);

  return newCourse;
};

export const updateCourseService = async (
  courseId: number,
  updateData: Partial<Course>
): Promise<Course | null> => {
  const courses = await readData();
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
  await writeData(courses);

  return updatedCourse;
};

export const deleteCourse = async (id: number): Promise<void> => {
  let courses = await readData();
  const courseExists = courses.some((c) => c.id === id);
  if (courseExists) {
    courses = courses.filter((c) => c.id !== id);
    await writeData(courses);
    return;
  }
  throw new Error("No record  found to delete");
};

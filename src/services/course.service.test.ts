import fs from "fs/promises";
import path from "path";
import {
  create,
  findAll,
  findCourseById,
  updateCourseService,
  deleteCourse,
  writeCourses,
} from "../services/course.service";
import { Course, CourseUpdateData } from "../types/course.types";

jest.mock("fs/promises");

const coursesPath = path.join(__dirname, "..", "data", "courses.json");

describe("Course Service", () => {
  const mockCourse: Course = {
    id: 1,
    title: "Test Course",
    description: "Test Description",
    modules: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should read all courses", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );

    const courses = await findAll();

    expect(courses).toEqual([mockCourse]);
    expect(fs.readFile).toHaveBeenCalledWith(coursesPath, "utf-8");
  });

  test("should find a course by ID", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );

    const course = await findCourseById(1);

    expect(course).toEqual(mockCourse);
  });

  test("should create a new course", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
    (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

    const newCourseData: CourseUpdateData = {
      title: "New Course",
      description: "New Course Description",
      modules: [],
    };

    const newCourse = await create(newCourseData);

    expect(newCourse).toHaveProperty("id");
    expect(newCourse.title).toBe("New Course");
    expect(fs.writeFile).toHaveBeenCalledTimes(3);
  });

  test("should update an existing course", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );
    (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

    const updatedCourse = await updateCourseService(1, {
      title: "Updated Course",
    });

    expect(updatedCourse).toHaveProperty("title", "Updated Course");
    expect(fs.writeFile).toHaveBeenCalledTimes(3);
  });

  test("should return null when updating a non-existing course", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );

    const updatedCourse = await updateCourseService(2, {
      title: "Non-Existing Course",
    });

    expect(updatedCourse).toBeNull();
  });

  test("should delete a course", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );
    (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

    await deleteCourse(1);

    expect(fs.writeFile).toHaveBeenCalledTimes(3);
  });

  test("should throw an error when deleting a non-existing course", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockCourse])
    );

    await expect(deleteCourse(2)).rejects.toThrow("No record found to delete");
  });
});

import { Request, Response } from "express";
import * as service from "../services/course.service"; // Servis dosyanızın yolu
import { courseUpdateSchema } from "../schemas/course.schema";
import { CourseUpdateData, CourseParams } from "../types/course.types";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await service.findAll();
    console.log(`all: ${courses}`);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId: number = parseInt(req.params.id, 10);
    const course = await service.findCourseById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course" });
  }
};

export const createCourse = async (
  req: Request<{}, {}, CourseUpdateData>,
  res: Response
) => {
  const { error, value } = courseUpdateSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  try {
    const newCourse = await service.create(value);
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (
  req: Request<CourseParams, {}, Partial<CourseUpdateData>>,
  res: Response
) => {
  try {
    const courseId = parseInt(req.params.id);
    const updateData = req.body;

    // Call servise
    const updatedCourse = await service.updateCourseService(
      courseId,
      updateData
    );

    if (!updatedCourse) {
      res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await service.deleteCourse(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

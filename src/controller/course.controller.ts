import { Request, Response } from "express";
import * as service from "../services/course.service";
import { courseUpdateSchema } from "../schemas/course.schema";
import { CourseUpdateData, CourseParams } from "../types/course.types";

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await service.findAll();
    console.log(`all: ${courses}`);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course data
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Course not found
 */
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

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
 *       500:
 *         description: Error creating course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating course"
 */
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

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Error updating course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating course"
 */
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

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the course to delete
 *     responses:
 *       204:
 *         description: Course deleted successfully (No content returned)
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Error deleting course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting course"
 */
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await service.deleteCourse(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

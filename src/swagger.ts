import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course API",
      version: "1.0.0",
      description:
        "API Documentation for managing courses, modules, lessons, and content",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      schemas: {
        Course: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Introduction to Programming" },
            description: {
              type: "string",
              example: "A beginner-friendly course on programming",
            },
            modules: {
              type: "array",
              items: { $ref: "#/components/schemas/Module" },
            },
          },
        },
        Module: {
          type: "object",
          properties: {
            title: { type: "string", example: "Getting Started" },
            lessons: {
              type: "array",
              items: { $ref: "#/components/schemas/Lesson" },
            },
          },
        },
        Lesson: {
          type: "object",
          properties: {
            title: { type: "string", example: "Lesson 1: Basics" },
            description: {
              type: "string",
              example: "An overview of the basics",
            },
            topics: {
              type: "array",
              items: { type: "string", example: "Variables" },
            },
            content: {
              type: "array",
              items: { $ref: "#/components/schemas/Content" },
            },
          },
        },
        Content: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["text", "video", "audio"],
              example: "video",
            },
            data: { type: "string", example: "https://example.com/video.mp4" },
          },
        },
        CourseUpdateData: {
          type: "object",
          properties: {
            title: { type: "string", example: "Updated Course Title" },
            description: {
              type: "string",
              example: "Updated course description",
            },
            modules: {
              type: "array",
              items: { $ref: "#/components/schemas/Module" },
            },
          },
        },
      },
    },
  },
  apis: ["./src/controller/*.ts", "./src/routes/*.ts"], // Swagger açıklamalarını içeren dosyalar
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

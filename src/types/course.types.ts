export interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  description?: string;
  topics: string[];
  content: Content[];
}

export interface Content {
  type: "text" | "video" | "audio";
  data: string;
}

// This type excludes 'id' from the Course type for update operations
export type CourseUpdateData = Omit<Course, "id">;

export interface CourseParams {
  id: string;
}

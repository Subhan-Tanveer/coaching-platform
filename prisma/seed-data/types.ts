export type QuizQuestionSeed = {
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D";
};

export type QuizSeed = {
  title: string;
  questions: QuizQuestionSeed[];
};

export type LessonSeed = {
  slug: string;
  title: string;
  estimatedMinutes: number;
  content: string;
};

export type ModuleSeed = {
  title: string;
  lessons: LessonSeed[];
  quiz?: QuizSeed;
};

export type CourseContentSeed = {
  courseSlug: string;
  courseTitle: string;
  courseDescription: string;
  modules: ModuleSeed[];
};

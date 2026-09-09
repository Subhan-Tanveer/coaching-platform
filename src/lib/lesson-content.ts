/**
 * The body a brand-new lesson starts with, kept in one place so the admin list
 * can tell which lessons still hold the untouched placeholder.
 */
export const LESSON_PLACEHOLDER = "Start writing this lesson's content here.";

export function newLessonContent(title: string): string {
  return `# ${title}\n\n${LESSON_PLACEHOLDER}`;
}

export function isUnwritten(content: string): boolean {
  return content.trimEnd().endsWith(LESSON_PLACEHOLDER);
}

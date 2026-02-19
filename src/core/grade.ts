export type GradeResult = {
  correct: boolean;
  expected: string | null;
};

export function gradeInput(
  expected: string | null,
  input: string,
): GradeResult {
  if (!expected) {
    return { correct: false, expected };
  }

  return {
    correct: input === expected,
    expected,
  };
}

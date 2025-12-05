import AggregationMarks from "../modules/marks/models/AggregationMarks.js";
import StudentMarks from "../modules/marks/models/StudentMarks.js";

export const averageMarkCalculation = async (studentId) => {
  // Fetch all subject marks for the student
  const studentMarks = await StudentMarks.findAll({
    where: { studentId },
  });

  // Fetch the student's aggregation row
  const studentAverageMarks = await AggregationMarks.findOne({
    where: { studentId },
  });

  // If no aggregation row exists → skip silently or create one
  if (!studentAverageMarks) {
    console.warn(`AggregationMarks row not found for studentId: ${studentId}`);
    return;
  }

  // If no subject marks → mark as 0
  if (!studentMarks.length) {
    await studentAverageMarks.update({ resultMark: 0 });
    return;
  }

  // Calculate total and average
  const markSum = studentMarks.reduce(
    (acc, subject) => acc + subject.subjectMark,
    0
  );

  const numOfSub = studentMarks.length;
  const resultMark = markSum / numOfSub;

  // Update aggregation mark
  await studentAverageMarks.update({ resultMark });

  return resultMark; // optional return
};

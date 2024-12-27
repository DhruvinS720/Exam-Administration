const mongoose = require("mongoose");

const studentExamResponseSchema = new Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateExam",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responses: [
      {
        questionId: { type: Number, required: true },
        selectedAnswer: { type: String, required: true },
      },
    ],
    result: {
      totalQuestions: { type: Number, required: true },
      correctAnswers: { type: Number, required: true },
      percentage: { type: Number, required: true },
      status: { type: String, enum: ["Pass", "Fail"], required: true },
    },
  },
  { timestamps: true }
);

const StudentExamResponse = mongoose.model(
  "StudentExamResponse",
  studentExamResponseSchema
);

module.exports = StudentExamResponse;

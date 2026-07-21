import express from "express";

import { protectroute } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/file.middleware.js";

import {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  protectroute,
  upload.single("resume"),
  generateInterViewReportController
);

interviewRouter.get(
  "/report/:interviewId",
  protectroute,
  getInterviewReportByIdController
);

interviewRouter.get(
  "/",
 protectroute,
  getAllInterviewReportsController
);

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  protectroute,
  generateResumePdfController
);

export default interviewRouter;
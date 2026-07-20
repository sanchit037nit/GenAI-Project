import { create } from "zustand";

import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../store/interview.api";

export const useInterviewStore = create((set, get) => ({
  loading: false,
  report: null,
  reports: [],

  setLoading: (loading) => set({ loading }),
  setReport: (report) => set({ report }),
  setReports: (reports) => set({ reports }),

  generateReport: async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    set({ loading: true });

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      set({
        report: response.interviewReport,
        loading: false,
      });

      return response.interviewReport;
    } catch (error) {
      console.log(error);
      set({ loading: false });
      return null;
    }
  },

  getReportById: async (interviewId) => {
    set({ loading: true });

    try {
      const response = await getInterviewReportById(interviewId);

      set({
        report: response.interviewReport,
        loading: false,
      });

      return response.interviewReport;
    } catch (error) {
      console.log(error);
      set({ loading: false });
      return null;
    }
  },

  getReports: async () => {
    set({ loading: true });

    try {
      const response = await getAllInterviewReports();

      set({
        reports: response.interviewReports,
        loading: false,
      });

      return response.interviewReports;
    } catch (error) {
      console.log(error);
      set({ loading: false });
      return [];
    }
  },

  getResumePdf: async (interviewReportId) => {
    set({ loading: true });

    try {
      const response = await generateResumePdf({
        interviewReportId,
      });

      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: "application/pdf",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewReportId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
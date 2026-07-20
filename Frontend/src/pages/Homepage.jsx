import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterviewStore } from "../store/useInterviewStore";
import './Home.css'

const Home = () => {
  const loading = useInterviewStore((state) => state.loading);
  const reports = useInterviewStore((state) => state.reports);
  const generateReport = useInterviewStore((state) => state.generateReport);
  const getReports = useInterviewStore((state) => state.getReports);

  const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="home-page">

      {/* Main Card */}
<div className="interview-card">

    <div className="card-header">

        <div>

            <span className="card-badge">
                🤖 AI Strategy Builder
            </span>

            <h2>
                Build Your Personalized Interview Plan
            </h2>

            <p>
                Fill in the job description and tell us about yourself.
                Our AI will generate a customized interview roadmap.
            </p>

        </div>

    </div>

    <div className="interview-card__body">

        {/* LEFT */}

        <div className="panel">

            <div className="panel-header">

                <div className="panel-title">

                    <div className="panel-icon">
                        💼
                    </div>

                    <div>

                        <h3>
                            Target Job Description
                        </h3>

                        <small>
                            Paste the complete job description
                        </small>

                    </div>

                </div>

                <span className="required-badge">
                    Required
                </span>

            </div>

            <textarea
                value={jobDescription}
                onChange={(e)=>setJobDescription(e.target.value)}
                className="modern-textarea"
                placeholder={`Paste the job description...

Example:

Senior Frontend Engineer

Skills:
• React
• Node.js
• TypeScript
• System Design

Responsibilities:
• Build scalable applications
• Optimize performance
• Lead frontend development`}
                maxLength={5000}
            />

            <div className="char-counter">

                {jobDescription.length} / 5000

            </div>

        </div>

        {/* RIGHT */}

        <div className="panel">

            <div className="panel-header">

                <div className="panel-title">

                    <div className="panel-icon">
                        👤
                    </div>

                    <div>

                        <h3>
                            Your Profile
                        </h3>

                        <small>
                            Help AI personalize your interview plan
                        </small>

                    </div>

                </div>

            </div>

            {/* Resume */}

            <div className="upload-box">

                <div className="upload-top">

                    <h4>
                        📄 Resume
                    </h4>

                    <span className="best-badge">

                        Best Results

                    </span>

                </div>

                <label
                    htmlFor="resume"
                    className="upload-area"
                >

                    <div className="upload-circle">

                        ☁️

                    </div>

                    <h4>

                        Upload Resume

                    </h4>

                    <p>

                        Click or drag your resume here

                    </p>

                    <small>

                        PDF • DOC • DOCX

                    </small>

                    {selectedFile && (

                        <div className="file-chip">

                            ✅ {selectedFile.name}

                        </div>

                    )}

                    <input

                        hidden

                        ref={resumeInputRef}

                        id="resume"

                        type="file"

                        accept=".pdf,.doc,.docx"

                        onChange={(e)=>{

                            setSelectedFile(e.target.files[0])

                        }}

                    />

                </label>

            </div>

            <div className="divider">

                <span>

                    OR

                </span>

            </div>

            <div className="self-desc">

                <label>

                    ✍️ Quick Self Description

                </label>

                <textarea

                    value={selfDescription}

                    onChange={(e)=>setSelfDescription(e.target.value)}

                    className="modern-textarea small"

                    placeholder={`Example:

• 3rd year CSE student

• Strong in DSA

• MERN Developer

• 2 internships

• Interested in Backend Development

• 450+ Leetcode Problems

• React • Node • MongoDB • SQL

`}

                />

            </div>

            <div className="info-card">

                💡 Uploading a resume provides more accurate interview plans and ATS analysis.

            </div>

        </div>

    </div>

    <div className="card-footer">

        <div>

            <h3>

                Ready?

            </h3>

            <p>

                AI needs around 20–30 seconds to generate your roadmap.

            </p>

        </div>

        <button

            onClick={handleGenerateReport}

            className="generate-btn"

        >

            ✨ Generate AI Strategy

        </button>

    </div>

</div>
      {/* Recent Reports */}
    {reports.length > 0 && (
  <section className="recent-reports">
    <div className="reports-header">
      <div>
        <span className="reports-badge">📊 Dashboard</span>
        <h2>Recent Interview Plans</h2>
        <p>Continue preparing from where you left off.</p>
      </div>

      <span className="reports-count">
        {reports.length} Report{reports.length > 1 ? "s" : ""}
      </span>
    </div>

    <div className="reports-grid">
      {reports.map((report) => {
        const score = report.matchScore || 0;

        return (
          <div
            key={report._id}
            className="report-card"
            onClick={() => navigate(`/interview/${report._id}`)}
          >
            <div className="report-top">
              <div className="report-icon">💼</div>

              <span className="report-date">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h3>{report.title || "Untitled Position"}</h3>

            <div className="score-wrapper">
              <div className="progress-bar">
                <div
                  className={`progress-fill ${
                    score >= 80
                      ? "high"
                      : score >= 60
                      ? "mid"
                      : "low"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>

              <span className="score-text">{score}%</span>
            </div>

            <p
              className={`status ${
                score >= 80
                  ? "status-high"
                  : score >= 60
                  ? "status-mid"
                  : "status-low"
              }`}
            >
              {score >= 80
                ? "🟢 Excellent Match"
                : score >= 60
                ? "🟡 Good Match"
                : "🔴 Needs Improvement"}
            </p>

            <button className="open-report-btn">
              Open Report →
            </button>
          </div>
        );
      })}
    </div>
  </section>
)}
      {/* Footer */}
      <footer className="page-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
          </footer>
          
    </div>
  );
};

export default Home;
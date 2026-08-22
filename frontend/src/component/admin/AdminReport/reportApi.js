import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8083";


// =====================================================
// GET ALL STUDENTS
// =====================================================

export async function getReportStudents() {

  const response = await axios.get(
    `${API_URL}/admin/report-students`
  );

  return response.data.students || [];
}


// =====================================================
// GET STUDENT
// =====================================================

export async function getReportStudent(code) {

  const response = await axios.get(
    `${API_URL}/admin/report-student/${encodeURIComponent(code)}`
  );

  return response.data.student;
}


// =====================================================
// CREATE REPORT
// =====================================================

export async function createReport(report) {

  const response = await axios.post(
    `${API_URL}/admin/reports`,
    report
  );

  return response.data;
}


// =====================================================
// GET STUDENT REPORTS
// =====================================================

export async function getStudentReports(code) {

  const response = await axios.get(
    `${API_URL}/reports/student/${encodeURIComponent(code)}`
  );

  return response.data.reports || [];
}


// =====================================================
// DELETE REPORT
// =====================================================

export async function deleteReport(id) {

  const response = await axios.delete(
    `${API_URL}/admin/reports/${id}`
  );

  return response.data;
}


// =====================================================
// UPDATE REPORT
// =====================================================

export async function updateReport(id, report) {

  const response = await axios.put(
    `${API_URL}/admin/reports/${id}`,
    report
  );

  return response.data;
}
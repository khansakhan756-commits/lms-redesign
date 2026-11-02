export interface StudentProfile {
  name: string;
  fatherName: string;
  rollNo: string;
  cnic: string;
  enrollmentNo: string;
  degreeProgram: string;
  department: string;
  faculty: string;
  campus: string;
  shift: 'Morning' | 'Evening';
  semester: string;
  academicSession: string;
  bloodGroup: string;
  district: string;
  mobile: string;
  email: string;
  avatarUrl: string;
  guardianContact: string;
  currentAddress: string;
}

export interface ProgramOption {
  id: string;
  name: string;
  degree: string;
  department: string;
  batch: string;
  shift: 'Morning' | 'Evening';
  status: 'Active' | 'Completed' | 'Enrolled';
  isCurrent: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  theoryCredit: number;
  labCredit: number;
  instructor: string;
  semester: string;
  type: 'Compulsory' | 'Elective' | 'Core' | 'Major';
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface VirtualCourseMaterial {
  id: string;
  courseCode: string;
  title: string;
  type: 'PDF' | 'Slide' | 'Doc' | 'Code';
  size: string;
  uploadDate: string;
  downloadUrl: string;
}

export interface VirtualAssignment {
  id: string;
  courseCode: string;
  title: string;
  assignedDate: string;
  dueDate: string;
  totalMarks: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  submittedFile?: string;
  grade?: string;
}

export interface AttendanceDetail {
  date: string;
  day: string;
  timeSlot: string;
  topic: string;
  status: 'Present' | 'Absent' | 'Leave';
}

export interface ExamResultCourse {
  code: string;
  title: string;
  creditHours: number;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  remarks: string;
}

export interface SemesterResult {
  semesterName: string;
  examSession: string;
  gpa: number;
  cgpa: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: 'PASS' | 'PROMOTED' | 'FAIL';
  courses: ExamResultCourse[];
}

export interface FeeChallan {
  challanNo: string;
  title: string;
  feeType: 'Tuition Fee' | 'Semester Examination' | 'Hostel Fee' | 'Enrolment Fee' | 'Degree Fee';
  semester: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'PAID' | 'UNPAID';
  bankName: string;
  branchName: string;
  accountNo: string;
  breakdown: { item: string; amount: number }[];
}

export interface Scholarship {
  id: string;
  title: string;
  sponsor: string;
  stipendAmount: string;
  eligibility: string;
  deadline: string;
  category: 'Need-based' | 'Merit-based' | 'Government' | 'Indigenous';
  status: 'Open' | 'Under Review' | 'Selected' | 'Closed';
  appliedDate?: string;
  trackingId?: string;
}

export interface DownloadForm {
  id: string;
  title: string;
  category: 'Academics' | 'Examination' | 'Transport' | 'General' | 'Hostel';
  size: string;
  format: string;
  revisedDate: string;
  fileName: string;
}

export interface EvaluationQuestion {
  id: number;
  text: string;
  rating: number; // 1 to 5
}

export interface PointBus {
  pointNo: number;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  contactNo: string;
  capacity: number;
  morningPickupTime: string;
  campusArrivalTime: string;
  eveningDepartureTime: string;
  stops: string[];
}

export interface KohaBook {
  accessionNo: string;
  title: string;
  author: string;
  callNo: string;
  isbn: string;
  edition: string;
  status: 'Available' | 'Checked Out';
  borrowDate?: string;
  dueDate?: string;
  fineAmount?: number;
}

export interface HostelDetails {
  hostelName: string;
  roomNo: string;
  bedNo: string;
  block: string;
  provostName: string;
  wardenName: string;
  wardenContact: string;
  messCardStatus: 'Active' | 'Expired';
  allotmentDate: string;
  validTill: string;
}

export interface CovidVaccineDetails {
  certificateNo: string;
  cnic: string;
  doses: {
    doseNumber: number;
    vaccineName: string;
    date: string;
    center: string;
  }[];
  booster?: {
    vaccineName: string;
    date: string;
    center: string;
  };
  verificationStatus: 'VERIFIED' | 'PENDING';
}

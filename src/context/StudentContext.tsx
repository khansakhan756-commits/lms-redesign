import React, { createContext, useContext, useState } from 'react';
import {
  StudentProfile,
  ProgramOption,
  VirtualAssignment,
  FeeChallan,
} from '../types';
import {
  initialStudentProfile,
  availablePrograms,
  courseAssignments,
  feeChallans,
  hostelChallans,
} from '../data/mockData';

interface StudentContextType {
  student: StudentProfile;
  programs: ProgramOption[];
  activeProgram: ProgramOption;
  isAuthenticated: boolean;
  assignments: VirtualAssignment[];
  academicChallans: FeeChallan[];
  hostelFeeChallans: FeeChallan[];
  submittedEvaluations: string[];
  isHECSurveySubmitted: boolean;
  switchProgram: (id: string) => void;
  updateAvatar: (newUrl: string) => void;
  login: (rollOrCnic: string, pass: string) => boolean;
  logout: () => void;
  submitAssignment: (assignmentId: string, fileName: string) => void;
  submitCourseEvaluation: (courseCode: string) => void;
  submitHECSurvey: () => void;
  payChallan: (challanNo: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(initialStudentProfile);
  const [programs, setPrograms] = useState<ProgramOption[]>(availablePrograms);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<VirtualAssignment[]>(courseAssignments);
  const [academicChallans, setAcademicChallans] = useState<FeeChallan[]>(feeChallans);
  const [hostelFeeChallans, setHostelFeeChallans] = useState<FeeChallan[]>(hostelChallans);
  const [submittedEvaluations, setSubmittedEvaluations] = useState<string[]>(['IT-414']);
  const [isHECSurveySubmitted, setIsHECSurveySubmitted] = useState<boolean>(false);

  const activeProgram = programs.find((p) => p.isCurrent) || programs[0];

  const switchProgram = (id: string) => {
    setPrograms((prev) =>
      prev.map((prog) => ({
        ...prog,
        isCurrent: prog.id === id,
      }))
    );
  };

  const updateAvatar = (newUrl: string) => {
    setStudent((prev) => ({
      ...prev,
      avatarUrl: newUrl,
    }));
  };

  const login = (rollOrCnic: string, _pass: string) => {
    if (rollOrCnic.trim()) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const submitAssignment = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              status: 'Submitted',
              submittedFile: fileName,
            }
          : asg
      )
    );
  };

  const submitCourseEvaluation = (courseCode: string) => {
    setSubmittedEvaluations((prev) => [...prev, courseCode]);
  };

  const submitHECSurvey = () => {
    setIsHECSurveySubmitted(true);
  };

  const payChallan = (challanNo: string) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    setAcademicChallans((prev) =>
      prev.map((ch) =>
        ch.challanNo === challanNo
          ? { ...ch, status: 'PAID', paidDate: today }
          : ch
      )
    );
    setHostelFeeChallans((prev) =>
      prev.map((ch) =>
        ch.challanNo === challanNo
          ? { ...ch, status: 'PAID', paidDate: today }
          : ch
      )
    );
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        programs,
        activeProgram,
        isAuthenticated,
        assignments,
        academicChallans,
        hostelFeeChallans,
        submittedEvaluations,
        isHECSurveySubmitted,
        switchProgram,
        updateAvatar,
        login,
        logout,
        submitAssignment,
        submitCourseEvaluation,
        submitHECSurvey,
        payChallan,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

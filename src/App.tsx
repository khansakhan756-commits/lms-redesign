import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider, useStudent } from './context/StudentContext';
import { MainLayout } from './components/MainLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { LMSDashboardPage } from './pages/LMSDashboardPage';
import { EportalDashboardPage } from './pages/EportalDashboardPage';
import { ChooseProgramPage } from './pages/ChooseProgramPage';
import { VirtualClassRoomPage } from './pages/VirtualClassRoomPage';
import { AttendancePage } from './pages/AttendancePage';
import { CourseSelectionExamFormPage } from './pages/CourseSelectionExamFormPage';
import { ExamsResultNoticeBoardPage } from './pages/ExamsResultNoticeBoardPage';
import { AdmissionPaymentPage } from './pages/AdmissionPaymentPage';
import { ScholarshipPage } from './pages/ScholarshipPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { CourseEvaluationPage } from './pages/CourseEvaluationPage';
import { HECSurveyPage } from './pages/HECSurveyPage';
import { PointsLocationsPage } from './pages/PointsLocationsPage';
import { KohaLibraryPage } from './pages/KohaLibraryPage';
import { HostelPage } from './pages/HostelPage';
import { CovidVaccinePage } from './pages/CovidVaccinePage';
import { UpdateProfileImagePage } from './pages/UpdateProfileImagePage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useStudent();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LMSDashboardPage />} />
        <Route path="eportal" element={<EportalDashboardPage />} />
        <Route path="choose-program" element={<ChooseProgramPage />} />
        <Route path="virtual-classroom" element={<VirtualClassRoomPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="course-selection" element={<CourseSelectionExamFormPage />} />
        <Route path="results" element={<ExamsResultNoticeBoardPage />} />
        <Route path="admission-payments" element={<AdmissionPaymentPage />} />
        <Route path="scholarship" element={<ScholarshipPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="course-evaluation" element={<CourseEvaluationPage />} />
        <Route path="hec-survey" element={<HECSurveyPage />} />
        <Route path="points-locations" element={<PointsLocationsPage />} />
        <Route path="koha-library" element={<KohaLibraryPage />} />
        <Route path="hostel" element={<HostelPage />} />
        <Route path="covid-vaccine" element={<CovidVaccinePage />} />
        <Route path="update-profile-image" element={<UpdateProfileImagePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StudentProvider>
  );
}

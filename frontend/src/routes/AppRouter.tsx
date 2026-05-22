import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "../components/layout/AppShell";
import { LoadingState } from "../components/common/LoadingState";
import { ProtectedRoute } from "./ProtectedRoute";

const AuthPage = lazy(() => import("../pages/AuthPage").then((module) => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("../pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const RoadmapPage = lazy(() => import("../pages/RoadmapPage").then((module) => ({ default: module.RoadmapPage })));
const AIMentorPage = lazy(() => import("../pages/AiMentorPage").then((module) => ({ default: module.AiMentorPage })));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })));
const CommunityPage = lazy(() => import("../pages/CommunityPage").then((module) => ({ default: module.CommunityPage })));
const ResumeBuilderPage = lazy(() => import("../pages/ResumeBuilderPage").then((module) => ({ default: module.ResumeBuilderPage })));
const TopicPage = lazy(() => import("../pages/TopicPage").then((module) => ({ default: module.TopicPage })));
const QuizPage = lazy(() => import("../pages/QuizPage").then((module) => ({ default: module.QuizPage })));
const DsaPage = lazy(() => import("../pages/DsaPage").then((module) => ({ default: module.DsaPage })));
const CodeEditorPage = lazy(() => import("../pages/CodeEditorPage").then((module) => ({ default: module.CodeEditorPage })));
const InterviewPrepPage = lazy(() => import("../pages/InterviewPrepPage").then((module) => ({ default: module.InterviewPrepPage })));
const LeaderboardPage = lazy(() => import("../pages/LeaderboardPage").then((module) => ({ default: module.LeaderboardPage })));
const SettingsPage = lazy(() => import("../pages/SettingsPage").then((module) => ({ default: module.SettingsPage })));
const AdminPage = lazy(() => import("../pages/AdminPage").then((module) => ({ default: module.AdminPage })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

/**
 * Application route map with code-splitting and animated page transitions.
 */
export function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="p-4"><LoadingState label="Loading page" /></div>}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/login" element={<AuthPage />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <Routes>
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="courses" element={<RoadmapPage mode="courses" />} />
                      <Route path="roadmap" element={<RoadmapPage mode="roadmap" />} />
                      <Route path="topics/:slug" element={<TopicPage />} />
                      <Route path="quiz" element={<QuizPage />} />
                      <Route path="dsa" element={<DsaPage />} />
                      <Route path="code-editor" element={<CodeEditorPage />} />
                      <Route path="interview-prep" element={<InterviewPrepPage />} />
                      <Route path="profile" element={<ResumeBuilderPage />} />
                      <Route path="resume-builder" element={<ResumeBuilderPage />} />
                      <Route path="leaderboard" element={<LeaderboardPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                      <Route path="ai-mentor" element={<AIMentorPage />} />
                      <Route path="projects" element={<ProjectsPage />} />
                      <Route path="community" element={<CommunityPage />} />
                      <Route
                        path="admin"
                        element={
                          <ProtectedRoute requiredRole="ROLE_ADMIN">
                            <AdminPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </AppShell>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

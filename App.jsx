import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/sections/Navigation';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import EbooksPage from './pages/EbooksPage';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CourseEditor from './pages/CourseEditor';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminEbooks from './pages/admin/AdminEbooks';
import EbookEditor from './pages/EbookEditor';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          {/* Public/User Routes */}
          <Route path="/" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/courses" element={<><Navigation /><main className="flex-grow"><CoursesPage /></main><Footer /></>} />
          <Route path="/ebooks" element={<><Navigation /><main className="flex-grow"><EbooksPage /></main><Footer /></>} />
          <Route path="/about" element={<><Navigation /><main className="flex-grow"><About /></main><Footer /></>} />
          <Route path="/login" element={<><Navigation /><main className="flex-grow"><Login /></main><Footer /></>} />
          <Route path="/signup" element={<><Navigation /><main className="flex-grow"><Signup /></main><Footer /></>} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="ebooks" element={<AdminEbooks />} />
            <Route path="ebook/new" element={<EbookEditor />} />
            <Route path="ebook/edit/:id" element={<EbookEditor />} />
            <Route path="course/new" element={<CourseEditor />} />
            <Route path="course/edit/:id" element={<CourseEditor />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default AppWithErrorBoundary;

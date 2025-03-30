import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
    BookOpen,
    Calculator,
    Calendar,
    Clock,
    Compass,
    MessageSquare,
    LogInIcon,
    UserIcon,
    Gitlab,
} from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AcademicsPage from './pages/AcademicsPage';
import CGPACalculatorPage from './pages/CGPACalculatorPage';
import AttendancePage from './pages/AttendancePage';
import ConceptMapsPage from './pages/ConceptMapsPage';
import SkillsPage from './pages/SkillsPage';
import LabsPage from './pages/LabsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Notification from './pages/NotificationPage';
import Community from "./pages/CommunityPage"
import ChatPage from "./pages/ChatPage";
import PdfViewer from "./components/PdfViewer";
import ProblemPage from './ProblemPage';

const App: React.FC = () => {
    const [user, setUser] = useState<{ username: string; email?: string } | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Added state for mobile menu

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const handleSetUser = (userData: { username: string; email?: string }) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const navItems = [
        { title: 'Academics', icon: BookOpen, path: '/academics' },
        { title: 'CGPA Calculator', icon: Calculator, path: '/cgpa-calculator' },
        { title: 'Attendance', icon: Clock, path: '/attendance' },
        { title: 'Concept Maps', icon: Compass, path: '/concept-maps' },
        { title: 'Labs', icon: Gitlab, path: '/labspage' },
        { title: 'Events', icon: Calendar, path: '/events' },
        { title: 'Contact', icon: MessageSquare, path: '/contact' },
        {
            title: user ? user.username : 'Login',
            icon: user ? UserIcon : LogInIcon,
            path: user ? '/profile' : '/login',
        },
    ];

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-[#1a365d] to-[#0d9488]">
                {/* ✅ Pass isMenuOpen and setIsMenuOpen */}
                <Navbar items={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <main className="container mx-auto px-4 pt-10">
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <LoginPage setUser={handleSetUser} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/academics" element={<AcademicsPage />} />
                        <Route path="/cgpa-calculator" element={<CGPACalculatorPage />} />
                        <Route path="/attendance" element={<AttendancePage />} />
                        <Route path="/concept-maps" element={<ConceptMapsPage />} />
                        <Route path='/notification' element={<Notification />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/labspage" element={<LabsPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/pdf-viewer" element={<PdfViewer />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/chat/:communityId" element={<ChatPage />} />
                        <Route path="/labs/:language/:problemId" element={<ProblemPage />} />
                        <Route path="/" element={<Navigate to="/home" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Book, LogOut, Cpu } from 'lucide-react';
import authService from '../../services/auth';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getCurrentUser();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    const isActive = (path) => location.pathname === path;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Courses', path: '/admin/courses', icon: BookOpen },
        { name: 'Ebooks', path: '/admin/ebooks', icon: Book },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Cpu className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">
                        Admin<span className="text-blue-600">Panel</span>
                    </span>
                </div>
                <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out flex flex-col h-full
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-100 hidden lg:block">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Cpu className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Admin<span className="text-blue-600">Panel</span>
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-14 lg:mt-0">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <img
                            src={user?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user?.name || 'Admin')}`}
                            alt="Admin"
                            className="w-8 h-8 rounded-full border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full overflow-x-hidden lg:ml-64">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Book, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import courseService from '../services/courses';
import userService from '../services/users';
import ebookService from '../services/ebooks';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || user.user.role !== 'admin') {
            navigate('/');
            return;
        }

        fetchAllData();
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            const [coursesData, usersData, ebooksData] = await Promise.all([
                courseService.getAllCourses(),
                userService.getAllUsers(),
                ebookService.getAllEbooks()
            ]);
            setCourses(coursesData);
            setUsers(usersData);
            setEbooks(ebooksData);
        } catch (error) {
            console.error('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const stats = [
        { name: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500' },
        { name: 'Total Courses', value: courses.length, icon: BookOpen, color: 'bg-green-500' },
        { name: 'Total Ebooks', value: ebooks.length, icon: Book, color: 'bg-purple-500' },
        { name: 'Active Learners', value: Math.round(users.length * 0.8), icon: Activity, color: 'bg-orange-500' },
    ];

    const contentData = [
        { name: 'Courses', value: courses.length },
        { name: 'Ebooks', value: ebooks.length },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Mock data for activity chart
    const activityData = [
        { name: 'Mon', users: 40, courses: 24 },
        { name: 'Tue', users: 30, courses: 13 },
        { name: 'Wed', users: 20, courses: 98 },
        { name: 'Thu', users: 27, courses: 39 },
        { name: 'Fri', users: 18, courses: 48 },
        { name: 'Sat', users: 23, courses: 38 },
        { name: 'Sun', users: 34, courses: 43 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-sm text-gray-500">Welcome back, Admin.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd className="text-3xl font-semibold text-gray-900">{item.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Weekly Activity</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="courses" stroke="#10B981" fillOpacity={1} fill="url(#colorCourses)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Content Distribution Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Content Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={contentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {contentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                        {contentData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm text-gray-600">{entry.name} ({entry.value})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Users Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {users.slice(0, 5).map((user) => (
                        <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {user.role === 'admin' ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Admin</span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">User</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;

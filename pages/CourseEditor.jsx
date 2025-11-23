import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import courseService from '../services/courses';
import authService from '../services/auth';

const CourseEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        level: 'Beginner',
        tag: '',
        lessons: '',
        duration: '',
        image: '',
        description: '',
        videoUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || user.user.role !== 'admin') {
            navigate('/');
            return;
        }

        if (isEditing) {
            fetchCourse();
        }
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const data = await courseService.getCourseById(id);
            setFormData(data);
        } catch (err) {
            setError('Failed to fetch course details');
        } finally {
            setLoading(false);
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';
        // Handle standard youtube.com/watch?v=ID
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'videoUrl') {
            const embedUrl = getEmbedUrl(value);
            setFormData(prev => ({ ...prev, [name]: embedUrl }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditing) {
                await courseService.updateCourse(id, formData);
            } else {
                await courseService.createCourse(formData);
            }
            navigate('/admin');
        } catch (err) {
            setError('Failed to save course');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin')}
                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="h-6 w-6 text-gray-600" />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? 'Edit Course' : 'Add New Course'}
                        </h1>
                    </div>
                </div>

                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                    Level
                                </label>
                                <select
                                    id="level"
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                                    Tag (e.g., Popular, New)
                                </label>
                                <input
                                    type="text"
                                    name="tag"
                                    id="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                    Duration (e.g., 4h 30m)
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    required
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="lessons" className="block text-sm font-medium text-gray-700">
                                    Number of Lessons
                                </label>
                                <input
                                    type="number"
                                    name="lessons"
                                    id="lessons"
                                    required
                                    value={formData.lessons}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    id="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Provide a direct link to an image (e.g., from Unsplash).
                                </p>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                                    YouTube Embed URL
                                </label>
                                <input
                                    type="url"
                                    name="videoUrl"
                                    id="videoUrl"
                                    value={formData.videoUrl || ''}
                                    onChange={handleChange}
                                    placeholder="https://www.youtube.com/embed/..."
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Use the "Embed" URL from YouTube (e.g., https://www.youtube.com/embed/VIDEO_ID).
                                </p>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Course'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseEditor;

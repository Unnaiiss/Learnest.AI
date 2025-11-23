import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import ebookService from '../services/ebooks';
import authService from '../services/auth';

const EbookEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: 'bg-blue-50',
        pdfUrl: ''
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
            fetchEbook();
        }
    }, [id]);

    const fetchEbook = async () => {
        try {
            setLoading(true);
            const data = await ebookService.getEbookById(id);
            setFormData(data);
        } catch (err) {
            setError('Failed to fetch ebook details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditing) {
                await ebookService.updateEbook(id, formData);
            } else {
                await ebookService.createEbook(formData);
            }
            navigate('/admin/ebooks');
        } catch (err) {
            setError('Failed to save ebook');
        } finally {
            setLoading(false);
        }
    };

    const colorOptions = [
        { name: 'Blue', value: 'bg-blue-50' },
        { name: 'Purple', value: 'bg-purple-50' },
        { name: 'Indigo', value: 'bg-indigo-50' },
        { name: 'Green', value: 'bg-green-50' },
        { name: 'Yellow', value: 'bg-yellow-50' },
        { name: 'Red', value: 'bg-red-50' },
    ];

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
                            onClick={() => navigate('/admin/ebooks')}
                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="h-6 w-6 text-gray-600" />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? 'Edit Ebook' : 'Add New Ebook'}
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
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Ebook Title
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

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Color
                                </label>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {colorOptions.map((option) => (
                                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color"
                                                value={option.value}
                                                checked={formData.color === option.value}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <div className={`w-8 h-8 rounded-md ${option.value} border border-gray-200`}></div>
                                            <span className="text-sm text-gray-700">{option.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/ebooks')}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Ebook'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EbookEditor;

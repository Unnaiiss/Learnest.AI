import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Book, Plus, Edit } from 'lucide-react';
import ebookService from '../../services/ebooks';

const AdminEbooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEbooks();
    }, []);

    const fetchEbooks = async () => {
        try {
            const data = await ebookService.getAllEbooks();
            setEbooks(data);
        } catch (error) {
            console.error('Failed to fetch ebooks');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ebook?')) {
            try {
                await ebookService.deleteEbook(id);
                setEbooks(ebooks.filter(ebook => ebook.id !== id));
            } catch (error) {
                alert('Failed to delete ebook');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ebook Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage digital resources.</p>
                </div>
                <Link
                    to="/admin/ebook/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Ebook
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ebooks.map((ebook) => (
                    <div key={ebook.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 ${ebook.color || 'bg-blue-50'} rounded-lg flex items-center justify-center mb-4`}>
                            <Book className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ebook.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ebook.description}</p>
                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                            <Link
                                to={`/admin/ebook/edit/${ebook.id}`}
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                <Edit className="h-4 w-4" />
                            </Link>
                            <button
                                onClick={() => handleDelete(ebook.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEbooks;

import axios from 'axios';

const API_URL = 'http://localhost:3000';

const ebookService = {
    async getAllEbooks() {
        try {
            const response = await axios.get(`${API_URL}/ebooks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ebooks:', error);
            throw error;
        }
    },

    async getEbookById(id) {
        try {
            const response = await axios.get(`${API_URL}/ebooks/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ebook ${id}:`, error);
            throw error;
        }
    },

    async createEbook(ebookData) {
        try {
            const response = await axios.post(`${API_URL}/ebooks`, ebookData);
            return response.data;
        } catch (error) {
            console.error('Error creating ebook:', error);
            throw error;
        }
    },

    async updateEbook(id, ebookData) {
        try {
            const response = await axios.put(`${API_URL}/ebooks/${id}`, ebookData);
            return response.data;
        } catch (error) {
            console.error(`Error updating ebook ${id}:`, error);
            throw error;
        }
    },

    async deleteEbook(id) {
        try {
            await axios.delete(`${API_URL}/ebooks/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting ebook ${id}:`, error);
            throw error;
        }
    }
};

export default ebookService;

import axios from 'axios';

const API_URL = 'http://localhost:3000';

const userService = {
    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            await axios.delete(`${API_URL}/users/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw error;
        }
    }
};

export default userService;

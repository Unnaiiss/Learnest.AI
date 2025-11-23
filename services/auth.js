import axios from 'axios';

const API_URL = 'http://localhost:3000';

const authService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    async register(name, email, password) {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
                name,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
            });
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    logout() {
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default authService;

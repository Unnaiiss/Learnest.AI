import axios from 'axios';

const API_URL = 'http://localhost:3000';

const courseService = {
    async getAllCourses() {
        try {
            const response = await axios.get(`${API_URL}/courses`);
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    async getCourseById(id) {
        try {
            const response = await axios.get(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching course ${id}:`, error);
            throw error;
        }
    },

    async createCourse(courseData) {
        try {
            const response = await axios.post(`${API_URL}/courses`, courseData);
            return response.data;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },

    async updateCourse(id, courseData) {
        try {
            const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
            return response.data;
        } catch (error) {
            console.error(`Error updating course ${id}:`, error);
            throw error;
        }
    },

    async deleteCourse(id) {
        try {
            await axios.delete(`${API_URL}/courses/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting course ${id}:`, error);
            throw error;
        }
    }
};

export default courseService;

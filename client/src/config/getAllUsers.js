import axios from 'axios';

const getAllUsers = async (email, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/all`, 
      {
        params: { email }, // Add email as a query parameter
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Users:', response.data);
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
  }
};
export default getAllUsers

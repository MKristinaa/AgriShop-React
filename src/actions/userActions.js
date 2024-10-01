import axios from 'axios';
import Cookies from 'js-cookie';



export const login = async (email, password) => {
  try {
      const config = {
          header: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.post('https://agrishop-nodejs.onrender.com/api/login', { email, password }, config);
      
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(data.user), { expires: 7 });

      return { success: true, ...data };
  } catch (error) {
      const message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An error occurred. Please try again.';

      return { success: false, message };
  }
}




export const register = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.post('http://localhost:4000/api/register', formData, config);
  
      return data;
    } catch (error) {
      console.error(error.response.data.message);
      return error.response.data.message;
    }
  };



export const loadUser = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/me/${id}`,  { withCredentials: true });
        return data;
    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
};



export const loggoutUser = async () => {
  try {
      await axios.get('http://localhost:4000/api/logout');
  } catch (error) {
      console.error(error.response.data.message);
      return error.response.data.message;
  }
};




export const updateProfile = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put('http://localhost:4000/api/me/update', formData, config);
    return data;

  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data.message : error.message);
    return error.response ? error.response.data.message : error.message;
  }
};




export const updatePassword = async (passwords) => {
  try {

    const token = Cookies.get('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.put('http://localhost:4000/api/password/update', passwords, config);
    return data;

  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An error occurred. Please try again.';

    return { success: false, message };
  }
};



export const allUsers = async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/api/admin/users');
        return data.users;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return error.response?.data?.message || error.message;
    }
};



export const updateUser =  async (id, userData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(`http://localhost:4000/api/admin/user/${id}`, userData, config);
        return data.success;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return error.response?.data?.message || error.message;
    }
};



export const getUserDetails = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/admin/user/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};



export const deleteUser = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/admin/user/${id}`);
        return data;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return error.response?.data?.message || error.message;
    }
};


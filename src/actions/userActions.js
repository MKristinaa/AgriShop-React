import axios from 'axios';

import Cookies from 'js-cookie';

export const login = async (email, password) => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:4000/api/login', {email, password}, config);

        console.log(data);
        // Sačuvaj token i korisnika u kolačiće
        Cookies.set('authToken', data.token, { expires: 7 }); 
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 });

        return data;
    } catch (error) {
        console.log(error.reesponse.data.message)
        return error.reesponse.data.message
    }
}

//Register
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


//Load user
export const loadUser = async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/api/me', { withCredentials: true });
        return data;
    } catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message;
    }
};

//Loggout user
export const loggoutUser = async () => {
  try {
      await axios.get('http://localhost:4000/logout');
  } catch (error) {
      console.error(error.response.data.message);
      return error.response.data.message;
  }
};



export const updateProfile = async (formData) => {
  try {
    // Retrieve authToken from cookies
    const authToken = Cookies.get('authToken'); // Adjust the cookie name if different

    // Set up the request configuration
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`, // Include the token in the headers
      },
    };

    // Make the PUT request to update the profile
    const { data } = await axios.put('http://localhost:4000/api/me/update', formData, config);
    return data;

  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data.message : error.message);
    return error.response ? error.response.data.message : error.message;
  }
};
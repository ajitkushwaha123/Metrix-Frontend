// Api request
import axios from 'axios'; 
axios.defaults.baseURL = 'http://localhost:8000'

// Authentication function
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (error) {
        return { error: "Username doesn't exist... !" };
    }
}

export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match... !" };
    }
}

export async function registerUser(credential) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credential);

        let { username, email } = credential;

        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        }

        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function verifyPassword({ username, password }) {
    try {
        const data = await axios.post('/api/login', { username, password });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match... !" });
    }
}

export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile... !" });
    }
}

export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP IS ${code}, verify and recover your password`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}

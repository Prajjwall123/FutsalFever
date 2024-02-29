import { myAxios } from "./helper";

export const Register = (user: { userName: string; fullName: string; password: string; address: string; email: string; })=>{
    return myAxios
    .post('/user/save', user)
    .then((response)=> response.data);
};

export const RegisterAdmin = (admin: { userName: string; fullName: string; password: string; address: string; email: string; }) => {
    return myAxios
        .post('/user/saveAdmin', admin)
        .then((response) => response.data);
};

export const checkAdminStatus = (email:String) => {
    return myAxios
        .post(`/user/checkAdmin`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error checking admin status:", error);
            throw error;
        });
};

export const Login = (credentials: { email: string; password: string; }) => {
    return myAxios
    .post('/login',  credentials)
    .then((response) => {
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        
        return response.data;
    });
};

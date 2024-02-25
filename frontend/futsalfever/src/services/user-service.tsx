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


export const Login = (credentials: { email: string; password: string; }) => {
    return myAxios
    .post('/login',  credentials)
    .then((response) => {
        // Assuming the token is in the response data
        const { token } = response.data;
        
        // Save the token to localStorage
        localStorage.setItem('token', token);
        
        // You may return additional data if needed
        return response.data;
    });
};

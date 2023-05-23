import axios from "axios";
// const API_Node = 'https://backend-timecheck.onrender.com';
const API_Node = 'https://timecheckbacknodejs-production.up.railway.app';
const API_C = 'https://time-check.azurewebsites.net';


export const saveUser = async (newUser) => {
    const result = await axios({
        url: `${API_Node}/user/register`,
        method: 'POST',
        data: newUser
    })
    return result
}


export const saveOrg = async (newUser) => {
    const result = await axios({
        url: `${API_Node}/org/register`,
        method: 'POST',
        data: newUser
    })
    return result
}

export const getAsistencia = async (data) => {
    const result = await axios({
        url: `${API_C}/api/Attendance/CheckAttendance`,
        method: 'GET',
        params: data 
    })
    // console.log(result.data);
    return result
}

export const saveAsistencia = async (newUser) => {    
    const result = await axios({
        url: `${API_C}/api/Attendance/send`,
        method: 'POST',
        data: newUser
    })
    return result
}


export const updateAsistencia = async (data) => {    
    const result = await axios({
        url: `${API_C}/api/Attendance/CancelAttendance`,
        method: 'PUT',
        params: data
    })
    return result
}


export const auth = async (user) => {
    const result = await axios({
        url: `${API_Node}/Auth/login`,
        method: 'POST',
        data: user
    })
    // console.log(result);
    return result;
}


export const getEvent = async () => {
    const result = await axios({
        url: `${API_C}/api/Event/List`,
        method: 'GET',
    })
    return result;
}

export const getUserId = async (id) => {
    const result = await axios({
        url: `${API_Node}/user/${id}`,
        method: 'GET',
    })
    return result;
}

export const updateUserId = async (id, data) => {
    // console.log(data);
    const result = await axios({
        url: `${API_Node}/user/update/${id}`,
        method: 'PUT',
        data: data
    })
    return result;
}

import axios from "axios";
// const API_Node = 'https://backend-timecheck.onrender.com';
// const API_Node = 'https://timecheckbacknodejs-production.up.railway.app';
const API_Node = 'https://timecheck.up.railway.app';
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
    return result
}


export const DeleteAsistencia = async (data) => {
    console.log(data);
    const result = await axios({
        url: `${API_C}/api/Attendance/CancelAttendance`,
        method: 'DELETE',
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

export const verificacionEmail = async (email) => {
    const result = await axios({
        url: `${API_Node}/Auth/verificacionEmail`,
        method: 'POST',
        data: { email: email }
    })
    return result;
}


export const cambioPasswordOlvidar = async (data) => {
    const result = await axios({
        url: `${API_Node}/Auth/CambioPassword`,
        method: 'POST',
        data: data
    })
    // console.log(result);
    return result;
}

export const cambioPassword = async (data) => {
    const result = await axios({
        url: `${API_C}/api/Password/UpdatePasswordUser`,
        method: 'PUT',
        data: data
    })
    // console.log(result);
    return result;
}

export const cambioPasswordOrg = async (data) => {
    const result = await axios({
        url: `${API_C}/api/Password/UpdatePasswordOrg`,
        method: 'PUT',
        data: data
    })
    // console.log(result);
    return result;
}


export const getSubOrg = async (id) => {
    const result = await axios({
        url: `${API_Node}/SubOrg/${id}`,
        method: 'GET',
    })
    return result;
}

export const getEvent = async () => {
    const result = await axios({
        url: `${API_C}/api/Event/List`,
        method: 'GET',
    })
    return result;
}
export const getEventPendi = async (id) => {
    const result = await axios({
        url: `${API_C}/api/Event/PendingEvents/${id}`,
        method: 'GET',
    })
    return result;
}



export const getEventId = async (id) => {
    const result = await axios({
        url: `${API_C}/api/Event/Consult/${id}`,
        method: 'GET',
    })
    return result;
}

export const saveEvent = async (newEvent) => {

    const result = await axios({
        url: `${API_C}/api/Event/Send`,
        method: 'POST',
        params: newEvent
    })
    return result;
}
export const updateEvent = async (newEvent, id) => {
    const result = await axios({
        url: `${API_C}/api/Event/Update/${id}`,
        method: 'PUT',
        params: newEvent,
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

export const getUserMiembro = async (id) => {
    const result = await axios({
        url: `${API_Node}/user/SubOrgMiembro/${id}`,
        method: 'GET',
    })
    return result;
}

export const getUsers = async () => {
    const result = await axios({
        url: `${API_Node}/user`,
        method: 'GET',
    })
    return result;
}


export const getOrg = async (id) => {
    const result = await axios({
        url: `${API_Node}/org/${id}`,
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

export const updateOrgId = async (id, data) => {
    console.log(id)
    const result = await axios({
        url: `${API_Node}/org/update/${id}`,
        method: 'PUT',
        data: data
    })
    return result;
}


export const updateUserRol = async (data) => {
    console.log(data);
    const result = await axios({
        url: `${API_C}/api/Member/EditMemberRole`,
        method: 'PUT',
        data: data
    })
    return result;
}
export const deleteMiembro = async (data) => {
    const result = await axios({
        url: `${API_C}/api/Member/DeleteMember`,
        method: 'DELETE',
        params: data
    })
    return result;
}

export const saveSubOrg = async (id, data) => {
    // console.log(data);
    const result = await axios({
        url: `${API_Node}/SubOrg/register/${id}`,
        method: 'POST',
        data: data
    })
    return result;
}

export const saveSubOrgUpdate = async (id, data) => {
    // console.log(data);
    const result = await axios({
        url: `${API_Node}/SubOrg/update/${id}`,
        method: 'PUT',
        data: data
    })
    return result;
}


export const saveMiembro = async (data) => {
    const result = await axios({
        url: `${API_C}/api/User/NuevoMiembro`,
        method: 'POST',
        data: data
    })
    return result;
}


export const verificarCodigo = async (data) => {
    console.log(data);
    const result = await axios({
        url: `${API_Node}/Auth/verificacion`,
        method: 'POST',
        data: data
    })
    return result;
}


export const ConfirmarAsistencias = async (data) => {
    const result = await axios({
        url: `${API_C}/api/Attendance/ConfirmAttendance`,
        method: 'PUT',
        params: data
    })
    return result;
}

export const deteleEvent = async (id) => {
    const result = await axios({
        url: `${API_C}/api/Event/Delete/${id}`,
        method: 'DELETE',
    })
    return result;
}

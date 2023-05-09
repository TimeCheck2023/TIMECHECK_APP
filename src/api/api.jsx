import axios from "axios";
// const API_Node = 'https://backend-timecheck.onrender.com';
const API_Node = 'https://timecheckbacknodejs-production.up.railway.app';
const API_C = 'http://timecheck.somee.com';

const saveUser = async (newUser) => {
    const result = await axios({
        url: `${API_Node}/user/register`,
        method: 'POST',
        data: newUser
    })
    return result
}

const auth = async (user) => {
    console.log(user);
    const result = await axios({
        url: `${API_Node}/Auth/login`,
        method: 'POST',
        data: user
    })
    return result;
}

const getEvent = async () => {
    const result = await axios({
        url: `${API_C}/api/Event/List`,
        method: 'GET',
    })
    return result;
}





export {
    saveUser,
    auth, 
    getEvent
}
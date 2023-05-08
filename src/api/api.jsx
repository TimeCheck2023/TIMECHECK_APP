import axios from "axios";
// const API = 'https://backend-timecheck.onrender.com';
const API = 'https://timecheckbacknodejs-production.up.railway.app';

const saveUser = async (newUser) => {
    const result = await axios({
        url: `${API}/user/register`,
        method: 'POST',
        data: newUser
    })
    return result
}

const auth = async(user) => {
    console.log(user);
    const result = await axios({
        url: `${API}/Auth/login`,
        method: 'POST',
        data: user
    })
    return result;
}



export {
    saveUser,
    auth
}
import axios from "axios";
const API = 'https://backend-timecheck.onrender.com';

const saveUser = async (newUser) => {
    const result = await axios({
        url: `${API}/user/register`,
        method: 'POST',
        data: newUser
    })
    return result
}



export {
    saveUser
}
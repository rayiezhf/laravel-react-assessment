import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        return JSON.parse(tokenString)
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        console.log('saveToken', userToken)
        if(!userToken) {
            localStorage.removeItem('token')
            setToken(null)
        }else {
            localStorage.setItem('token', JSON.stringify(userToken))
            setToken(userToken)
        }
    };

    return {
        setToken: saveToken,
        token
    }
}

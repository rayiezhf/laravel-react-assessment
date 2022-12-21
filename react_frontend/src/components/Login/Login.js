import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials) {
    try{
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials)
        return data.data
    }catch (e) {
        return e.response.data
    }
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        setError('')
        const token = await loginUser({
            email,
            password
        });
        setLoading(false)
        if(token && token.success) {
            setToken(token.data);
        }else {
            setError(token && token.message ? token.message : 'Error')
        }
    }


    return(
        <div className="login-form-wrap">
            <h2>Please log in</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <p>
                    <input type="text" onChange={e => setEmail(e.target.value)} id="email" placeholder="Email" required />
                </p>
                <p>
                    <input type="password" onChange={e => setPassword(e.target.value)} id="password" placeholder="Password" required />
                </p>
                {
                    <p>
                        <input type="submit" id="login" value="Login"/>
                    </p>
                }
                {
                    loading &&
                    <p>
                        <span>Submitting...</span>
                    </p>
                }
                {
                    error &&
                    <p className={"error"}>
                        <span>{error}</span>
                    </p>
                }

            </form>
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

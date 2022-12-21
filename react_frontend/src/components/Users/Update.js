import React, {useEffect, useState} from 'react';
import axios from 'axios';
import getToken from "../App/getToken";
import { useNavigate } from "react-router-dom";

async function updateUser(id, credentials) {
    try{
        const { token } = getToken();
        const data = await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            ...credentials,
            c_password: credentials.password
        }, {
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        })
        return data.data
    }catch (e) {
        return e.response.data
    }
}


async function getData(id) {
    try{
        const { token } = getToken();
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}

export default function Add() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({});
    const [error, setError] = useState();
    const id = window.location.pathname.replace(/\/users\//, '');
    const [success, setSuccess] = useState(false);
    const handleInput = e => {
        setInput(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        setError('')
        const res = await updateUser(id, input);
        setLoading(false)
        if(res && res.success) {
            setSuccess(res.message);
            setTimeout(() => {
                navigate("/users")
            }, 3000)
        }else {
            let messages = [res && res.message ? res.message : 'Error'].concat(Object.values(res.data))
            setError(messages);
        }
    }
    const fetchData = async function() {
        const data = await getData(id)
        setInput(data.data)
    }
    useEffect (() => {
        fetchData()
    }, []);


    return(
        <div>
                {
                    success && <p className={"success"}>
                        <span>{success}</span>
                    </p>
                }
            {
                !success &&
                <div className="login-form-wrap">
                    <h2>Update</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <p>
                            <input type="text" name="name" onChange={handleInput} value={input.name} placeholder="Name" required />
                        </p>
                        <p>
                            <input type="text" name="email" onChange={handleInput} value={input.email} placeholder="Email" required />
                        </p>

                        {
                            <p>
                                <input type="submit" value="Update"/>
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
                                {error.map(item => {
                                    return (
                                        <span>{item}<br/></span>
                                    )
                                })}
                            </p>
                        }

                    </form>
                </div>
            }


        </div>

    )
}

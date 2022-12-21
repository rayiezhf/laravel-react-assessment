import React, {useState} from 'react';
import Table from '../Table/Table';
import { useEffect } from 'react';
import axios from "axios";
import getToken from "../App/getToken";


async function getData() {
    try{
        const { token } = getToken();
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}


async function deleteData(id) {
    try{
        const { token } = getToken();
        const data = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}
export default function Users() {
    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const fetchData = async function() {
        const data = await getData()
        setData(data.data)
    }
    useEffect (() => {
        console.log('in useeffect')
        fetchData()
    }, []);
    const handleDelete = async function (id) {
        const res = await deleteData(id)
        if(res && res.success) {
            setMessage(res.message)
            await fetchData()
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
        console.log('delete res', res)
    }
    return(
        <>
            {
                message && <p className={"success"}>{message}</p>
            }
            <a className="right" href={"/users/new"}> Add new user </a>
            <Table data={data} columns={['name', 'email', 'role']} handleDelete={handleDelete} updateUrl={"users"}/>
        </>
    );}

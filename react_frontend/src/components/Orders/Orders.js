import React, {useState} from 'react';
import Table from '../Table/Table';
import { useEffect } from 'react';
import axios from "axios";
import getToken from "../App/getToken";


async function getData() {
    try{
        const { token } = getToken();
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}


async function acceptOrder(id, accepted) {
    try{
        const { token } = getToken();
        const data = await axios.put(`${process.env.REACT_APP_API_URL}/orders/accept`, {
            id,
            accepted
        }, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}

export default function Orders() {
    const { token } = getToken();
    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const fetchData = async function() {
        const data = await getData()
        setData(data.data)
    }
    useEffect (() => {
        fetchData()
    }, []);

    const handleAccept = async function (id, accepted) {
        const res = await acceptOrder(id, accepted)
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
            <Table data={data} columns={['name', 'detail', 'status']} handleAccept={token?.role !== 'employee' ? handleAccept : null} />
        </>
    );}

import React, {useState} from 'react';
import Table from '../Table/Table';
import { useEffect } from 'react';
import axios from "axios";
import getToken from "../App/getToken";


async function getData() {
    try{
        const { token } = getToken();
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/logs`, {
            headers: { Authorization: `Bearer ${token?.token}` }
        })
        return data.data
    }catch (e) {}
}
export default function Logs() {
    const [data, setData] = useState();
    const fetchData = async function() {
        const data = await getData()
        setData(data.data)
    }
    useEffect (() => {
        fetchData()
    }, []);
    return(
        <Table data={data} columns={['detail', 'created_at']}/>
    );}

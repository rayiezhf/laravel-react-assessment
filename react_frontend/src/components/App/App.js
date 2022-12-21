import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Orders from '../Orders/Orders';
import Logs from '../Logs/Logs';
import Users from '../Users/Users';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Newuser from '../Users/Add';
import Updateuser from '../Users/Update';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();
    console.log('app token', token)
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="wrapper">
            <Header role={token?.role} logout={() => setToken(null)} currentPage={window.location.pathname}></Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Orders />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/logs" element={<Logs />} />
                    <Route path="/users/new" element={<Newuser />} />
                    <Route path="/users/:id" element={<Updateuser />} />
                </Routes>
            </BrowserRouter>
            <Footer></Footer>
        </div>
    );
}

export default App;

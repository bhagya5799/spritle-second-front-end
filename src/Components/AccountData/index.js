import React, { useState, useEffect } from 'react'
import Header from '../Header'
import './index.css'
const AccountData = () => {
    const [userData, setUserData] = useState([])
    const getAgentData = async () => {
        const id = localStorage.getItem("id")
        const url = `https://spirtle-second-assignment.onrender.com/get-oneAgent/${id}`
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, option)
        const data = await response.json()
        console.log(data)
        setUserData(data[0])

    }
    useEffect(() => {
        const status = localStorage.getItem("status")
        if (status === "false") {
            getAgentData()
        } else {
            getAdminData()
        }

    }, []);
    const getAdminData = async () => {
        const url = 'https://spirtle-second-assignment.onrender.com/getAdminDetails'
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, option)
        const data = await response.json()
        setUserData(data[0])

    }
    
    console.log(setUserData,'set')
    const status = localStorage.getItem("status")
    return (<div className='account-main-container'>
        <Header />
        {status === "true" ? (<div className='account-sub-container'>
            <p className='para'>Name-: {userData.username}</p>
            <p className='para'>Email-: {userData.email} </p>
        </div>) : (<div className='account-sub-container'>
            <p className='para'>Name-: {userData.name}</p>
            <p className='para'>DOB-: {userData.dateOfBirth} </p>
            <p className='para'>PhoneNumber-: {userData.phoneNumber}</p>
                <p className='para'>Address-: {userData.address} </p>
        </div>)}
    </div>
    )
}
export default AccountData
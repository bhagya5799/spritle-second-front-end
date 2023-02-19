
import React, { useState, useEffect } from 'react'
import Header from "../Header"
import './index.css'

const GetOneAgent = () => {
    const [allBooking, setAllBooking] = useState([])
    const getAllBooking = async () => {
        const id = localStorage.getItem("id")
        const url = `https://spirtle-second-assignment.onrender.com/get-booking-agent/${id}`
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)

        if (response.ok === true) {
            setAllBooking(data)
        }
    }

    useEffect(() => {
        getAllBooking()
    }, [])
    return (
        <div className='main-all-booking'>
            <Header />
            <div className='ticket-container'>
                {allBooking.map(eachData => (
                    <div className='each-ticket' id={eachData.id}>
                        <img className="logo-ticket" src="https://thumbs.dreamstime.com/z/train-logo-concept-icon-illustration-design-170455146.jpg" alt='logo' />
                        <div className='ticket-sub'>
                            <p className='para-ticket'>Name: {eachData.name}</p>
                            <p className='para-ticket'>Age: {eachData.age}</p>
                            <p className='para-ticket'>Seat {eachData.seatNumber}</p>
                            <p className='para-ticket'>Bangalore To Goa</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default GetOneAgent
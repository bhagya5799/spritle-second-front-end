import React, { useState, useEffect } from 'react'
import { GoArrowBoth } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid'
import Header from "../Header"
import './index.css'

const genderList = [
    {
        id: "MALE",
        gender: "Male"
    },
    {
        id: "FEMALE",
        gender: "Female"
    }
]

const HomePage = props => {
    const [name, setName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setNumber] = useState("")
    const [profilePic, setProfile] = useState("")
    const [isProfileUpdated, setUpdateStatus] = useState(false)
    const [addPassengers, setPassenger] = useState([])
    const [namePassenger, setPassengerName] = useState('')
    const [agePassenger, setPassengerAge] = useState('')
    const [gender, setGender] = useState(genderList[0].id)
    const [matrix, setMatrix] = useState([])
    const [bookedSeatArray, setBookedSeats] = useState([])
    const [bookedFullData, setBookedFullData] = useState([])
    const [agentEmail, setAgentEmail] = useState('')
    const [agentPassword, setAgntPassword] = useState('')
    const [agentLimit, setAgentLimit] = useState('')
    const [countLimit, setCountLimit] = useState(0)
    const [addRowNum, setRowNum] = useState('')

    const getAgentData = async () => {
        const id = localStorage.getItem("id")
        const url = `https://spirtle-second-assignment.onrender.com/get-oneAgent/${id}`
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (data.length > 0) {
            setUpdateStatus(false)
        }
        else {
            setUpdateStatus(true)
        }
    }

    const getRowData = async () => {
        const row = 6;
        const column = 6;
        let matrix = [];

        for (let r = 0; r < row; r++) {
            let rowArr = [];
            for (let c = 0; c < column; c++) {
                rowArr.push((r * column) + c + 1);
            }
            matrix.push(rowArr);
        }
        console.log(matrix)
        setMatrix(matrix)
    }

    const getBookedSeats = async () => {
        const url = 'https://spirtle-second-assignment.onrender.com/getTicketDetails'
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, options)
        const data = await response.json()
        let bookedSeat = []
        const id = localStorage.getItem("id")
        let resultCount = 0
        if (response.ok === true) {

            for (let seat of data) {
                bookedSeat.push(seat.seatNumber)
            }
            for (let count of data) {
                if (count.agentId === id) {
                    resultCount = resultCount + 1
                }
            }

        }
        setCountLimit(resultCount)
        setBookedFullData(data)
        setBookedSeats(bookedSeat)
       
    }

    useEffect(() => {
        const status = localStorage.getItem("status")
        if (status === "false") {
            getAgentData()
            getRowData()
            getBookedSeats()
        } else {
            getRowData()
            getBookedSeats()
        }
    }, [])

    const onSubmitMydetails = async (event) => {
        event.preventDefault()
        const id = localStorage.getItem("id")
        const url = 'https://spirtle-second-assignment.onrender.com/send-agent-details'
        const agentDetails = {
            name: name,
            dateOfBirth: dateOfBirth,
            phoneumber: phoneNumber,
            address: address,
            profilePic: profilePic,
            id: id

        }
        const options = {
            method: "POST",
            body: JSON.stringify(agentDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)

        if (data.status === true) {
            getAgentData()
        }

    }

    const onchangeName = event => {
        setName(event.target.value)
    }

    const onchangeAdress = event => {
        setAddress(event.target.value)
    }

    const onchangeNumber = event => {
        setNumber(event.target.value)
    }

    const onchangeDate = event => {
        setDateOfBirth(event.target.value)
    }

    const onchangePic = event => {
        setProfile(event.target.value)
    }

    const onChangePassengerName = event => {
        setPassengerName(event.target.value)
    }

    const onChangePassengerAge = event => {
        setPassengerAge(parseInt(event.target.value))
    }

    const onClickAdd = () => {
        const id = localStorage.getItem("id")
        const passengerDetails = {
            id: uuidv4(),
            name: namePassenger,
            age: agePassenger,
            agentId: id,
            gender: gender
        }

        setPassenger(oldArry => [...oldArry, passengerDetails])
        setPassengerName('')
        setPassengerAge('')
        setGender(genderList[0].id)
    }

    const onChangeGender = event => {
        setGender(event.target.value)
    }

    const onChangecolor = num => {
        if (bookedSeatArray.includes(num)) {
            console.log(bookedSeatArray, 'k')
            return 'green'
          
        }
    }

    const finalUpdatecall = async (update) => {
        const url = 'https://spirtle-second-assignment.onrender.com/book-ticket'
        const options = {
            method: "POST",
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            getBookedSeats()
            setPassenger([])
        }
    }

    const updateSeats = (agedFemal, agedMale, femelOther, maleOther, emptySeatsForFemal, emptySeatsForMale) => {
        let final = []

        if (agedFemal.length > 0) {
            for (let each of agedFemal) {
                let tempSeat = emptySeatsForFemal.shift()
                let index = emptySeatsForMale.indexOf(tempSeat)
                if (index !== -1) {
                    emptySeatsForMale.splice(index, 1);
                }

                each["seatNumber"] = tempSeat

                final.push(each)

            }
        }
        if (agedMale.length > 0) {
            for (let each of agedMale) {
                let tempSeat = emptySeatsForMale.shift()
                let index = emptySeatsForFemal.indexOf(tempSeat)
                if (index !== -1) {
                    emptySeatsForFemal.splice(index, 1);
                }

                each["seatNumber"] = tempSeat
                final.push(each)


            }
        }

        if (femelOther.length > 0) {
            for (let each of femelOther) {
                let tempSeat = emptySeatsForFemal.shift()
                let index = emptySeatsForMale.indexOf(tempSeat)
                if (index !== -1) {
                    emptySeatsForMale.splice(index, 1);
                }

                each["seatNumber"] = tempSeat
                final.push(each)

            }
        }

        if (maleOther.length > 0) {
            for (let each of maleOther) {
                let tempSeat = emptySeatsForMale.shift()
                let index = emptySeatsForFemal.indexOf(tempSeat)
                if (index !== -1) {
                    emptySeatsForFemal.splice(index, 1);
                }
                each["seatNumber"] = tempSeat
                final.push(each)
            }
        }
        for (let update of final) {
            finalUpdatecall(update)
        }
    }
    const onBooktickets = async () => {
        console.log(countLimit)

        const getCount = localStorage.getItem("limit")
        const convert = (parseInt(getCount)) - 1

        if (countLimit <= convert && addPassengers.length <= convert) {
            let agedFemal = []
            let agedMale = []
            let maleOther = []
            let femelOther = []
            for (let i of addPassengers) {
                if (i.age > 60 && i.gender === "FEMALE") {
                    agedFemal.push(i)
                }
                if (i.age > 60 && i.gender === "MALE") {
                    agedMale.push(i)

                }
                if (i.age <= 60 && i.gender === "MALE") {
                    maleOther.push(i)
                }
                if (i.age <= 60 && i.gender === "FEMALE") {
                    femelOther.push(i)
                }
            }
            let bookedfemalAged = []
            let bookedfemal = []
            let bookedmale = []
            let bookedMaleAged = []


            for (let eachGender of bookedFullData) {

                if (eachGender.age > 60 && eachGender.gender === "FEMALE") {
                    bookedfemalAged.push(eachGender.seatNumber)
                }
                if (eachGender.age > 60 && eachGender.gender === "MALE") {
                    bookedMaleAged.push(eachGender.seatNumber)
                }
                if (eachGender.age <= 60 && eachGender.gender === "FEMALE") {
                    bookedfemal.push(eachGender.seatNumber)
                }
                if (eachGender.age <= 60 && eachGender.gender === "MALE") {
                    bookedmale.push(eachGender.seatNumber)
                }
            }
            let emptySeatsForFemal = []
            let emptySeatsForMale = []
            let temp = [0, 5, 1, 4, 2, 3]
            for (let column of temp) {
                for (let row = 0; row < matrix.length; row++) {
                    if (!bookedfemalAged.includes(matrix[row][column]) && !bookedMaleAged.includes(matrix[row][column]) && !bookedfemal.includes(matrix[row][column]) && !bookedmale.includes(matrix[row][column])) {
                        if (column > 0 && column < 5 && !bookedMaleAged.includes(matrix[row][column + 1]) && !bookedmale.includes(matrix[row][column + 1]) && !bookedMaleAged.includes(matrix[row][column - 1]) && !bookedmale.includes(matrix[row][column - 1])) {
                            emptySeatsForFemal.push(matrix[row][column])
                        } else {
                            if (column === 0 && !bookedMaleAged.includes(matrix[row][column + 1]) && !bookedmale.includes(matrix[row][column + 1])) {
                                emptySeatsForFemal.push(matrix[row][column])
                            }
                            if (column === 5 && !bookedMaleAged.includes(matrix[row][column - 1]) && !bookedmale.includes(matrix[row][column - 1])) {
                                emptySeatsForFemal.push(matrix[row][column])
                            }
                        }
                    }
                }

            }
            for (let column of temp) {
                for (let row = 0; row < matrix.length; row++) {
                    if (!bookedfemalAged.includes(matrix[row][column]) && !bookedMaleAged.includes(matrix[row][column]) && !bookedfemal.includes(matrix[row][column]) && !bookedmale.includes(matrix[row][column])) {
                        if (column > 0 && column < 5 && !bookedfemalAged.includes(matrix[row][column + 1]) && !bookedfemal.includes(matrix[row][column + 1]) && !bookedfemalAged.includes(matrix[row][column - 1]) && !bookedfemal.includes(matrix[row][column - 1])) {
                            emptySeatsForMale.push(matrix[row][column])
                        } else {
                            if (column === 0 && !bookedfemalAged.includes(matrix[row][column + 1]) && !bookedfemal.includes(matrix[row][column + 1])) {
                                emptySeatsForMale.push(matrix[row][column])
                            }
                            if (column === 5 && !bookedfemalAged.includes(matrix[row][column - 1]) && !bookedfemalAged.includes(matrix[row][column - 1])) {
                                emptySeatsForMale.push(matrix[row][column])
                            }
                        }
                    }
                }
            }
            updateSeats(agedFemal, agedMale, femelOther, maleOther, emptySeatsForFemal, emptySeatsForMale)

        }

        else {
            alert("max Limit Cross")
        }

    }

    const onChangeAgentEmail = (event) => {
        setAgentEmail(event.target.value)

    }

    const onChangeAgentPassword = (event) => {
        setAgntPassword(event.target.value)

    }

    const onChangeAgentLimit = (event) => {
        setAgentLimit(parseInt(event.target.value))

    }

    const onClickAddAgent = async () => {
        const agentAddDetails = {
            email: agentEmail,
            password: agentPassword,
            id: uuidv4(),
            limit: agentLimit
        }

        const url = 'https://spirtle-second-assignment.onrender.com/agent-data-create'
        const options = {
            method: "POST",
            body: JSON.stringify(agentAddDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        setAgentEmail('')
        setAgntPassword('')
        setAgentLimit('')
    }
    const onChangeRow = event => {
        setRowNum(parseInt(event.target.value))
    }
    const status = localStorage.getItem("status")
    return (
        <div className='home-main-container'>
            <Header />
            {isProfileUpdated && (<div className='pop'>
                <div position="center">
                    <div className='sign-up-main-container'>
                        <form className='sign-up-form-container' onSubmit={onSubmitMydetails}>
                            <div className='label-input-container'>
                                <label htmlFor='username' className='label-para'>Name<span className='mandatory'> *</span></label>
                                <input value={name} onChange={onchangeName} placeholder='Username' id='username' type="text" className='input-sign-up' />
                            </div>
                            <div className='label-input-container'>
                                <label htmlFor='date' className='label-para'>Date of Birth<span className='mandatory'> *</span></label>
                                <input value={dateOfBirth} onChange={onchangeDate} placeholder='Date Of Birth' id='date' type="date" className='input-sign-up' />
                            </div>
                            <div className='label-input-container'>
                                <label htmlFor='number' className='label-para'>Phonenumber<span className='mandatory'> *</span></label>
                                <input value={phoneNumber} onChange={onchangeNumber} placeholder='Phonenumber' id='number' type="number" className='input-sign-up' />
                            </div>
                            <div className='label-input-container'>
                                <label htmlFor='address' className='label-para'>Address<span className='mandatory'> *</span></label>
                                <input value={address} onChange={onchangeAdress} placeholder='address' id='dob' type="text" className='input-sign-up' />
                            </div>
                            <div className='label-input-container'>
                                <label htmlFor='profile' className='label-para'>Profile<span className='mandatory'> *</span></label>
                                <input value={profilePic} onChange={onchangePic} placeholder="Profile" type="file" id='profile' />
                            </div>
                            <button className='submit-btn' type='submit'>Submit</button>
                        </form>
                    </div>

                </div>
            </div>)}
            {status === "false" ? (<div className='agent-booking'>
                <div className='booking-column'>
                    <div className='form-booking'>
                        <label className='lable-booking' htmlFor='email'>Email</label>
                        <input value={agentEmail} id="email" onChange={onChangeAgentEmail} className='input-booking' type="email" placeholder="Enter Email" />
                        <label className='lable-booking' id='password' htmlFor='password'>Password</label>
                        <input value={agentPassword} onChange={onChangeAgentPassword} className='input-booking' type="password" placeholder="Enter Password" />
                        <label className='lable-booking' htmlFor='limit'>Max Limit</label>
                        <input value={agentLimit} id='limit' onChange={onChangeAgentLimit} className='input-booking' type="number" placeholder="Enter Age" />
                        <button className='submit-btn-crete' onClick={onClickAddAgent} type='button'>Submit</button>
                    </div>
                    <div className='color'>
                        <>
                            <p className='title-color'>Booked</p>
                            <div className='empty'></div>
                        </>
                        <>
                            <p className='title-color'>Empty</p>
                            <div className='empty-1'></div>
                        </>
                    </div>
                </div>
                <div className='booking-column-one'>
                    <div className='sub-container-matrix'>
                        {matrix.map(eachMatrix => (
                            eachMatrix.map(eachNum => (
                                <div key={eachNum} className={`matrix ${onChangecolor(eachNum)}`}>{eachNum}</div>
                            ))
                        ))}
                    </div>
                </div>
            </div>) : (
                <div className='agent-booking'>
                    <div className='booking-column'>
                        <div className='destination-container'>
                            <p className='para-city'>Bangalore</p>
                                <GoArrowBoth className='para-city' color='red' />
                            <p className='para-city'>Pune</p>
                        </div>
                        <div className='form-booking'>
                            <label className='lable-booking' htmlFor='name'>Name</label>
                            <input value={namePassenger} onChange={onChangePassengerName} className='input-booking' type="text" placeholder="Enter Name" />
                            <label className='lable-booking' htmlFor='age'>Age</label>
                            <input value={agePassenger} onChange={onChangePassengerAge} className='input-booking' type="number" placeholder="Enter password" />
                            <label className='lable-booking' htmlFor='gender'>Gender</label>
                            <select id='gender' value={gender} onChange={onChangeGender} className="input-booking">
                                {genderList.map(eachOp => (
                                    <option key={eachOp.id} value={eachOp.id}>{eachOp.gender}</option>
                                ))}
                            </select>
                            <div className='button-book'>
                                <button onClick={onClickAdd} className='add-btn'>Add</button> <button onClick={onBooktickets} className='add-btn'>Book</button>
                            </div>
                                <div className='color'>
                                    <>
                                        <p className='title-color'>Booked</p>
                                        <div className='empty'></div>
                                    </>
                                    <>
                                        <p className='title-color'>Empty</p>
                                        <div className='empty-1'></div>
                                    </>
                                </div>
                        </div>
                    </div>
                    <div className='booking-column-one'>
                        <div className='sub-container-matrix'>
                            {matrix.map(eachMatrix => (
                                eachMatrix.map(eachNum => (
                                    <div key={eachNum} className={`matrix ${onChangecolor(eachNum)}`}>{eachNum}</div>
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default HomePage
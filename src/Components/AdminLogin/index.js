
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const AdminLogin = (props) => {
    const { history } = props
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')

    const submitForm = async (e) => {
        console.log('ok')
        e.preventDefault()
        const masterApi = 'https://spirtle-second-assignment.onrender.com/super-admin-login'
        const userDetails = {
            email: email,
            password: userPass,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(masterApi, options)
        const data = await response.json()

        console.log(response)
        if (data.status === true) {
            console.log(data, 'dat')
            setErrMessage('')
            localStorage.setItem("status", false,)
            localStorage.setItem("id", data.id)
            history.replace("/homepage")
        }
        else {
            setErrMessage(data.msg)
        }

    }

    const getId = localStorage.getItem("id")
    if (getId !== null) {
        return <Redirect to="/" />
    }
    return (
        <div className='login-container'>
            <div className='choose-master-student'>
                <div className='Page-container'>
                    <form autoComplete="off" onSubmit={submitForm}>
                        <h2 className='loginPage-title'>Super Admin Login</h2>
                        <label htmlFor='email'>Email</label>
                        <div className='input-card'>
                            <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            <p className='icons' ></p>
                        </div>&nbsp; <br /> <br />
                        <label htmlFor='Mailpassword'>password</label>
                        <div className='input-card'>
                            <input id='Mailpassword' type="password" value={userPass} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            <p className='icons'></p>
                        </div>&nbsp; <br /> <br />
                        <button type='submit' className='login-btn'>Login</button>
                        <p className='error-message'>{errorMessage}</p>
                        <Link to="/login">
                            <p >Not a SuperAdmin? Login as a Agent</p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin
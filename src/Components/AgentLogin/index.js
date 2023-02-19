import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const AgentLogin = (props) => {
    const { history } = props
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')
    const submitForm = async (e) => {
        e.preventDefault()
        const userApi = 'https://spirtle-second-assignment.onrender.com/agent-login'
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
        const response = await fetch(userApi, options)
        const data = await response.json()
        console.log(data)
        if (data.status === true) {
            setErrMessage('')
            localStorage.setItem("status", true)
            localStorage.setItem("id", data.id)
            localStorage.setItem("limit", data.limit)
            history.replace("/")
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
                        <h2 className='loginPage-title'>Agent  Login</h2>
                        <label htmlFor='email'>Email</label>
                        <div className='input-card'>
                            <input id='email' type="text" value={email} placeholder='Type your Email ID here' onChange={(e) => setEmail(e.target.value)} />
                            <p className='icons' ></p>
                        </div>&nbsp; <br /> <br />
                        <label htmlFor='Mailpassword'>Password</label>
                        <div className='input-card'>
                            <input id='Mailpassword' type="password" value={userPass} placeholder='Type your Password here' onChange={(e) => setPassword(e.target.value)} />
                            <p className='icons'></p>
                        </div>&nbsp; <br /> <br />
                        <button type='submit' className='login-btn'>Login</button>
                        <p className='error-message'>{errorMessage}</p>
                        <Link to="/adminlogin">
                            <p>Not a Agent? Login as a SuperAdmin </p>
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default AgentLogin

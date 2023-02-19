import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './index.css'


const Home = (props) => {
        const onClickLogout = () => {
            localStorage.removeItem("id")
            const { history } = props
            history.replace('/login')
        }
        const status = localStorage.getItem("status")
  
  return (
    <div className='home-container'>
          <nav className='nav-container'>
              <div className='sub-container'>
                  <Link to="/" className='link'>
                      <img src='https://upload.wikimedia.org/wikipedia/hi/7/7b/Indian_Railways_logo.png' alt='logo' className='logo' />
                  </Link>
                  <h6 className='my-train'>Book MyTrain</h6>
                  <Link to="/adminlogin">
                      <button className='login'>Login</button>
                  </Link>
                  <Link to="/login">
                      <button className=''>Agent Login</button>
                  </Link>
                  <Link to="/adminlogin">
                      <p className=''>contact us</p>
                  </Link>
              </div>
              <div className='nav-sub-container'>
                  <input type='date' />
                  <Link to="/">
                      <img src='https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IRCTC_Logo.svg/1200px-IRCTC_Logo.svg.png' width="50" /> 
                  </Link>

                  
                 {/* <button className='btn-lagout' onClick={onClickLogout}>logout</button> */}
              </div>
          </nav>
    </div>
  )
}
export default Home
 
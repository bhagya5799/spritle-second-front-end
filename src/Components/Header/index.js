import { withRouter, Link } from 'react-router-dom'
import './index.css'

const Header = props => {
    const onClickLogout = () => {
        localStorage.removeItem("id")
        const { history } = props
        history.replace('/login')
    }

    const status = localStorage.getItem("status")

    return (
        <nav className='header-container'>
            <div className='nav-sub-container'>
                <Link to="/" className='link'>
                    <img src='https://upload.wikimedia.org/wikipedia/hi/7/7b/Indian_Railways_logo.png' alt='logo' className='logo' />
                </Link>
                <h6 className='my-train'>Book MyTrain</h6>
            </div>
            <div className='nav-sub-container'>
               
                {status === "true" ? (<Link to='/agent-full'>
                    All Booing
                </Link>
                ) :
                    (<Link to='/agent-one'>
                        My Booking
                    </Link>
                    )}
                <Link to="/adminlogin">
                   <button>Login</button>
                </Link>

               
                <Link to="/account">
                    <img className='avatar' src='https://res.cloudinary.com/duv0mhzrm/image/upload/v1665994997/Avatar_hzuzbt.png' alt='account' />
                </Link>
                <button onClick={onClickLogout}  type='button' className='btn-lagout'>Logout</button>
            </div>
        </nav>
       
    )
}


export default withRouter(Header)
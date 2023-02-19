import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
// import AccountCreate from './components/CreateAccount'
import AdminLogin from './Components/AdminLogin'
import ProtectedRoute from './Components/ProtectRoute'
import './App.css'
import HomePage from './Components/Homepage'
import AgentFullData from './Components/AgentFullData'
import GetOneAgent from './Components/GetOneAgent'

const App = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path='/adminlogin' component={AdminLogin} /> */}
      <Route exact path='/' component={Home} />
      {/* <Route exact path='/create-account/:status' component={AccountCreate} /> */}
      <Route exact path='/login' component={Login} />
      <Route exact path='/adminlogin' component={AdminLogin} />
      <Route exact path='/agentDetails' component={AgentFullData} />
      <Route exact path='/getoneagent' component={GetOneAgent} />
      <ProtectedRoute exact path='/homepage' component={HomePage} />
    </Switch>
  </BrowserRouter>
)

export default App
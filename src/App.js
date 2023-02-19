import { Switch, Route, BrowserRouter } from 'react-router-dom'
import AgentLogin from './Components/AgentLogin'
import AdminLogin from './Components/AdminLogin'
import ProtectedRoute from './Components/ProtectRoute'
import './App.css'
import HomePage from './Components/Homepage'
import AgentFullData from './Components/AgentFullData'
import GetOneAgent from './Components/GetOneAgent'
import AccountData from './Components/AccountData'

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path='/acountData' component={AccountData} />
      <Route exact path='/agentLogin' component={AgentLogin} />
      <Route exact path='/adminlogin' component={AdminLogin} />
      <ProtectedRoute exact path='/agentFull' component={AgentFullData} />
      <ProtectedRoute exact path='/getoneagent' component={GetOneAgent} />
      <ProtectedRoute exact path='/' component={HomePage} />
    </Switch>
  </BrowserRouter>
)

export default App
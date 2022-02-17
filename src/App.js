import {React,Component} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
import Slave from './components/pages/Slave';
import Systemhealth from './components/pages/Systemhealth';
import Allocation from './components/pages/Allocation';




export default class App extends Component {
  constructor(){
    super();
    this.state={
      loggedin :false,
      status:'failed'
    }

  }
  login=()=>{
    let data=sessionStorage.getItem('login')
    this.setState({status:data});
  }
  componentDidMount(){
    let data=sessionStorage.getItem('login')
    this.setState({status:data});
  }
  render(){
    const { status } = this.state;
    if (status === "failed" || status===null){
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route exact path="/login" element={<Login parentCallback = {this.login} />}  />
          </Routes>
        </Router>
      )
}
else{
  return (
    <div >
        <Router>  
        <Sidebar/>
        {/* <Home/> */}
        {/* <Configuration/> */}
          <Routes>
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home/>}  />
            <Route exact path="/slave" element={<Slave/>}  />
            <Route exact path="/health" element={<Systemhealth/>}  />
            <Route exact path="/allocate" element={<Allocation/>}  />
       
            
            
          </Routes>
        </Router>
    </div>
  );
   }
  }
}

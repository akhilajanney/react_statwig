import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default class Sidebar extends Component {
  redirect=()=>{
    window.location.pathname='/'
  }
  logout=()=>{

    console.log('logout----');
        sessionStorage.removeItem('login')
            window.location.pathname='/login'
}
    render() {
        return (
            <>
                <div className='sidebar'>
                    <div style={
                        {
                            width: '130px',
                            height: '33px',
                            borderRadius: '8px',
                            background: "white",
                            padding: '5px',
                            cursor:'pointer'

                        }

                        
                    }
                    onClick={this.redirect}>
                        <img src="/images/Logo/vacuslogo.png" alt=""
                            style={
                                {
                                    width: '100px',
                                    marginTop: '8px',
                                    marginLeft: '11px'
                                }
                            }/>
                    </div>
                    <div>
                    <Link to='/home' style={{ textDecoration: 'none' }}>
                        <div className='sidebar_icons'
                            style={
                                {marginTop: '100px'}
                        }>
                            <div className='sidebarimage'>

                                <i className="fas fa-home"></i>
                            </div>
                            <div className='sidebar_text'>
                                <span>Home</span>
                            </div>
                        </div>
                          </Link>
                          <Link to='/slave' style={{ textDecoration: 'none' }}>
                        <div className='sidebar_icons'>
                            <div className='sidebarimage'>
                                <i className="fas fa-cog"></i>

                            </div>
                            <div>
                                <span className='sidebar_text'>Register</span>
                            </div>

                        </div>

                        </Link>
                        <Link to='/health' style={{ textDecoration: 'none' }}>
                        <div className='sidebar_icons'>
                            <div className='sidebarimage'>
                                <i className="fas fa-medkit"></i>

                            </div>
                            <div>
                                <span className='sidebar_text'>Health</span>
                            </div>
                        </div>
                        </Link>
                    </div>
                    
                    
                    <div className='sidebar_icons'
                     onClick={this.logout}
                        style={
                            {marginTop: '101px'}
                           
                    }>
                        
                        <div style={{cursor:'pointer'}}>
                             <i className="fas fa-user-circle"
                                style={
                                    {fontSize: '20px',marginTop:'6px',color:'white',cursor:'pointer'}
                            }></i>
                            <span className='sidebar_text'>Admin</span>
                            {/* &nbsp; */}
                            {/* <i className="fas fa-sign-out-alt"
                                style={
                                    {
                                        fontSize: '20px',
                                        color: 'white'
                                    }
                            }></i> */}
                        </div>
                        <div className='sidebarimage'
                            style={
                                {marginLeft: '5px'}
                        }>
                            <i className="fas fa-sign-out-alt"
                                style={
                                    {fontSize: '20px',marginTop:'6px'}
                            }></i>

                        </div>
                        
                    </div>
                    

                </div>
            </>
        )
    }
}

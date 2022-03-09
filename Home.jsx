import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

export default class Home extends Component {
    render() {
        return (
            <> {/* <Sidebar/> */}
                <div style={
                    {
                        float: "right",
                        width: "91%",
                        marginTop: '20px',
                        marginRight: '-9%'
                    }
                }>
                    {/* <div className='alert_history'>
                        <i className="fas fa-alarm-exclamation"
                            style={
                                {
                                    fontSize: '20px',
                                    color: '#FF0000',
                                    marginTop: '7px'
                                }
                        }></i>
                        &nbsp;
                        <span style={
                            {
                                color: '#FF0000',
                                fontWeight: '500'
                            }
                        }>
                            ALERTS HISTORY</span>
                    </div> */}
                    <div
                        style={{marginTop:'30px'}}
                      >
                        <span className='main_header'>CONFIGURATION</span>
                        <div className='underline'></div>
                    </div>

                    <div
                      style={{marginTop:'40px',display:'flex'}}
                    >
                    <div className='cards'>
                      <Link to='/slave'>
                        <div className='card_text'>
                           <img src="/images/widget/registration.svg" alt="" style={{width:'100%'}} />
                        </div>
                        </Link>
                        {/* <Link to='/floormap'>
                        <div className='card_text'>
                          <img src="/images/widget/UploadFloorMap.svg" alt="" style={{width:'100%'}} />
                          </div>
                        </Link>
                        <Link to='/allasset'>
                        <div className='card_text'>
                         <img src="/images/widget/allassets.svg" alt="" style={{width:'100%'}} />
                        </div>
                        </Link> */}
                     </div>

                

                    </div>
                    <div
                        style={{marginTop:'30px'}}
                      >
                        <span className='main_header'>PERSONNEL MANAGEMENT</span>
                        <div className='underline'></div>
                    </div>

                    <div
                      style={{marginTop:'40px',display:'flex'}}
                    >
                    <div className='cards'>
                    <Link to='/allocate'>
                        <div className='card_text'>
                           <img src="/images/widget/allocation.png" alt="" style={{width:'100%'}} />
                        </div>
                        </Link>
                     </div>
                    </div>
                    <div
                        style={{marginTop:'30px'}}
                      >
                        <span className='main_header'>SYSTEM HEALTH</span>
                        <div className='underline'></div>
                    </div>

                    <div
                      style={{marginTop:'40px',display:'flex'}}
                    >
                    <div className='cards'>
                    <Link to='/health'>
                        <div className='card_text'>
                           <img src="/images/widget/systemhealth.svg" alt="" style={{width:'100%'}} />
                        </div>
                        </Link>

                     </div>
                    </div>

                </div>

            </>
        )
    }
}

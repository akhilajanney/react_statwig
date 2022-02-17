import axios from 'axios'
import React, {Component} from 'react'
import $ from 'jquery';

export default class Allocation extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            success: false,
            message: ''
        }
    }

    componentDidMount() {
        axios({method: 'GET', url: '/api/slave'}).then((response) => {
            if (response.status === 201 || response.status === 200) {
                let data = response.data;
                console.log('------>', data);
                if (data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {
                        $("#slavename").append("<option value=" + data[i].id + ">" + data[i].mac + "</option>");
                    }
                }
            }
        }).catch((error) => {
            console.log(error);
            if(error.response.status===400){
              this.setState({error:true,message:'Bad request!'})
            }
        })
    }

    submit = () => {
        let data = {
            id: $('#slavename').val(),
            vehicleid: $('#vehicle').val()
        }
        console.log(data);
        axios({method: 'PUT', url: '/api/slave', data: data})
        .then((response) => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {
            $('#vehicle').val('');
                this.setState({success: true, message: 'Allocated Successfullyy!!'})
            }
        }).catch((error) => {
          if(error.response.status===400){
            this.setState({error:true,message:'Bad request!'})
          }
        })
    }

    // delete = () => {
    //   let data = {
    //     id: $('#deleteid').val()
    // }
    // console.log(data);
    // axios({method: 'DELETE', url:'/api/slave', data:data})
    // .then((response) => {
    //     console.log(response);
    //     if (response.status === 200 || response.status === 201) {
    //         this.setState({success: true, message: 'deleted!!'})
    //     }
    // }).catch((error) => {
    //     console.log(error);
    //     if(error.response.status===400){
    //       this.setState({error:true,message:'Bad request!'})
    //     }
    // })

    // }
   
    render() {
        const {message, error,success} = this.state;
        return (
            <>
                <div style={
                    {
                        float: "right",
                        width: "91%",
                        marginTop: '20px',
                        marginRight: '-9%'
                    }
                }>
                    <div style={
                        {
                            marginTop: '20px',
                            marginBottom: '30px'
                        }
                    }>
                        <span className='main_header'>GATEWAY ALLOCATION</span>
                        <div className='underline'></div>
                    </div>
                    <div>
          {error && (
            <div style={{ color: 'red', }}>
              <strong>{message}</strong>
            </div>
          )}

          {success && (
            <div style={{ color: 'green', }}>
              <strong>{message}</strong>
            </div>
          )}
        </div>
                    <form>
                        <div className="input-group">
                            <span className="label">Slave  ID :
                            </span>
                            <select id="slavename"
                                style={
                                    {width: '265px'}
                            }></select>
                        </div>

                        <div className="input-group">
                            <span className="label">Vehicle ID :
                            </span>
                            <input type='text' id="vehicle"></input>
                        </div>

                        <div style={
                            {
                                marginTop: '10px',
                                display: 'flex',
                                marginLeft: '175px'
                            }
                        }>

                            <div style={
                                {
                                    marginTop: '30px',
                                    display: 'flex'
                                }
                            }>
                                <div onClick={
                                        this.submit
                                    }
                                    style={
                                        {
                                            background: '#003B5E',
                                            color: 'white',
                                            cursor: 'pointer',
                                            width: '175px',
                                            height: '30px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            textAlign: 'center'

                                        }
                                }>
                                    <div style={
                                        {
                                            fontSize: '15px',
                                            marginLeft: '23px',
                                            marginTop: '3px'
                                        }
                                    }>
                                        <span>Allocate Gateway</span>
                                    </div>&nbsp;
                                    <div style={
                                        {marginTop: '5px'}
                                    }>
                                        <img src="/images/Icons/register.png"
                                            style={
                                                {width: '14px'}
                                            }
                                            alt=""/>
                                    </div>
                                </div>

                                {/* <div     onClick={this.update}
                style={{background:'orange',
                color:'white',
                cursor:'pointer',
                width:'125px',
                height:'30px',borderRadius:'8px',
                display:'flex',
                textAlign:'center',
                marginLeft:'60px'
            }}> */}
                                {/* <div 
                    style={{fontSize:'15px',marginLeft:'23px',marginTop:'3px'}}  >
                    <span >Update</span>
               </div>&nbsp;
                <div style={{marginTop:'3px'}}>
                    <i className="fas fa-edit"  style={{width:'20px',fontSize:'16px'}}></i>
                </div>       */}
                                {/* </div> */}
                                {/* <div // onClick={this.delete}
                                    style={
                                        {
                                            background: 'red',
                                            color: 'white',
                                            cursor: 'pointer',
                                            width: '125px',
                                            height: '30px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            textAlign: 'center',
                                            marginLeft: '60px'
                                        }
                                }> */}
                                    {/* <div onClick={
                                            this.hide
                                        }
                                        style={
                                            {
                                                fontSize: '15px',
                                                marginLeft: '23px',
                                                marginTop: '3px'
                                            }
                                    }>
                                        <span>Delete
                                        </span>
                                    </div>&nbsp;
                                    <div style={
                                        {marginTop: '3px'}
                                    }>
                                        <img src="/images/Icons/delete.png"
                                            style={
                                                {width: '20px'}
                                            }
                                            alt=""/>
                                    </div> */}
                                {/* </div> */}

                            </div>

                        </div>
                    </form>

                   


                </div>

            </>
        )
    }
}

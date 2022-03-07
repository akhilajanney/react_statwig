import React, { Component } from 'react'
import './styles.css'
import $ from 'jquery'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export default class Slave extends Component {
  constructor(){
    super();
    this.state={
      message:'',
      success:false,
      error:false
    }
  }
  componentDidMount(){
    axios({method: 'GET', url: '/api/slave'}).then((response) => {
      if (response.status === 201 || response.status === 200) {
          let data = response.data;
         
          console.log('------>', data);
          if (data.length !== 0) {
              for (let i = 0; i < data.length; i++) {
                  $("#deleteid").append("<option value=" + data[i].id + ">" + data[i].mac + "</option>");
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
    registerSlave=()=>{
      console.log('hi');
        let data={
            mac:$('#slaveid').val(),
          };
          console.log(data);
          axios({method:'POST',url:'/api/slave',data:data})
          .then((response)=>{
            $("#slaveid").val("")
            console.log('slave',response);
            if(response.status===200||response.status===201){
              this.setState({success:true,message:'slave gateway registered successfully!!'})
            }
      
          })
          .catch((error)=>{
            console.log('mastererr',error);
            if(error.response.status===400){
              this.setState({error:true,message:'Bad request!'})
            }
          })
    }

    delete = () => {
      let data = {
        id: $('#deleteid').val()
    }
    console.log(data);
    axios({method: 'DELETE', url:'/api/slave', data:data})
    .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          $("#deleteid").val('');
            this.setState({success: true, message: 'slave gateway removed successfully!!'})
        }
        
    }).catch((error) => {
        console.log(error);

        if(error.response.status===400){
          this.setState({error:true,message:'Bad request!'})
        } 
        // if(error.response.status===208){
        //   this.setState({error:true,message:'vehicle id already exist!'})
        // }
    })

    }

    hide = () => {
      document.getElementById("delete").style.display = $("#delete").css("display") === "block" ? "none" : "block";
  }
  render() {
    const { message, success, error } = this.state;
    return (
      <>
      <div
        style={
          {
              float: "right",
              width: "91%",
              marginTop: '20px',
              marginRight: '-9%'
          }}
      >
          <div style={
                        {marginTop: '20px'}
                    }>
                        <span className='main_header'>SLAVE REGISTRATION</span>
                        <div className='underline'></div>
                    </div>
                    <br></br>
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
      <div style={{marginTop:'50px'}}>
          <div className="input-group">
              <span className="label">Slave  ID :  </span>
              <input type='text'  id="slaveid" placeholder='5a-c2-15-0a-00-00'style={{width:'265px'}}></input>
            </div>
            <div style={{marginTop:'40px',display:'flex', marginLeft:'60px'}}
            >
            <div   
            id='slave'
                 onClick={this.registerSlave}
                style={{background:'#003B5E',
                color:'white',
                cursor:'pointer',
                width:'175px',
                height:'30px',borderRadius:'8px',display:'flex',textAlign:'center',
               
            }}>
                <div 
                    style={{fontSize:'15px',marginLeft:'23px',marginTop:'3px'}}  >
                    <span >Register Gateway</span>
               </div>&nbsp;
                <div style={{marginTop:'5px'}}>
                    <img src="/images/Icons/register.png" style={{width:'14px'}}alt="" />
                </div>      
          </div>
               <div     onClick={this.hide}
                style={{background:'red',
                color:'white',
                cursor:'pointer',
                width:'175px',
                height:'30px',borderRadius:'8px',
                display:'flex',
                textAlign:'center',
                marginLeft:'60px'
            }}>
                                <div 
                    style={{fontSize:'15px',marginLeft:'23px',marginTop:'3px'}}  >
                    <span >Remove Gateway</span>
               </div>&nbsp;
                <div style={{marginTop:'3px'}}>
                    {/* <i className="fas fa-edit"  style={{width:'20px',fontSize:'16px'}}></i> */}
                    <img src="/images/Icons/delete.png"
                                    style={
                                        {width: '20px'}
                                    }
                                    alt=""/>
                </div>      
                </div>


          </div>
          </div>
          </form>
          <div id='delete'
                        style={
                            {
                                display: 'none',
                                marginTop: '20px'
                            }
                    }>
                        <div className="input-group">
                            <span className="label">Slave ID :
                            </span>
                            <select type='text' id="deleteid"></select>
                        </div>
                        <div onClick={
                                this.delete
                            }
                            style={
                                {
                                    background: 'red',
                                    color: 'white',
                                    cursor: 'pointer',
                                    width: '175px',
                                    height: '30px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    textAlign: 'center',
                                    marginLeft: '60px',
                                    marginTop: '20px'
                                }
                        }>
                            <div style={
                                {
                                    fontSize: '15px',
                                    marginLeft: '23px',
                                    marginTop: '3px'
                                }
                            }>
                                <span>Remove Gateway
                                </span>
                            </div>
                            &nbsp;
                            <div style={
                                {marginTop: '3px'}
                            }>
                                <img src="/images/Icons/delete.png"
                                    style={
                                        {width: '20px'}
                                    }
                                    alt=""/>
                            </div>
                        </div>
                    </div>
          </div>
      </>
    )
  }
}

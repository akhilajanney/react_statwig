import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery'

export default class Systemhealth extends Component {
    constructor(){
        super();
        this.state={
          error:false,
          message:''
        }
      }

    componentDidMount=()=>{
        axios({method:'GET',url:"/api/slave"})
    .then((response)=>{
      if(response.status===200|| response.status===201 && response.length!=0){
        let data=response.data;
        let battery= '----';
        let temperature = '----';
        console.log('vehicledetails',data);
        $('#vehicledetails').empty();
          

        for(let i=0;i<data.length;i++){
            let val=data[i].vehicleid;
          if(val=== null){
            console.log('null');
            val='----';
            // let val=data[i].vehicleid
          }else{
              val=data[i].vehicleid;
          }

          // if(data[i].vehicleid === null){
          //   console.log('null');
          // // let datas=  data[i].vehicleid = '-----';
          // let vehicledata= '----' ;
          // $('#vehicledetails').append(
          //   "<tr><td>" +
          //   vehicledata +
          //  "</td></tr>"
          // );
          // }
          // else{
          //   $('#vehicledetails').append(
          //     "<tr><td>" +
          //     data[i].vehicleid +
          //    "</td></tr>"
          //   );
          // }

          let lastseen=data[i].timestamp .substr(0, 10) +
        " " +
        data[i].timestamp.substr(11, 8),

        status='red';
        if (new Date() - new Date(data[i].timestamp) <= 2 * 60 * 1000) {
          status = "green";
        }
        // if(data[i].vehicleid ==='null'){
        //   console.log('nullll')
        //   let vehicledata='----';
        //   $('#vehicledetails').append(
        //     "<tr><td>" +
        //     vehicledata +
        //    "</td></tr>"
        //   );
        // }
        
        $('#vehicledetails').append(
          "<tr><td>" +
                (i + 1) +
                "</td><td>" +
                data[i].mac +
                "</td><td>" +
                val +
                "</td><td>" +
                temperature +
                "</td><td>" +
                battery +
                "</td><td>" +
                lastseen +
                "</td><td>" +
                "<div class='circle' style='margin:auto;background-color:" +
                status +
                ";'></div></td></tr>"

        );
      }
      }
    })
    .catch((error)=>{
      console.log(error)
      if(error.status===404){
        this.setState({error:true,message:'not found'})
      }else if(error.status===400){
        this.setState({error:true,message:'Bad request'})}
    })
    }
  render() {
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
                        {marginTop: '20px'}
                    }>
                        <span className='main_header'>SYSTEM HEALTH</span>
                        <div className='underline'></div>
                    </div>
                    
                    <div style={
                        {marginTop: '50px'}
                    }>
                        <span className='main_header'>Vehicle Details</span>
                        <div className='underline'></div>
                    </div>


                    <div id='health'
                        style={
                            {
                                borderRadius: '10px',
                                width: '85%'
                            }
                    }>
                        <table>
                            <thead>
                                <tr>
                                    <th>sl no</th>
                                    <th>mac id</th>
                                    <th>vehicle id</th>
                                    <th>temperature</th>
                                    <th>battery</th>
                                    <th>last seen</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody id='vehicledetails'></tbody>
                        </table>
                    </div>
                    </div>
      </>
    )
  }
}

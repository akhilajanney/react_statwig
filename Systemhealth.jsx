import React, {Component} from 'react'
import axios from 'axios';
import $ from 'jquery'

export default class Systemhealth extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            message: ''
        }
    }

    componentDidMount = () => {
        this.health();
        this.interval = setInterval(this.health, 15 * 1000);
    }
    componentDidUpdate(){
      setTimeout(() => this.setState({message:''}), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    health = () => {
        axios({method: 'GET', url: "/api/slave"}).then((response) => {
            if (response.status === 200 || response.status === 201) {
                let data = response.data;
                console.log('vehicledetails', data);
                $('#vehicledetails').empty();
                // console.log(new Date());
                // console.log(data[0].lastseen);


                for (let i = 0; i < data.length; i++) {
                    let status = "red";
                    let curr = new Date();
                    let res = new Date(data[i].lastseen.replace("Z", ""));
                    let dif = curr - res;
                    console.log('---------', dif);
                    if (dif <= 2 * 60 * 1000) {
                        status = "green";
                    }
                    let vehicleVal=data[i].vehicleid;
                    if(vehicleVal === null){
                        vehicleVal='----';
                      }else{
                        vehicleVal=data[i].vehicleid;
                      }
                    
                    $('#vehicledetails').append("<tr><td>" + (
                        i + 1
                    ) + "</td><td>" + data[i].mac + 
                    "</td><td>" + vehicleVal + 
                    "</td><td>" + data[i].temperature + 
                    "</td><td>" + data[i].battery + 
                    "</td><td>" + data[i].lastseen.replace("T", " ").substr(0, 19) +
                     "</td><td>" + "<div class='circle' style='margin:auto;background-color:" +
                      status + ";'></div></td></tr>");
                }
            }
        }).catch((error) => {
            console.log(error)
            if (error.status === 404) {
                this.setState({error: true, message: 'not found'})
            } else if (error.status === 400) {
                this.setState({error: true, message: 'Bad request'})
            }
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

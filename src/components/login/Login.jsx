import React, {Component, Fragment} from "react";
import './login.css'
import '../pages/styles.css'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: "",
            error: false
        }
    }

    login = (e) => { // window.location.pathname='/home';
        e.preventDefault();
        console.log('loggedin');
        const {username, password} = this.state;
        let data = {
            username: username,
            password: password
        }
        if (username.length > 0 && password.length > 0) {
            axios({method: 'POST', url: '/api/login', data: data}).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log('Response===>')
                    sessionStorage.setItem("login", "success");
                    this.props.parentCallback("success");
                }
            }).catch((error) => {
                console.log(error);
                sessionStorage.setItem("login", "failed");
                this.props.parentCallback("failed");
                this.setState({error: true, message: 'incorrect username/password'})
            })
        } else {
            this.setState({error: true, message: "Required all fields."})
        }
    }


    handleChanges = (e) => {
        this.setState({[e.target.name]: e.target.value})


    }


    render() {
        const {username, password, message, error} = this.state;
        return (
            <Fragment>

                <title>Login</title>
                <div className="main-div">
                    <div className="div-section fading">
                        <div style={
                            {
                                backgroundColor: "rgba(0, 160, 255, 0.25)",
                                borderRadius: "20px",
                                width: "63%",
                                boxShadow: "12px 12px 16px 0 rgba(0, 0, 0, 0.25), -12px -12px 16px 0 rgba(0, 0, 0, 0.03)"
                            }
                        }>

                            <img src="../images/Logo/vacuslogo.png" alt=""
                                style={
                                    {
                                        width: "35%",
                                        height: "7%",
                                        marginLeft: '10px',
                                        marginTop: '22px'

                                    }
                                }/>
                            <img src="../images/Logo/lt.png" alt=""
                                style={
                                    {
                                        width: "48%",
                                        marginLeft: '40px',
                                        marginTop: '22px'
                                    }
                                }/> {
                            error && (
                                <div style={
                                    {
                                        color: 'red',
                                        textAlign: 'center',
                                        marginTop:'10px'
                                    }
                                }>
                                
                                    {message} </div>
                            )
                        }
                            <div style={
                                {
                                    padding: '10%',
                                    marginTop: '-13px'
                                }
                            }>
                                <h1 style={
                                    {textAlign: 'center'}
                                }>LOGIN</h1>

                                {/* Login Form */}
                                <form>
                                    <div className="input-group">
                                        <input type="text" name="username" placeholder="Username" required="required"
                                            value={username}
                                            style={
                                                {
                                                    width: "93%",
                                                    height: "3.5vh",
                                                    borderRadius: '8px'
                                                }
                                            }
                                            onChange={
                                                this.handleChanges
                                            }/>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" id="password" name="password" placeholder="Password" required="required" autoComplete="off"
                                            value={password}
                                            style={
                                                {
                                                    width: "93%",
                                                    height: "3.5vh",
                                                    borderRadius: '8px'
                                                }
                                            }
                                            onChange={
                                                this.handleChanges
                                            }/>
                                    </div>
                                    <div className="input-group"></div>

                                    <div className="input-group"
                                        style={
                                            {justifyContent: 'center'}
                                    }>
                                        <div onClick={
                                                this.login
                                            }
                                            style={
                                                {
                                                    width: "40%",
                                                    height: "6vh",
                                                    borderRadius: '23px',
                                                    marginLeft: '70px',
                                                    background: 'white',
                                                    border: 'none',
                                                    display: 'flex'
                                                }
                                        }>
                                            <div style={
                                                {
                                                    marginTop: '-8px',
                                                    position: 'relative',
                                                    marginLeft: '26px',
                                                    cursor: 'pointer'
                                                }
                                            }>
                                                <p>
                                                    <b>Login</b>
                                                </p>
                                            </div>

                                            <div style={
                                                {
                                                    marginTop: '10px',
                                                    position: 'absolute',
                                                    cursor: 'pointer'
                                                }
                                            }>
                                                <i className="fas fa-arrow-circle-right"
                                                    style={
                                                        {
                                                            color: '#003B5E',
                                                            marginLeft: '72px',
                                                            cursor: 'pointer'
                                                        }
                                                }></i>
                                            </div>

                                        </div>
                                    </div>
                                    <span className="error-msg" id="err"></span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

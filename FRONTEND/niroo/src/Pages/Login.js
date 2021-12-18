import React, { useState, useContext } from 'react'
 
import {Context} from '../components/Contexts/ContextProvider'

function Login() {
    const {loginData, setLoginData, isError , errorMessage, loginHandler } = useContext(Context); 
    const changeHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    return (
        <div className="login_container">
            <div className="login_card">
                <div className="circle"></div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login_left">
                            <h1>Welcome Back</h1>
                            <p>please login to continue</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image_container"><img src="assets/img/profile.jpg" alt="login_image" className="login_image" /></div>
                        <div className="login_form">
                        {isError&&<p style={{color: 'red'}}>{errorMessage.toString()}</p>}
                            <div className="input_group">
                                <img src="assets/img/username.png" />
                                <input type="text" name="username" className="login_input" placeholder="username" onChange={changeHandler} />
                            </div>
                            <div className="input_group">
                                <img src="assets/img/lock.png" />
                                <input type="password" name="password" className="login_input" placeholder="password" onChange={changeHandler} />
                            </div>
                            <button type="submit" onClick={loginHandler} className="login_submit">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

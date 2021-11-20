import React, { useRef, useEffect } from 'react'

function Login() {

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
                        <form className="login_form">
                            <div className="input_group">
                                <img src="assets/img/username.png" />
                                <input type="text" name="username" id="username" className="login_input" placeholder="username" />
                            </div>
                            <div className="input_group">
                                <img src="assets/img/lock.png" />
                                <input type="password" name="password" id="password" className="login_input" placeholder="password" />
                            </div>
                            <button type="submit" className="login_submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="circle2"></div>
        </div>
    )
}

export default Login

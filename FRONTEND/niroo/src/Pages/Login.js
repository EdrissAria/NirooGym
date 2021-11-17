import React from 'react'

function Login() {
    return (
        <div className="login_container">
            <div className="login_card">
                <div className="login_header"><h1>Login</h1></div>
                <form className="login_form">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="login_input" placeholder="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="login_input" placeholder="password"/>
                    <button type="submit" className="login_submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login

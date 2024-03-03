import React from 'react';
import './Style/login.css'

const Login = () => {
    return (
        <div className='login-container'>
            <div className="card-container">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <form className="container-card">
                    <div className="log-card">
                        <p className="heading">Welcome !!</p>
                        <p>We are happy to see you again...</p>
                        <div className="input-group">
                            <label className="text">Username</label>
                            <input className="input" type="username" placeholder="User Name" required />
                            <label className="text">Password</label>
                            <input className="input" type="password" name='password' autoComplete='new password' placeholder="Enter Password" required />
                        </div>
                        <div className="password-group">
                            <div className="checkbox-group">
                                <input type="checkbox" />
                                <label className="label">Remember Me</label>
                            </div>
                            <a href="" className="forget-password">Forget Password?</a>
                        </div>
                        <button className="btn">Sign In</button>
                        <p className="no-account">Don't Have an Account ?<a className="link"> Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
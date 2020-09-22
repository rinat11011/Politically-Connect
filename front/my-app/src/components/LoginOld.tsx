import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

function OldLogin() {
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [key,setKey] = useState("");
    const [auth, setauth] = useState(false);
    const [removeToken, SetRemoveToken] = useState(false);

    function ClearStorage(){
        SetRemoveToken(true);
        localStorage.clear();
    }

    useEffect(() => {
        // Update the document title using the browser API
        !removeToken ?  ClearStorage() : console.log("a")
    },[removeToken]);

    async function login(e: { preventDefault: () => void; }) {
        localStorage.setItem('key', key);
        console.log(userName);
        console.log(key);
        e.preventDefault();
        let user = {
            username: userName,
            password: password
        };

        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: header,
                body: JSON.stringify(user)
            });
            if (response.ok) {
                let res = await response.json();
                localStorage.setItem('token', res.accessToken);
                localStorage.setItem('partyName', res.username);
                setauth(true);
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }
    }



    return (
         auth?
             ((userName === "MOJ")? <Redirect to={{ pathname : '/MOJPage'}}/>:<Redirect to={{ pathname : '/PartyPage', state: {id: userName}}}/>):
         <div className="auth-inner">
         <form onSubmit={login}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>UserName</label>
                <input onChange={e =>setUserName(e.target.value)} type="text" className="form-control" placeholder="Enter username"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password"/>
            </div>
             <div className="form-group">
                 <label>Key</label>
                 <input onChange={e =>setKey(e.target.value)} type="text" className="form-control" placeholder="Enter key"/>
             </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" >Submit</button>
            <p className="forgot-password text-right">
                <a href="#"> Forgot password?</a>
            </p>
        </form>
         </div>
    );
}
export default OldLogin;
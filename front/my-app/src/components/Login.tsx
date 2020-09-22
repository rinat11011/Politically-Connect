import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {CardDeck} from "react-bootstrap";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [key, setKey] = useState("");
    const [auth, setauth] = useState(false);
    const [removeToken, SetRemoveToken] = useState(false);

    function ClearStorage() {
        SetRemoveToken(true);
        localStorage.clear();
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        // @ts-ignore
        signUpButton.addEventListener('click', () => {
            // @ts-ignore
            container.classList.add("right-panel-active");
        });

        // @ts-ignore
        signInButton.addEventListener('click', () => {
            // @ts-ignore
            container.classList.remove("right-panel-active");
        });
    }, [])

    useEffect(() => {
        // Update the document title using the browser API
        !removeToken ? ClearStorage() : console.log("a")
    }, [removeToken]);

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
                setauth(true);
                localStorage.setItem('username', res.username);
                console.log(res.username);
                await getPartyName(res.username);


            } else {
                alert(response.status);
            }
        } catch (e) {
            console.log("My error: " + e);
        }
    }


    async function getPartyName(username: String) {
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        try {
            const response = await fetch("/partiesInformation/getPartyName?username=" + username, {
                method: "GET",
                headers: header,
            });
            if (response.ok) {
                console.log(response);
                // let res = await response.json();
                let res = await response.text();
                console.log(res);
                localStorage.setItem('partyName', res);
            } else {
                alert(response.status);
            }
        } catch (e) {
            console.log("My error: " + e);
        }
    }


    return (
        auth ?
            ((userName === "MinistryOfJustice") ?
                <Redirect to={{pathname: '/MOJPage'}}/> :
                <Redirect to={{pathname: '/PartyPage', state: {id: userName}}}/>) :
            <div style={{position: "fixed", height: "100%", width: "100%", overflow: "scroll"}}>
                <div style={{position: "relative",display:"flex", flexFlow:"column", justifyContent:"flex-start" ,top: "20%"}} className="my_style">

                    <div className="container" id="container">
                        <div className="form-container sign-up-container">
                            <form action="#">
                                <h1>About Us</h1><br/>
                                <p style={{textAlign: "center"}}>
                                    <h6> PoliticallyConnect אנחנו</h6>
                                    ושמנו לנו למטרה לפתור <br/>
                                    את בעיית ההתפקדויות הכפולות<br/><br/>
                                    לשם כך ייצרנו מערכת המבוססת על<br/>
                                    הטכנולוגיה החדשנית של
                                    <h6>BlockChain</h6>


                                </p>
                                <button>צור קשר</button>
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form onSubmit={login} action="#">
                                <h1 style={{paddingBottom: "20px"}}>Sign in</h1>
                                <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
                                <input type="password" placeholder="Password"
                                       onChange={e => setPassword(e.target.value)}/>
                                <input type="password" placeholder="Secret key" onChange={e => setKey(e.target.value)}/>
                                <a href="/#">Forgot your password?</a>
                                <button type="submit">Sign In</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your registry info</p>
                                    <button className="ghost" id="signIn">Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Click here to learn more about this project</p>
                                    <button className="ghost" id="signUp">About Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    );
}


export default Login;
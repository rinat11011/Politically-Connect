import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";



function GetChain() {
    const [blockchain, setBlockchain] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        getChain();
    },[]);


    async function getChain() {
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {
            const response = await fetch("/blockChain/getChain",{
                method: "GET",
                headers: header,
            });
            if (response.ok) {
                let res = await response.json();
                console.log(res);
                console.log(res.content);
                setBlockchain(res.content);

            }
            else {
                alert(response.status);
            }

        }catch (e) {
            console.log("My error: " + e);
        }
    }

    return (
        <div>
            <NavBar />
            <div className="party_page">

                <div className="auth-inner-table">
                    <h1>שרשרת הנתונים</h1>
                    <div><pre style={{textAlign:"left"}}>
                        {JSON.stringify(blockchain, null, 2) }</pre></div>
                    <div style ={{textAlign:"center", marginTop:"60px"}}>
                        <button onClick={() => setPage(page-11)} style={{border:"1px solid white", backgroundColor:"white",color: "black"}} className="next">&laquo; Previous</button>
                        <button onClick={() => setPage(page+1)} style={{border:"1px solid white", backgroundColor:"white",color: "black"}} className="next">Next &raquo;</button>
                    </div>
                    <Link to = {{pathname: `/PartyPage`, state:{id:localStorage.getItem('username')}}} >
                        <button type="button" style={{marginBottom:"10px"}} >
                            חזרה לדף הבית
                            <svg style={{marginLeft:"10px"}} className="bi bi-house-door" width="1em" height="1em" viewBox="0 2 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clipRule="evenodd"/>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GetChain
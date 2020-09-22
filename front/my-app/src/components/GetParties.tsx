import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

function GetParties() {
    //const [candidateList, setCandidateList] = useState([{}]);
    const [parties, setParties] = useState([]);
    const [filteredParties, setfilteredParties] = useState([]);
    useEffect(() => {
        // Update the document title using the browser API
        getParties();
    },[]);


/*    function mapping() {
        return( parties.map(({id,name,key}) => {                                // changed here
            return (
                <li className="list_item"  key={id}>
                    {name}
                </li>
            );
        })
    )}*/

    async function getParties() {
        const header = new Headers();
        header.append('Access-Control-Request-Method', '*');
        header.append('Content-Type', 'application/json');
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token);
        try {
            const response = await fetch("/partiesInformation/getParties", {
                method: "GET",
                headers: header,
            });
            if (response.ok) {
                console.log(response);
                let lst : [] = await response.json()
                setParties(lst);
                setfilteredParties(lst);
                console.log(lst);
                //lst.forEach((e) => {setParties( [...parties, e]);});

            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }
    function getTableBodyAsReactElement() {
        return (filteredParties.map(({name, pubKey}, index) => {                                // changed here
                return (<tr  style={{position:"relative"}} key={index}>
                    <td style={{position:"absolute", width:"50%",overflowX: "scroll"}}>{pubKey}</td>
                    <td>{name}</td>
                </tr>);
            })
        )};

    function search(value: string) {
        setfilteredParties(parties.filter(
            ({name, pubKey})=>{
                // @ts-ignore
                return name.startsWith(value);
            }
        ))

    }
    return(
        <div>
            <NavBar />
        <div className={"MOJ_page"}>
        <div className="auth-inner-party">
                <h1 style={{direction : "rtl"}}>מפלגות רשומות</h1>
            <div style={{position:"relative", left:"250px"}}>
                <input className="search-style" type="search" placeholder="הכנס שם לחיפוש"
                       style={{width:"200px", textAlign:"right"}}
                       onChange={e => search(e.target.value)}/>
            </div>

            <table   className="table table-hover" style={{textAlign:"right"}} >
                    <thead>
                    <tr>
                        <th style={{direction: "rtl"}}>מפתח</th>
                        <th>שם המפלגה</th>

                    </tr>
                    </thead>
                    <tbody >
                    {getTableBodyAsReactElement()}
                    </tbody>
                </table>
            <Link to = {`/MOJPage`}><button type="button" style={{marginTop:"50px"}} >
                Back To Main
                <svg style={{marginLeft:"10px"}}  width="1em" height="1em" viewBox="0 2 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

export default GetParties;
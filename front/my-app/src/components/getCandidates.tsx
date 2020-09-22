import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
// import Alert from 'react-bootstrap/Alert'

// function GetCandidates(props: any) {
function GetCandidates() {
    const [candidateList, setCandidateList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        getCandidates();
    },[]);


    async function getCandidates() {
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {
            const response = await fetch("/Data/getMembersInformation?input=" +localStorage.getItem("key")+","+localStorage.getItem("partyName") ,{
                method: "GET",
                headers: header,
            });
            if (response.ok) {
                let res = await response.json();
                setCandidateList(res);
                setfilteredList(res);
                //let str = "";
                console.log(res);
                //res.forEach((can: { id: string; status: string; })=>{ str += ", " + can.id +" " + can.status + "\n"})
                //console.log(str);
            }
            else {
                alert(response.status);
            }

        }catch (e) {
            console.log("My error: " + e);
        }
    }
    // {id: "" ,firstName: "" ,lastName:"" ,gender:"" ,address:"" ,age:"" ,familyStatus:"" ,email:"" ,tel:"" ,ZIPcode:"" ,birthCountry: "" ,yearOfAliah:""
    function getTableBodyAsReactElement() {
        return (filteredList.map(({id,firstName, lastName, gender, address, age, family_status, email, phone, zipCode,birthCountry ,yearOfAliyah}) => {                                // changed here
                return (<tr key={id}>
                    <td>{yearOfAliyah}</td>
                    <td>{birthCountry}</td>
                    <td>{zipCode}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>{family_status}</td>
                    <td>{age}</td>
                    <td>{address}</td>
                    <td>{gender}</td>
                    <td>{lastName}</td>
                    <td>{firstName}</td>
                    <td>{id}</td>
                </tr>);
            })
        )};

    function Search(value: string) {
        setfilteredList(candidateList.filter(
            ({firstName,lastName }) => {
                // @ts-ignore
                return firstName.startsWith(value) | lastName.startsWith(value);
            }
        ));

    }

    return (
        <div>
            <NavBar />
            <div className="party_page">

             <div className="auth-inner-table">
            <h1>חברי מפלגה</h1>
                 <div style={{position:"relative", left:"600px"}}>
                 <input className="search-style" type="search" placeholder="הכנס שם לחיפוש"
                        style={{width:"200px", textAlign:"right"}}
                        onChange={e => Search(e.target.value)}/>
                 </div>
            <table  className="table table-hover">
                <thead>
                <tr>
                    <th>שנת עלייה</th>
                    <th>ארץ מוצא</th>
                    <th>מיקוד</th>
                    <th>טלפון</th>
                    <th>אימייל</th>
                    <th>מצב משפחתי</th>
                    <th>תאריך לידה</th>
                    <th>כתובת</th>
                    <th>מגדר</th>
                    <th>שם משפחה</th>
                    <th>שם פרטי</th>
                    <th>תעודת זהות</th></tr>
                </thead>
                <tbody>
                {getTableBodyAsReactElement()}
                </tbody>
            </table>
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

export default GetCandidates
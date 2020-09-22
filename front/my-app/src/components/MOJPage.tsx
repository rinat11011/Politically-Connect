import React from "react";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import AddParties from "./AddParties";
import RemoveParties from "./RemoveParties";
import i from "./photos/MOJ.jpeg";
import add from "./photos/add.png";
import remove from "./photos/remove.png";
import crowd from "./photos/crowd.png";
import survey from "./photos/survey.png";

function MOJPage() {
    const [showAddParty, setShowAddParty] = React.useState(false)
    const [showRemoveParty, setShowRemoveParty] = React.useState(false)
    return (
        <div>
            <NavBar />
            <div className="MOJ_page">
                <div>
                    { showAddParty ?
                        (<div>
                            <AddParties />
                            <button style={{ marginLeft:"160px", marginBottom:"30px"}} onClick={()=>setShowAddParty(false)}>close</button></div>)
                        : null }
                    { showRemoveParty ?
                        <div>
                            <RemoveParties />
                            <button style={{ marginLeft:"160px", marginBottom:"30px"}} onClick={()=>setShowRemoveParty(false)}>close</button>
                        </div>
                        : null }
                </div>
        <div className="auth-inner">
            <img alt="ministry logo" style={{display:"block",marginLeft:"auto",marginRight:"auto", marginTop:"30px",marginBottom:"40px", width:"270px", height:"100px" }} src={i}/>
            <button  type="button" className="party_page-button" onClick={()=>{setShowAddParty(!showAddParty); setShowRemoveParty(false)}} >
                <span className="my_a">הוספת מפלגה</span>
                <img alt="plus" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={add}/>

            </button>
            <button  type="button" className="party_page-button" onClick={()=>{setShowRemoveParty(!showRemoveParty); setShowAddParty(false)}}>
                <span className="my_a">מחיקת מפלגה</span>
                <img alt="minus" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={remove}/>
            </button>
            <Link to={`/MOJ/getParties`}>
                <button  type="button" className="party_page-button" >
                    <span className="my_a">רשימת מפלגות</span>
                    <img alt="list"  style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={crowd}/>
                </button>
            </Link>
            <Link to={`/MOJ/getParties`}>
                <button  type="button" className="party_page-button" >
                    <span className="my_a">נתונים סטטיסטים</span>
                    <img alt="stat" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={survey}/>
                </button>
            </Link>
            {/*change the button below*/}
        </div>
        </div>
        </div>
    );
}

export default MOJPage;
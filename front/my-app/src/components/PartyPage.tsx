import React from "react";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import add from "./photos/add.png"
import remove from "./photos/remove.png"
import crowd from "./photos/crowd.png"
import chain from "./photos/chain.png"
import survey from "./photos/survey.png"
import stat from "./photos/stats1.png"
import AddRegister from "./AddRegister";
import RemoveRegister from "./RemoveRegister";



function PartyPage(props: any) {
    const partyName = props.location.state.id;
    const [showAddRegister, setShowAddRegister] = React.useState(false);
    const [showRemoveRegister, setShowRemoveRegisters] = React.useState(false);
    return (
        <div >
        <NavBar />
            <div className="party_page">
                <div>
                    { showAddRegister ?
                        (<div>
                            <AddRegister />
                            <button style={{ marginLeft:"160px", marginBottom:"30px"}} onClick={()=>setShowAddRegister(false)}>close</button></div>)
                        : null }
                    { showRemoveRegister ?
                        <div>
                        <RemoveRegister />
                        <button style={{ marginLeft:"160px", marginBottom:"30px"}} onClick={()=>setShowRemoveRegisters(false)}>close</button>
                        </div>
                        : null }
                </div>
                <div className="auth-inner">
                    <img alt="logo" style={{display:"block",marginLeft:"auto",marginRight:"auto", marginTop:"30px",marginBottom:"40px", width:"270px", height:"100px" }} src={require(`./photos/${partyName}.png`)}/>
                            <button  type="button" className="party_page-button" onClick={()=>{setShowAddRegister(!showAddRegister); setShowRemoveRegisters(false)}} >
                                <span className="my_a">הוספת מתפקד</span>
                                <img alt="add" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={add}/>

                            </button>

                            <button  type="button" className="party_page-button" onClick={()=>{setShowRemoveRegisters(!showRemoveRegister); setShowAddRegister(false)}}>
                                <span className="my_a">מחיקת מתפקד</span>
                                <img alt="remove" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={remove}/>

                            </button>
                        <Link to={`${props.location.state.id}/GetCandidates`}>
                            <button  type="button" className="party_page-button" >
                                <span className="my_a">רשימת חברי מפלגה</span>
                                <img alt="party members" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={crowd}/>

                            </button>
                        </Link>
                        <Link to={`${props.location.state.id}/GetCandidates`}>
                            <button  type="button" className="party_page-button" >
                                <span className="my_a">ערוך סקר</span>
                                <img alt="survey" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={survey}/>

                            </button>
                        </Link>
                        <Link to={`${props.location.state.id}/Stat`}>
                            <button  type="button" className="party_page-button" >
                                <span className="my_a">סטטיסטיקה</span>
                                <img alt="stat" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={stat}/>

                            </button>
                        </Link>
                        <Link to={`${props.location.state.id}/blockchain`}>
                            <button  type="button" className="party_page-button" >
                                <span className="my_a">צפה בשרשרת</span>
                                <img alt="chain" style={{ marginBottom:"10px",width:"50px", height:"50px" }} src={chain}/>

                            </button>
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default PartyPage;

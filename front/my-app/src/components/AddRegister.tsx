import React, {useState} from "react";
import {Toast} from "react-bootstrap";

function AddRegister() {
    const [candidate, setCandidate] = useState({id: "" ,party:localStorage.getItem("partyName"),firstName: " " ,lastName:" " ,gender:" " ,address:" " ,age:" " ,family_status:" " ,email:" " ,phone:" " ,zipCode:" " ,birthCountry: " " ,yearOfAliyah:" "});
    const [registerDup, setRegisterDup] = useState(false);
    const [showA, setShowA] = useState(true);


    const toggleShowA = () => {setShowA(!showA); setRegisterDup(false)};

    async function createCandidate(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let listCand = [candidate];
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {   
            console.log(JSON.stringify(listCand));
            const response = await fetch("/registry/addregisters", {
                method: "POST",
                headers: header,
                body: JSON.stringify(listCand)
            });
            if (response.ok) {
                let res = await response.json();
                if(res.length === 0) {
                    alert("All candidates add to pending request, They will be added in the next 24 hours");
                    const res2 = await fetch("/blockChain/mineBlock", {
                        method : "POST",
                        headers: header
                    });
                    if(res2.ok){
                        console.log("Block mined!");
                    }
                }
                else{
                    console.log(res);
                    setRegisterDup(true);
                    setShowA(true);
                    console.log(registerDup);
                    res.forEach((can : any)=> {
                        console.log("im in for each")


                              //  alert(str += ", " + can.id + " " + can.status + "\\n");
                    });
                    console.log(registerDup);
                }

            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    function message() {
        return (
            <Toast style={{marginBottom:"20px" }}show={showA} onClose={toggleShowA}>
            <Toast.Header>
                <strong className="mr-auto">PoliticallyConnect</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body style={{textAlign:"right", fontSize:"20px", fontWeight:"bold", color:"red"}}>אופס! המתפקד כבר רשום למערכת</Toast.Body>
        </Toast>);
    }

    return (
        <div>

        <div className="auth-inner-register-action-scroll">
        <form style={{paddingTop:"200px",paddingBottom:"50px",display: "flex",marginTop:"50",textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => createCandidate(e)}>
            <h1>רישום</h1>
            <div style={{marginTop:"20px"}}>
                <label  className="required" style={{marginBottom:"0"}} >תעודת זהות</label>
                <input required style={{marginTop:"0", textAlign:"right"}} onChange={e => setCandidate({...candidate, id: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס תעודת זהות"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label className="required" style={{marginBottom:"0"}}>שם פרטי</label>
                <input required style={{marginTop:"0",textAlign:"right"}} onChange={e => setCandidate({...candidate, firstName: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס שם פרטי"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label className="required" style={{marginBottom:"0px"}}>שם משפחה</label>
                <input required style={{marginTop:"0" ,textAlign:"right"}} onChange={e => setCandidate({...candidate, lastName: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס שם משפחה"/>
            </div>
            <div style={{ marginTop:"20px"}}>
                <label  style={{marginBottom:"0"}}>מגדר</label>
                {/*<input style={{marginTop:"0px"}} onChange={e => setCandidate({...candidate, gender: e.target.value})} type="text"*/}
                {/*       className="form-control" placeholder="Enter gender">*/}
                {/*    */}
                {/*</input>*/}
           <div>
                    <select style={{direction:"rtl",width:"210px"}} className="custom-select" onChange={e => setCandidate({...candidate, gender: e.target.value})} >
                        <option style={{textAlign:"right"}} value="לא מעוניין להצהיר">בחר מגדר</option>
                        <option style={{textAlign:"right"}}  value="זכר">זכר</option>
                        <option style={{textAlign:"right"}}  value="נקבה">נקבה</option>
                        <option style={{textAlign:"right"}}  value="לא מעוניין להצהיר">לא מעוניין להצהיר</option>
                    </select>
           </div>
            </div>

            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0"}}>כתובת</label>
                <input style={{marginTop:"0", textAlign:"right"}} onChange={e => setCandidate({...candidate, address: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס כתובת"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0"}}>תאריך לידה</label>
                <input style={{marginTop:"0", textAlign:"right"}} onChange={e => setCandidate({...candidate, age: e.target.value})} type="date"
                       className="form-control" placeholder="הכנס תאריך לידה"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0"}}>מצב משפחתי</label>
                <div>
                    <select style={{direction:"rtl",width:"210px"}} className="custom-select" onChange={e => setCandidate({...candidate, family_status: e.target.value})} >
                        <option style={{textAlign:"right"}} value="לא הוזן">בחר מצב משפחתי</option>
                        <option style={{textAlign:"right"}}  value="רווק/ה">רווק/ה</option>
                        <option style={{textAlign:"right"}}  value="נשוי/ה">נשוי/ה</option>
                        <option style={{textAlign:"right"}}  value="יודע/ה בציבור">יודע/ה בציבור</option>
                        <option style={{textAlign:"right"}}  value="גרוש/ה">גרוש/ה </option>
                    </select>
                </div>
            </div>
            <div style={{marginTop:"20px"}}>
                <label className="required" style={{marginBottom:"0px"}}>כתובת מייל</label>
                <input required style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, email: e.target.value})} type="email"
                       className="form-control" placeholder="הכנס אימייל"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label className="required" style={{marginBottom:"0px"}}>טלפון נייד</label>
                <input required style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, phone: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס מספר טלפון"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>מיקוד</label>
                <input style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, zipCode: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס מיקוד"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>ארץ לידה</label>
                <input style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, birthCountry: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס ארץ מוצא"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>שנת עלייה</label>
                <input style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, yearOfAliyah: e.target.value})} type="text"
                       className="form-control" placeholder="שנת עלייה"/>
            </div>
            <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
        </form>
        </div>
            <div style={{marginTop:"20px", marginLeft:"70px", marginRight:"auto"}}>
                {registerDup? message() : null}
            </div>
        </div>
    );
}

export default AddRegister;
import React, {useState} from "react";

function AddParties() {
    const [party, setParty] = useState("");
    const [added, setAdded] = useState(({first: "",second:""}));
    const [next, setnext] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    async function addParties(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //setCandidateList(candidateList => [...candidateList,candidate]);
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {
            const response = await fetch("/partiesInformation/addParty?parties=" + party, {
                method: "POST",
                headers: header,
            });
            if (response.ok) {
                //let res = await response.json();
                //let lst : [] = await response.json();
                let lst = await response.json();
                setAdded(lst);
                console.log(added);
                setnext(true);
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    async function addUser(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(added);
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token);
        let user = {username: userName, email: email, password: password, roles: [""], partyName: party}
        try {
            console.log(user);
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: header,
                body: JSON.stringify(user)
            });
            if (response.ok) {
                //let res = await response.json();
                let res =await response.json();
                alert(res.message);
                setnext(true);
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    return (next?
            <div className="auth-inner-register-action">
                <form style={{textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => addUser(e)}>
                    <h1>רישום מפלגה</h1>
                    <div style={{marginTop:"20px"}}>
                        <label style={{marginBottom:"0px"}}>שם המפלגה</label>
                        <input style={{marginTop:"0px", textAlign:"right"}} disabled={true} type="text" value = {party}
                               className="form-control" placeholder="Enter Party Name"></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label style={{marginBottom:"0px"}}>מפתח</label>
                        <input style={{marginTop:"0px", textAlign:"right"}} disabled={true} type="text" value ={added.second}
                               className="form-control" placeholder="Enter Party Name"></input>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label style={{marginBottom:"0px"}} className="required">שם משתמש</label>
                        <input required style={{marginTop:"0px", textAlign:"right"}} onChange={e => setUserName(e.target.value)} type="text"
                               className="form-control" placeholder="הכנס שם משתמש"/>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label style={{marginBottom:"0px"}} className="required">אימייל</label>
                        <input required style={{marginTop:"0px", textAlign:"right"}} onChange={e => setEmail(e.target.value)} type="email"
                               className="form-control" placeholder="הכנס כתובת מייל"/>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <label style={{marginBottom:"0px"}} className="required">סיסמא</label>
                        <input required style={{marginTop:"0px", textAlign:"right"}} onChange={e => setPassword(e.target.value)} type="text"
                               className="form-control" placeholder="הכנס סיסמא"/>
                    </div>
                    <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
                </form>
            </div>
            :
        <div className="auth-inner-register-action">
            <form  style={{textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => addParties(e)}>
            <h1>רישום מפלגה</h1>
            <div style={{marginTop:"20px"}}>
                <label  className="required" style={{marginBottom:"0px"}} >שם המפלגה</label>
                <input required style={{marginTop:"0px", textAlign:"right"}}onChange={e => setParty(e.target.value)} type="text"
                       className="form-control" placeholder="הכנס שם מפלגה"/>
            </div>
                <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
        </form>
    </div>
    );
}

export default AddParties;
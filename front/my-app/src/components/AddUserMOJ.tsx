import React, {useState} from "react";

function AddUserMOJ(props: any) {
    const party= props.location.state.partyName;
    const added = useState(props.location.state.shamir);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState("");


    async function addUser(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(added);
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token);
        let user = {username: party, email: email, password: password, roles: [roles]}
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: header,
                body: JSON.stringify(user)
            });
            if (response.ok) {
                //let res = await response.json();
                 let res =await response.json();
                 alert(res.message);
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    return (
        <div className="auth-inner-register-action">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => addUser(e)}>
                <h1>רישום מפלגה</h1>
                <div style={{marginTop:"20px"}}>
                    <label>שם המפלגה</label>
                    <input disabled={true} type="text" value = {party}
    className="form-control" placeholder="Enter Party Name"/>
                </div>
                <div style={{marginTop:"20px"}}>
                    <label>מפתח</label>
                    <input disabled={true} type="text" value ={added}
    className="form-control" placeholder="Enter Party Name"/>
                </div>
                <div style={{marginTop:"20px"}}>
                    <label>אימייל</label>
                    <input onChange={e => setEmail(e.target.value)} type="email"
                           className="form-control" placeholder="הכנס כתובת מייל"/>
                </div>
                <div style={{marginTop:"20px"}}>
                    <label>סיסמא</label>
                    <input onChange={e => setPassword(e.target.value)} type="text"
                           className="form-control" placeholder="הכנס סיסמא - שתהיה חזקה בחייאת"/>
                </div>
                <div className="form-group">
                    <label>הרשאות</label>
                    <input onChange={e => setRoles(e.target.value)} type="text"
                           className="form-control" placeholder="הכנס סוג הרשאה"/>
                </div>
                <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
            </form>
        </div>
    );
}

export default AddUserMOJ;
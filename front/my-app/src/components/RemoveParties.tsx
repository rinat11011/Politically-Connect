import React, {useState} from "react";


function RemoveParties() {
    const [party, setParty] = useState("");

    async function RemoveParties(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {
            const response = await fetch("/partiesInformation/removeParty?parties=" + party, {
                method: "POST",
                headers: header,
            });
            if (response.ok) {
                let res = await response.json();
                alert(party + " is removed from the system");
                console.log(res);
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    return (
        <div className="auth-inner-register-action">
        <form style={{textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => RemoveParties(e)}>
            <h1>הסרת מפלגה</h1>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>שם המפלגה</label>
                <input required style={{marginTop:"0px", textAlign:"right"}} onChange={e => setParty(e.target.value)} type="text"
                       className="form-control" placeholder="הכנס את שם המפלגה"/>
            </div>
            <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
        </form>
        </div>
    );
}

export default RemoveParties;
import React, {useState} from "react";

function RemoveRegister() {
    const [candidate, setCandidate] = useState({id: "" ,party:localStorage.getItem("partyName"),firstName: "" ,lastName:"" ,gender:"" ,address:"" ,age:"" ,family_status:"" ,email:"" ,phone:"" ,zipCode:"" ,birthCountry: "" ,yearOfAliyah:""});


    async function removeCandidate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let listCand = [candidate];
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization',token );
        try {
            console.log(JSON.stringify(listCand));
            const response = await fetch("/registry/removeregisters", {
                method: "POST",
                headers: header,
                body: JSON.stringify(listCand)
            });
            if (response.ok) {
                let res = await response.json();
                if(res.length === 0)
                    alert("All candidates moved to pending request, They will be removed in the next 24 hours");
                else{
                    let str: String = "";
                    console.log(res);
                    res.forEach((can : any)=>{ str += ", " + can.id +" " + can.status + "\n"})
                    console.log(str);
                }
            } else {
                alert(response.status);
            }
        }catch (e) {
            console.log("My error: " + e);
        }

    }

    return (
        <div className="auth-inner-register-action">
        <form style={{textAlign:"right"}}  onSubmit={(e: React.FormEvent<HTMLFormElement>) => removeCandidate(e)}>
                 <h1>הסרה</h1>
                <div style={{marginTop:"20px"}}>
                    <label style={{marginBottom:"0px"}}>תעודת זהות</label>
                    <input required style={{marginTop:"0px", textAlign:"right"}} onChange={e => setCandidate({...candidate, id: e.target.value})} type="text"
                           className="form-control" placeholder="הכנס תעודת זהות"/>
                </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>שם פרטי</label>
                <input required style={{marginTop:"0px",textAlign:"right"}} onChange={e => setCandidate({...candidate, firstName: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס שם פרטי"/>
            </div>
            <div style={{marginTop:"20px"}}>
                <label style={{marginBottom:"0px"}}>שם משפחה</label>
                <input required style={{marginTop:"0px" ,textAlign:"right"}} onChange={e => setCandidate({...candidate, lastName: e.target.value})} type="text"
                       className="form-control" placeholder="הכנס שם משפחה"/>
            </div>
            <button style={{marginTop:"20px", backgroundColor:"#44c767", border:"black"}} type="submit" >Submit</button>
        </form>
        </div>
    );
}
export default RemoveRegister;
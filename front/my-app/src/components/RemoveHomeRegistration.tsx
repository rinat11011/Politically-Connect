import React, {useState} from "react";
import {Link} from "react-router-dom";



function RemoveHomeRegistration() {
    const [candidate, setCandidate] = useState({
        id: "",
        party: "",
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        age: "",
        family_status: "",
        email: "",
        phone: "",
        zipCode: "",
        birthCountry: "",
        yearOfAliyah: ""
    });
    const [response, setResponse] = useState<String>("");
    const [showResults, setShowResults] = React.useState(false);

    function onClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShowResults(true);
    }
    async function removeCandidate() {
        let listCand = [candidate];
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        const token = 'Bearer ' + localStorage.getItem('token');
        header.append('Authorization', token);
        try {
            console.log(JSON.stringify(listCand));
            const response = await fetch("/registry/removeregisters", {
                method: "POST",
                headers: header,
                body: JSON.stringify(listCand)
            });
            if (response.ok) {
                let res = await response.json();
                if (res.length === 0){
                    setResponse("בקשתך התקבלה בהצלחה!");
                }

                else {
                    let str: String = "";
                    console.log(res);
                    res.forEach((can: any) => {
                        str += ", " + can.id + " " + can.status + "\n"
                    })
                    console.log(str);
                    setResponse("הבקשה נכשלה, וודא כי הפרטים שמסרת נכונים!");
                }
            } else {
                setResponse("הבקשה נכשלה, וודא כי הפרטים שמסרת נכונים!");
                // alert(response.status);
            }
        } catch (e) {
            console.log("My error: " + e);
        }

    }

    return (
        response !== "" ?
            <div style={{position:"fixed", height:"100%", width:"100%"}}>
                <h1 className="response">{response}</h1>
                <br/>
                <Link to={`/`}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button style={{backgroundColor: "#44c767", border: "black"}} type="submit">חזור לדף הבית
                        </button>
                    </div>
                </Link>
            </div> :
            <div className="contentContainer">

                <div >
                    <div className="pinktopnav">
                        <b>התפקדות מהבית</b>
                        <a href="/">חזרה לדף הבית</a>

                    </div>

                <div style={{display: "inline"}} >
                    <div className="b">
                        <h3 className="home-text">טופס בקשת ביטול חברות</h3>
                        <h3 className="home-text-small"> הסרה ממפלגה כרוכה במילוי פרטים אישיים התואמים לפרטים שנמסרו בעת ההרשמה. </h3>
                        <h3 className="home-text-small">לאחר לחיצה על כפתור "שגר בקשה", ישלח קוד אימות למספר הטלפון אשר נמצא במערכת.</h3>
                        <div>

                            { showResults ?
                                <div style={{alignItems:"center", justifyContent:"center"}}>

                                    <input style={{direction:"rtl"}} placeholder="הזן קוד אימות"/>
                                    <button style={{marginLeft:"45%",width:"10%",paddingRight:"15%", paddingLeft:"7%",textAlign: "center", backgroundColor: "#957bc1", border: "black", fontSize:"1vw"}} onClick={removeCandidate}>אישור
                                    </button>
                                </div>:
                                null }

                        </div>
                    </div>
    </div>
                <div style={{display: "inline", flexDirection:"row", position:"absolute", left:"10%", right:"50%",top:"130%",marginBottom:"4%", border:"2px solid #DCDCDC" }} >
                    <form style={{textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => onClick(e)}>
                        <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                            <label  className="required" style={{marginBottom: "0"}}>מפלגה</label>
                            <div >
                                <select style={{direction: "rtl"}} className="custom-select"
                                        onChange={e => setCandidate({...candidate, party: e.target.value})}>
                                    <option style={{textAlign: "right"}} value="">בחר מפלגה</option>
                                    <option style={{textAlign: "right"}} value="PoliticallyConnect">PoliticallyConnect</option>
                                    <option style={{textAlign: "right"}} value="BGU">BGU</option>
                                    <option style={{textAlign: "right"}} value="Winners">Winners</option>
                                    <option style={{textAlign: "right"}} value="Google">Google</option>
                                </select>
                            </div>
                        </div>
                        <div style={{marginLeft:"auto",width:"100%",marginTop: "4%"}}>
                            <label className="required" style={{marginBottom: "0"}}>ת.ז. יש להכניס ת.ז. בת 9 ספרות (כולל ספרת ביקורת)</label>
                            <input required className="home-registration-input"
                                   onChange={e => setCandidate({...candidate, id: e.target.value})} type="text"
                                   placeholder="הכנס תעודת זהות"/>
                        </div>
                        <div style={{marginLeft:"auto", width:"100%",marginTop: "4%"}}>
                            <label className="required" style={{marginBottom: "0"}}>שם פרטי</label>
                            <input required className="home-registration-input"
                                   onChange={e => setCandidate({...candidate, firstName: e.target.value})} type="text"
                                   placeholder="הכנס שם פרטי"/>
                        </div>
                        <div style={{marginLeft:"auto",width:"100%",marginTop: "4%"}}>
                            <label className="required" style={{marginBottom: "0px"}}>שם משפחה</label>
                            <input required className="home-registration-input"
                                   onChange={e => setCandidate({...candidate, lastName: e.target.value})} type="text"
                                   placeholder="הכנס שם משפחה"/>
                        </div>
                        <button style={{width:"100%",marginTop: "4%",marginBottom:"4%", backgroundColor: "#957bc1", border: "black", fontSize:"1vw"}} type="submit">שגר בקשה
                        </button>
                </form>
            </div>
             </div>
            </div>
    );
}

export default RemoveHomeRegistration;
import React, {useState} from "react";
import {Link} from "react-router-dom";


function HomeRegistration() {
    //const [candidateList, setCandidateList] = useState([{}]);
    const [candidate, setCandidate] = useState({
        id: "",
        party: "",
        firstName: " ",
        lastName: " ",
        gender: " ",
        address: " ",
        age: " ",
        family_status: " ",
        email: " ",
        phone: " ",
        zipCode: " ",
        birthCountry: " ",
        yearOfAliyah: " "
    });
    const [response, setResponse] = useState<String>("")

    async function createCandidate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //setCandidateList(candidateList => [...candidateList,candidate]);
        let listCand = [candidate];
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=utf-8')
        // const token = 'Bearer ' + localStorage.getItem('token');
        // header.append('Authorization', token);
        try {
            console.log(JSON.stringify(listCand));
            const response = await fetch("/registry/addregisters", {
                method: "POST",
                headers: header,
                body: JSON.stringify(listCand)
            });
            if (response.ok) {
                let res = await response.json();
                if (res.length === 0) {
                    // alert("All candidates add to pending request, They will be added in the next 24 hours");
                    setResponse("בקשתך התקבלה בהצלחה!");
                    const res2 = await fetch("/blockChain/mineBlock", {
                        method : "POST",
                        headers: header
                    });
                    if(res2.ok){
                        console.log("Block mined!");
                    }
                }
                else {
                    // alert("CANNOT BE REGISTERED!")
                    let str: String = "";
                    console.log(res);
                    res.forEach((can: any) => {
                        str += ", " + can.id + " " + can.status + "\n"
                    })
                    console.log(str);
                    setResponse("הבקשה נכשלה, וודא כי הפרטים שמסרת נכונים וכי אינך חבר במפלגה נוספת!");
                }
            } else {
                setResponse("הבקשה נכשלה, וודא כי הפרטים שמסרת נכונים וכי אינך חבר במפלגה נוספת!");
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
                <div>
                <div className="pinktopnav">
                    <b>התפקדות מהבית</b>
                    <a href="/">חזרה לדף הבית</a>

                </div>
                <div style={{display: "inline"}}  >
                    <div className="b">

                    <h3 className="home-text">שמחים שבחרתם להצטרף<br/>למהפכת ההתפקדות בישראל</h3>
                    <h3 className="home-text-small"> הצטרפות למפלגה כרוכה במילוי טופס אישי לכל מצטרפ/ת ובתשלום אישי. </h3>
                    <h3 className="home-text-small">אנא הקפידו למלא פרטים מלאים ומדויקים. </h3>
                    <h3 className="home-text-small">שימו לב, התפקדות כפולה הינה עבירה על החוק!</h3>
                    <h3 className="home-text-small">בסיום מילוי הפרטים, לחצו על כפתור "שגר בקשה". </h3>
                    <h3 className="home-text-xsmall"> המידע המועבר בטופס זה מאובטח בפרוטוקול SSL 256 bit כנדרש על ידי חברות האשראי.</h3>
                    </div>
                </div>
            <div style={{display: "inline", flexDirection:"row", position:"absolute", left:"10%", right:"50%",top:"130%",marginBottom:"4%", border:"2px solid #DCDCDC" }} >
                <form style={{textAlign:"right"}} onSubmit={(e: React.FormEvent<HTMLFormElement>) => createCandidate(e)}>
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
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label className="required" style={{marginBottom: "0"}}>ת.ז. יש להכניס ת.ז. בת 9 ספרות (כולל ספרת ביקורת)</label>
                        <input required className="home-registration-input"
                               onChange={e => setCandidate({...candidate, id: e.target.value})} type="text"
                               placeholder="הכנס תעודת זהות"/>
                    </div>
                    <div style={{marginLeft:"auto", width:"100%",marginTop: "5%"}}>
                        <label className="required" style={{marginBottom: "0"}}>שם פרטי</label>
                        <input required className="home-registration-input"
                               onChange={e => setCandidate({...candidate, firstName: e.target.value})} type="text"
                               placeholder="הכנס שם פרטי"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop:"5%"}}>
                        <label className="required" style={{marginBottom: "0px"}}>שם משפחה</label>
                        <input required className="home-registration-input"
                               onChange={e => setCandidate({...candidate, lastName: e.target.value})} type="text"
                               placeholder="הכנס שם משפחה"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0"}}>מגדר</label>
                        <div>
                            <select style={{direction: "rtl", width:"100%"}} className="custom-select"
                                    onChange={e => setCandidate({...candidate, gender: e.target.value})}>
                                <option style={{textAlign: "right"}} value="לא מעוניין להצהיר">בחר מגדר</option>
                                <option style={{textAlign: "right"}} value="זכר">זכר</option>
                                <option style={{textAlign: "right"}} value="נקבה">נקבה</option>
                                <option style={{textAlign: "right"}} value="לא מעוניין להצהיר">לא מעוניין להצהיר</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0"}}>כתובת</label>
                        <input className="home-registration-input"
                               onChange={e => setCandidate({...candidate, address: e.target.value})} type="text"
                               placeholder="הכנס כתובת"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0"}}>תאריך לידה</label>
                        <input className="home-registration-input"
                               onChange={e => setCandidate({...candidate, age: e.target.value})} type="date"
                               placeholder="הכנס תאריך לידה"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0"}}>מצב משפחתי</label>
                        <div>
                            <select style={{direction: "rtl",width:"100%"}} className="custom-select"
                                    onChange={e => setCandidate({...candidate, family_status: e.target.value})}>
                                <option style={{textAlign: "right"}} value="לא הוזן">בחר מצב משפחתי</option>
                                <option style={{textAlign: "right"}} value="רווק/ה">רווק/ה</option>
                                <option style={{textAlign: "right"}} value="נשוי/ה">נשוי/ה</option>
                                <option style={{textAlign: "right"}} value="יודע/ה בציבור">יודע/ה בציבור</option>
                                <option style={{textAlign: "right"}} value="גרוש/ה">גרוש/ה</option>
                            </select>
                        </div>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label className="required" style={{marginBottom: "0px"}}>כתובת מייל</label>
                        <input required className="home-registration-input"
                               onChange={e => setCandidate({...candidate, email: e.target.value})} type="email"
                               placeholder="הכנס אימייל"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label className="required" style={{marginBottom: "0px"}}>טלפון נייד</label>
                        <input required className="home-registration-input"
                               onChange={e => setCandidate({...candidate, phone: e.target.value})} type="text"
                               placeholder="הכנס מספר טלפון"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0px"}}>מיקוד</label>
                        <input className="home-registration-input"
                               onChange={e => setCandidate({...candidate, zipCode: e.target.value})} type="text"
                               placeholder="הכנס מיקוד"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0px"}}>ארץ לידה</label>
                        <input className="home-registration-input"
                               onChange={e => setCandidate({...candidate, birthCountry: e.target.value})} type="text"
                               placeholder="הכנס ארץ מוצא"/>
                    </div>
                    <div style={{marginLeft:"auto",width:"100%",marginTop: "5%"}}>
                        <label style={{marginBottom: "0px"}}>שנת עלייה</label>
                        <input className="home-registration-input"
                               onChange={e => setCandidate({...candidate, yearOfAliyah: e.target.value})} type="text"
                               placeholder="שנת עלייה"/>
                    </div>
                    <button style={{width:"100%",marginTop: "5%",marginBottom:"5%", backgroundColor: "#957bc1", border: "black", fontSize:"1.5vw"}} type="submit">שגר בקשה
                    </button>
                </form>
            </div>
            </div>

            </div>

    );
}

export default HomeRegistration;
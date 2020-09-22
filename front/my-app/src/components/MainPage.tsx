import React from "react";
import {Card, CardDeck} from "react-bootstrap";
import ourLogo from "./photos/ourLogo.jpg";
import {Link} from "react-router-dom";


function MainPage() {

    return (

        <div style={{position: "fixed" , height: "100%", width: "100%" , overflowX: "scroll"}}>
            <div style={{position: "relative", height:"20%", width:"100%"}} className="topnav">
                <img alt="logo" style={{position: "absolute" , marginRight:"8%",height:"80%", display: "inline-block"}} src={ourLogo}/>
                <a href="/">About us</a>
            </div>
            <CardDeck style={{justifyContent:"space-around", marginTop: "5%", position:"relative"}}>
                <div style={{display:"inline-block", position:"relative"}}>
                    <Card bg={"info"} style={{ width: "20rem"}}>
                        <Card.Img style={{ height: "15rem" }} src={require(`./photos/signIn.jpg`)}  />

                        <Card.Body>
                            <Card.Title  style={{textAlign:"right"}}>התחברות מפלגות</Card.Title>
                            <Card.Text  style={{textAlign:"right"}}>
                                התחברות לחברי המפלגה ומשרד המשפטים
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link style={{marginLeft:"40%"}} href="/sign-in">! לחץ כאן</Card.Link>
                        </Card.Footer>
                    </Card>
                </div>
                <div style={{display:"inline-block", position:"relative"}}>
                    <Card bg={"danger"} style={{ width: "20rem" }}>
                        <Card.Img style={{ height: "15rem" }} src={require(`./photos/leave.jpg`)} />
                        <Card.Body>
                            <Card.Title  style={{textAlign:"right"}}>עזיבת מפלגה</Card.Title>
                            <Card.Text  style={{textAlign:"right"}} >
                                הסרת חברות מכל מפלגה בלחיצת כפתור
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link style={{marginLeft:"40%"}} href="/RemoveHomeRegistration">! לחץ כאן</Card.Link>
                            {/*<Link to={`/HomeRegistration`}>*/}
                            {/*    <button style={{backgroundColor: "#d8cce0", border:"#000000", color:"#005055"}} type="button">*/}
                            {/*        <a className="my_a">הוספת מתפקד</a>*/}
                            {/*    </button>*/}
                            {/*</Link>*/}
                        </Card.Footer>
                    </Card>
                </div>
                <div style={{display:"inline-block", position:"relative"}}>
                    <Card bg={"success"} style={{ width: "20rem" }}>
                        <Card.Img style={{ height: "15rem" }} src={require(`./photos/join.jpg`)} />
                        <Card.Body>
                            <Card.Title  style={{textAlign:"right"}}>הצטרפות למפלגה</Card.Title>
                            <Card.Text  style={{textAlign:"right"}}>
                                התפקדות למפלגה הרצויה בלחיצת כפתור
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link style={{marginLeft:"40%"}} href="/HomeRegistration">! לחץ כאן</Card.Link>
                        </Card.Footer>
                    </Card>
                </div>
            </CardDeck>
        </div>
    );
}

            {/*<div style={{marginLeft:"600px", marginTop:"120px"}}>*/}
            {/*    <Link to={`/HomeRegistration`}>*/}
            {/*        <button style={{backgroundColor: "#d8cce0", border:"#000000", color:"#005055"}} type="button">*/}
            {/*            <a className="my_a">הוספת מתפקד</a>*/}
            {/*        </button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
            {/*<div style={{marginLeft:"605px", marginTop:"30px"}}>*/}
            {/*    <Link to={`/RemoveHomeRegistration`}>*/}
            {/*        <button style={{backgroundColor: "#d8cce0", border:"#000000", color:"#005055"}} type={"button"}>*/}
            {/*            <a className="my_a">הסרת מתפקד</a>*/}
            {/*        </button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
            {/*<div style={{marginLeft:"575px", marginTop:"30px"}}>*/}
            {/*    <Link to={`/sign-in`}>*/}
            {/*        <button style={{backgroundColor: "#d8cce0", border:"#000000", color:"#005055"}} type={"button"}>*/}
            {/*            <a className="my_a">התחברות מפלגות</a>*/}
            {/*        </button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
        // </div>


export default MainPage;
import React from 'react';
import {Link} from 'react-router-dom';
import '../Interfaces/Nav.css';
import ourLogo from "./photos/ourLogo.jpg";

function NavBar() {
    return (
        <nav style={{backgroundColor:"#dcdbd9", height:"130px", position:"relative"}} className="menu">
            <div className="menu__right">
                <ul className="menu__list">
                    <li className="menu__list-item"> <img alt="logo" style={{marginTop:"10px",marginLeft:"20px",height:"100px"}} src={ourLogo}/></li>
                    <div style={{position:"absolute",display:"inline", marginTop:"40px" }}>
                    <li  className="menu__list-item"><Link  className="menu__link"
                           to={{pathname: "/PartyPage" ,state:{id:localStorage.getItem('username')}}}>Home</Link></li>
                    <li   className="menu__list-item"><a className="menu__link" href="/#">About</a></li>
                    <li   className="menu__list-item"><a className="menu__link" href="/#">FAQ</a></li>
                    <li   className="menu__list-item"><a className="menu__link" href="/#">Contact</a></li>
                    <li   className="menu__list-item"><a className="menu__link" href={"/sign-in"}>Logout</a></li>
                    </div>
                </ul>
            </div>
        </nav>

    )
}
export default NavBar;

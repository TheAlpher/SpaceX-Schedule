import React from 'react'
import logo from 'assets/svg/spacex.svg';
import "./Header.css";
export default function Header() {
    return (
        <div id="header">
            <img id="headerLogo" src={logo}/>
        </div>
    )
}

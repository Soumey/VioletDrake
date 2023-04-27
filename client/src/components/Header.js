import React, {Component} from "react"
import {Link} from "react-router-dom"
import Logout from "./Logout"
 
import searchIcon from '../images/search.png'
import logo from '../images/logo.png'
 
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"
 
 
 
export default class Header extends Component
{
 
 
    render()
    {
        return (
            <div className="form-container">
 
                {
                    localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER 
                    ? <div className="logout">
                        {
                            <div className="header">
                                <div id="left" className="leftSection">
                                    <Link to={"/"}><img className="logo" src={logo} alt="logo"/></Link>
                                    <p className="logoText">Violet Drake</p>
                                </div>
                                <div id="mid" className="midSection">
                                <input type="text" className="searchBar" placeholder="Search Bar"></input>
                                    <Link className="searchBtn" to={"/EditCar"}><img className="searchIcon" src={searchIcon} alt="searchIcon"/></Link>
                                </div>
                                <div id="right" className="rightSection">
                                    <Logout />
                                <Link to="/Basket">
                                    <button className = "loginBtn">Cart</button>
                                </Link>
                                </div>
                               
 
                            </div>
                        }          
                      </div>
                    :localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER
                    ?<div className="logout">
                    { 
                        <div className="header">
                        <div id="left" className="leftSection">
                            <Link to={"/"}><img className="logo" src={logo} alt="logo"/></Link>
                            <p className="logoText">Violet Drake</p>
                        </div>
                        <div id="mid" className="midSection">
                        <input type="text" className="searchBar" placeholder="Search Bar"></input>
                            <Link className="searchBtn" to={"/EditCar"}><img className="searchIcon" src={searchIcon} alt="searchIcon"/></Link>
 
                        </div>
                        <div id="right" className="rightSection">
                            <Logout />
                            <Link to="/DeleteUser">
                            <button className = "loginBtn">Delete User</button>
                        </Link>
                        </div>
                        

 
                    </div> 
 
                    }  
                    </div>
                    :  <div className="header">
                        <div id="left" className="leftSection">
                            <Link to={"/"}><img className="logo" src={logo} alt="logo"/></Link>
                            <p className="logoText">Violet Drake</p>
                        </div>
                        <div id="mid" className="midSection">
                        <input type="text" className="searchBar" placeholder="Search Bar"></input>
                            <Link className="searchBtn" to={"/EditCar"}><img className="searchIcon" src={searchIcon} alt="searchIcon"/></Link>
 
                        </div>
                        <div id="right" className="rightSection">
                            <Link className="loginBtn" to={"/Login"}>Login</Link>
                            <Link className="registerBtn" to={"/Register"}>Register</Link>
                            
                        </div>
 
 
                    </div>
 
 
                }
            </div> 
        )
 
}
}
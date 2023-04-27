import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class DeleteUser extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name: "",
        }
    }
        
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        
        axios.delete(`${SERVER_HOST}/users/${this.state.name}`)
    }


    render()
    {         
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Login Details are incorrect<br/></div>;
        }
        
        return (
            <form className="loginContainer" noValidate = {true} id = "loginOrRegistrationForm">
                <h2>Login</h2>
                
                {this.state.isLoggedIn ? <Redirect to="/Display"/> : null} 
                
                {errorMessage}
                
                <input 
                    type = "name" 
                    name = "name" 
                    placeholder = "name"
                    autoComplete="name"
                    value={this.state.name} 
                    onChange={this.handleChange}
                /><br/>
                    
                <br/><br/>
                
                <Link className = "loginBtn" to={"/Display"} type="submit" onClick={this.handleSubmit}>Delete</Link> 
                <Link className="loginBtn" to={"/Display"}>Cancel</Link>                                      
            </form>
        )
    }
}
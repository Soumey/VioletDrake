import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            isLoggedIn:true
        }
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()
        
        axios.post(`${SERVER_HOST}/users/logout`)
        .then(res => 
        {     
            localStorage.clear() 
                    
            this.setState({isLoggedIn:false})                 
        }) 
        .catch(err =>
        {
            // do nothing
        })
    }


    render()
    {
        return (
            <div>   
        
                {!this.state.isLoggedIn ? <Redirect to="/Display"/> : null} 
                  
                <LinkInClass value="Log out" className="loginBtn" onClick={this.handleSubmit}/> 
            </div>
        )
    }
}
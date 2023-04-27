import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Basket from "./Basket"

export default class Paypal2 extends Component
{      
    static messageType = {SUCCESS:"success", 
                          ERROR:"error", 
                          CANCEL:"cancel"}
    
    constructor(props)
    {
        super(props)
        
        this.state = {redirectToBasket:false,
                      buttonColour:"red-button"}
    }          
    
    
    componentDidMount() 
    {     
        if(this.props.match.params.messageType === Paypal2.messageType.SUCCESS)
        {
            this.setState({heading:"PayPal Transaction Confirmation",
                           message:"Your PayPal transaction was successful.", 
                           buttonColour:"green-button"})
        }
        else if(this.props.match.params.messageType === Paypal2.messageType.CANCEL)
        {
            this.setState({heading:"PayPal Transaction Cancelled",
                           message:"Your Paypal transaction was cancelled."})            
        }
        else if(this.props.match.params.messageType === Paypal2.messageType.ERROR)
        {
            this.setState({heading:"PayPal Transaction Error",
                           message:"Your Paypal transaction was not completed. Please try again."})     
        }
    }
    
    
    render()
    {                 
        return (
            <div className="payPalMessage">
                
                {this.state.redirectToBasket ? <Redirect to="/Basket"/> : null} 
                
                <h3>{this.state.heading}</h3>
                <p>{this.props.match.params.message}</p>
                <p>{this.state.message}</p>
                
                {this.props.match.params.messageType === Paypal2.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}
                
                <p id="payPalPaymentIDButton"><Link className={this.state.buttonColour} to={"/Basket"}>Continue</Link></p>                                     
            </div>
        )
    }
}
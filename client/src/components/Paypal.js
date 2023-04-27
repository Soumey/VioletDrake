import React, {Component} from "react"
import PaypalButton from 'react-paypal-express-checkout'
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SANDBOX_CLIENT_ID, PRODUCTION_CLIENT_ID} from "../config/global_constants"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"
import Paypal2 from "./Paypal2"
import {Redirect} from "react-router-dom"


export default class Paypal extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = {redirectToPayPalMessage:false,
            payPalMessageType:null,
            payPalOrderID:null}
    }

    createOrder = (data, actions) => 
    {
        return (actions.order.create({purchase_units:[{amount:{value:this.props.price}}]}))
    }


    onApprove = paymentData =>
    {      
        this.setState({payPalMessageType:Paypal2.messageType.SUCCESS, 
            payPalPaymentID:paymentData.paymentID, 
            redirectToPayPalMessage:true})
    }
    
    
    onError = errorData => 
    {
        this.setState({payPalMessageType:Paypal2.messageType.ERROR, 
            redirectToPayPalMessage:true})       
    }
    
    
    onCancel = cancelData => 
    {
        this.setState({payPalMessageType:Paypal2.messageType.CANCEL, 
            redirectToPayPalMessage:true})  
    }
    
    
    render() 
    {
                 
        const environment = "sandbox"  // must be either "sandbox" or "production"
        
        const client_id = {sandbox: SANDBOX_CLIENT_ID,
                           production: PRODUCTION_CLIENT_ID}

        const redirect = `/Paypal2/${this.state.payPalMessageType}/${this.state.payPalPaymentID}`

                
        return (  
            //<PayPalScriptProvider options={{currency:"PLN", "client-id":SANDBOX_CLIENT_ID }}>  
            <div> 
            {this.state.redirectToPayPalMessage ? <Redirect to= {redirect}/> : null}   
            <PayPalScriptProvider options={{currency: 'PLN', "client-id":SANDBOX_CLIENT_ID }}>                  
            <PayPalButtons 
                env = {environment}
                //client = {client_id}
                
                //currency = "PLN"
                //amount: {total: this.state.price, currency: 'EUR'}
                //total = {this.props.price}
                createOrder={this.createOrder}

                
                
                
                onApprove = {this.onApprove}
                onError = {this.onError}               
                onCancel = {this.onCancel}                   
            
                style={{size: "small", color: "blue"}}
            />
            </PayPalScriptProvider> 
            </div> 
        )
    }
}
import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/header.css"
import "./css/slider.css"
import "./css/bottombar.css"
import "./css/login_registration.css"
import "./css/table.css"
import "./css/product.css"
import "./css/Paypal.css"

import Register from "./components/Register"
import CreateProduct from "./components/CreateProduct"
import Category from "./components/Category"
import Header from "./components/Header"
import Categories from "./components/Categories"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Display from "./components/Display"
import DeleteUser from "./components/DeleteUser"
import LoggedInRoute from "./components/LoggedInRoute"
import Basket from "./components/Basket"
import Paypal from "./components/Paypal"
import Paypal2 from "./components/Paypal2"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Category/:categoryy" component={Category}/>
                    <Route exact path="/CreateProduct" component={CreateProduct}/>
                    <Route exact path="/Register" component={Register} />       
                    <Route exact path="/Basket" component={Basket} /> 
                    <Route exact path="/DeleteUser" component={DeleteUser} /> 
                    <Route exact path="/Paypal/:id" component={Paypal} />  
                    <Route exact path="/Paypal2/:messageType/:payPalPaymentID" component={Paypal2} />  
                    <Route exact path="/" component={Display} />
                    <Route exact path="/Login" component={Login} />                
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <Route exact path="/Display" component={Display}/> 
                    <Route path="*" component={Display}/>    
                                           
                </Switch>
            </BrowserRouter>
        )
    }
}
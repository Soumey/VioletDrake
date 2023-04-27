import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import Header from "./Header"
import BottomBar from "./BottomBar"
import Categories from "./Categories"
import ProductTable from "./Table"


import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"

export default class Basket extends Component{
    render() 
    {
        
          
          
        return(
            <form>
            <div>
            
                <Header/>
                </div>
                <div className="categoryContainer">
                <Categories/>
                </div>
                <div>
                  <ProductTable/>
                </div>
         </form>   
        )
    
    }
}    
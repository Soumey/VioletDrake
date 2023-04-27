import React, {Component} from "react"
import { Link } from "react-router-dom"

export default class Categories extends Component{
    render() 
    
    {
        
    return (

        <table>
        <thead>
            <tr className="categoriesRow">
            <Link to={"/Category/Computers"}><th className="category" onClick={() => localStorage.category = "Computers"}>Computers</th></Link>
            <Link to={"/Category/Computer Parts"}><th className="category" onClick={() => localStorage.category = "Computer Parts"}>Computer Parts</th></Link>
            <Link to={"/Category/Gaming"}><th className="category" onClick={() => localStorage.category = "Gaming"}>Gaming</th></Link>
            <Link to={"/Category/Smartphones"}><th className="category" onClick={() => localStorage.category = "Smartphones"}>Smartphones</th></Link>
            <Link to={"/Category/AGD"}><th className="category" onClick={() => localStorage.category = "AGD"}>AGD</th></Link>
            <Link to={"/Category/RTV"}><th className="category" onClick={() => localStorage.category = "RTV"}>RTV</th></Link>
            <Link to={"/Category/Smarthome"}><th className="category" onClick={() => localStorage.category = "Smarthome"}>Smarthome</th></Link>
            <Link to={"/Category/Kids"}><th className="category" onClick={() => localStorage.category = "Kids"}>Kids</th></Link>
            <Link to={"/Category"}><th> </th></Link>
            </tr>
        </thead>
        </table>
            
    )
    }
}
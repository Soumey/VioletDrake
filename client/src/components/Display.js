import React, {Component} from "react"
import {Link} from "react-router-dom"
import { SliderData } from './SliderData';

import axios from "axios"

import Logout from "./Logout"
import Header from "./Header";
import Categories from "./Categories"
import BottomBar from "./BottomBar"
import Register from "./Register"
import DescriptionImageSlider from './DescriptionImageSlider';
import ImageSlider from './ImageSlider';
import MultiDescSlider from "./MultiDescSlider";

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"



export default class Display extends Component 
{
    render() 
    {  
      
        return (    
            <div className="form-container">
                <Header/>
                <div className="categoryContainer">
                <Categories/>
                </div>
                <div className="sliderContainer">
                <ImageSlider slides={SliderData} />
                </div>
                <div className="sliderContainer">
                    <DescriptionImageSlider slides={SliderData} />    
                </div>
                
                <div className="sliderContainer">
                <ImageSlider slides={SliderData} />
                </div>
               
                <div className="sliderContainer">
                <MultiDescSlider slides={SliderData} />
                </div>
                <div className="bottomBarContainer">
                <BottomBar/>
                </div>

            </div> 
            
        )
    }
}
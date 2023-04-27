import React, {Component} from "react"

import phone from "../images/phone.png"

export default class BottomBar extends Component{
    render()
    {
        return (
            <table className="bottomBarTable">
                <thead>
                    <tr>
                        <th>Questions? Call or text us</th>
                    </tr>
                    
                </thead>
                <tbody>
                    <tr>
                        <th><img src={phone} alt="phone"></img>123 123 123</th>
                    </tr>
                    <tr>
                        <th>You can find us on:</th>
                    </tr>
                    
                    <tr>
                        <th>Copyright by Arkadiusz Cieślak and Dawid Genderka</th>
                    </tr>
                </tbody>
            </table>
        )
    
}
}
import React ,{Component}from "react";
import {Link} from "react-router-dom";
import CharacterImage from '../Generate_an_ani_1-removebg-preview.png';

export default class Stylist extends Component{
    render(){
        return(
            <div className="Stylistinchief" style={{marginLeft:"1em",marginTop:"-38em", display:"flex"}}>
                <div className="unleashbox">
                    <p className="unleashbox-text">Unleash Your Wardrobe's Potential</p>
                </div>
                <Link to="/bot">
                    <img src={CharacterImage} style={{marginTop:"1em"}} alt="Character" />
                </Link>
                <div style={{marginTop:"-5em", marginLeft:"-18em"}}>
                    <div className="bubble">I am your Stylist in Chief, Let's talk!!</div>
                    <div className="pointer"></div>
                </div>
               
            </div>
                
           
            
        )
    }
}
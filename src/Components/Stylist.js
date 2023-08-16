import React ,{Component}from "react";
import {Link} from "react-router-dom";
import CharacterImage from '../Generate_an_ani_1-removebg-preview.png';

export default class Stylist extends Component{
    render(){
        return(
            <div className="Stylistinchief" style={{marginLeft:"8em"}}>
                <Link to="/bot">
                    <img src={CharacterImage} style={{marginTop:"8em"}} alt="Character" />
                </Link>
                <div style={{marginTop:"-40em", marginLeft:"-30em"}}>
                    <div className="bubble">I am your Stylist in Chief, Let's talk!!</div>
                    <div className="pointer"></div>
                </div>
               
            </div>
                
           
            
        )
    }
}
import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';

export default class CarouselComp extends Component{
    render(){
        return(
            <div className='carousel-comp' style={{display:"flex"}}>
                <div>
            <img style={{height: "40vh", width: "20vw" }}src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Elephant_Diversity.jpg" alt="Image 1" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img style={{height: "40vh", width: "20vw" }}src="https://upload.wikimedia.org/wikipedia/commons/1/19/Os-lahaina-town-fire.jpg" alt="Image 2" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img style={{height: "40vh", width: "20vw" }} src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Tyrannosaurus_Sue.jpg" alt="Image 3" />
            <p className="legend">Legend 3</p>
          </div>
            </div>
           
        )
    }
}
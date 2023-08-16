import React, { Component } from 'react';
import { outfits } from './Outfits'; // Make sure the path to your data is correct

export default class Carousel extends Component {
  render() {
    const rows = [];
    for (let i = 0; i < outfits.length; i += 3) {
      const rowOutfits = outfits.slice(i, i + 3);

      rows.push(
        <div className="row"  key={`row-${i}`}>
          {rowOutfits.map((outfit, index) => (
            <div className="card" style={{width:"14em",backgroundColor:"#100e17"}}key={`outfit-${i + index}`}>
              <a href={outfit.link}><img style={{width:"13em",height:"17.5em",display:"block"}}src={outfit.image} alt="clothes" /></a>
            </div>
          ))}
        </div>
      );
    }
    

    return <div className="container carousel">{rows}</div>;
  }
}

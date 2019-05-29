import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }


  renderAction() {
    if (!this.props.isRemoval) {
      return <button style = {{fontSize: '1.5rem'}} onClick = {this.addTrack}>+</button>;
    } else {
      return <button style = {{fontSize: '1.5rem'}} onClick = {this.removeTrack}>-</button>;
    }
  }
  
  addTrack(){
    return this.props.onAdd(this.props.track);
  }
  
  removeTrack(){
    return this.props.onRemove(this.props.track);
  }


  changeMsToSecond(){
    //60000 m.second = 1 minute 
    const sec = Math.floor(this.props.track.duration % 60000/1000); 
    if(sec>= 10){
      return sec;
    }
    else if(sec < 10) {
      return `0${sec}`; 
    }
  }

  render(){    
      return (
        <div className="Track">
            <div>
              <image src = {this.props.track.image} style = {{width: '80%', height:'100%'}}/> 
            </div>
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p> by <span style = {{fontWeight:'bold'}}>{this.props.track.artist}</span> | {this.props.track.album}</p>
            <p style={{fontSize: '0.8rem'}}>popularity: {this.props.track.popularity}  |   
            <span> Time {Math.floor(this.props.track.duration/60000)}:{this.changeMsToSecond()}</span></p>
            
          </div>
            {this.renderAction()} 
        </div>
      );
  }
};

export default Track;


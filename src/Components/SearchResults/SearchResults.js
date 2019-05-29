import React from 'react';
import './SearchResults.css';
import {TrackList}  from '../TrackList/TrackList';

class SearchResults extends React.Component {
   
    totalTracks(){
      const arrayLength = this.props.tracks.length
      if(this.props.tracks === undefined || arrayLength=== 0){
        return  <p style = {{color: "green", marginTop: '0.5rem', textAlign: 'center'}}>
          'No Results. Please, enter your search term!'</p>
      } else {
        return <p style = {{textAlign: 'right', marginTop: '1rem'}}> <span style = {{color: 'red'}}>{arrayLength}</span> track{arrayLength > 1?'s':''}</p>
      }
    }

    render(){
        return (
          <div className="SearchResults">
            <h2 className = 'style'>Search Results</h2>
             {this.totalTracks()}
            <TrackList isRemoval = {false} 
              onAdd = {this.props.onAdd} 
              tracks = {this.props.tracks}/>
          </div>
        );

    }
};

export default SearchResults;
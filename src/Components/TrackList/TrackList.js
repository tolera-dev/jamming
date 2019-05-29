import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


export const TrackList  = (props) => {
    return(
      <div className="TrackList">
          {props.tracks !== undefined?props.tracks.map(track => {
            return <Track key = {track.id}
                track = {track}
                isRemoval = {props.isRemoval} 
                onRemove = {props.onRemove} 
                onAdd = {props.onAdd} />
            }): ''}
      </div>
    );
};

import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';


class Playlist extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				inputValue: '',
				errMessageEmpty: '',
	      errMessageNotSet: ''
	    };

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleClick = this.handleClick.bind(this);
  }
  
	handleNameChange(e) {
		this.props.onUpdatePlaylistName(e.target.value);
		this.setState({
			inputValue: e.target.value
		});
	}

	//clear input on enter

	handleKeyPress(e) {
		if(e.key === 'Enter'){
			e.target.value = '';
			this.checkNameIsSet();
	    }
	}

	checkListEmpty() {
		if (this.props.tracks.length === 0 || !this.props.tracks) {
			this.setState({
				errMessageEmpty: 'Looks like your playlist is empty; please, add some tracks!'
	  		});
	  		return false;
		} else {
			this.setState({
				errMessageEmpty: ''
	  		});
			return true;
		}
	}


	checkNameIsSet() {
		if (this.props.playlistName === 'New Playlist') {
			this.setState({
				errMessageNotSet: 'Please, enter your playlist name !'
	  		});
	  		return false;
		} else {
			this.setState({
				errMessageNotSet: ''
	  		});
			return true;
		}
	}
 
//clear input on save

	handleClick(e) {
		let name = this.checkNameIsSet();
		let list = this.checkListEmpty();
		if (name && list) {
			this.props.onSave();
			this.setState({
				inputValue: ''
				});
		}
	}
  //render action for error warning while saving playlist to spotify account
	renderWarning(){
		if (this.state.errMessageEmpty !== '' && this.props.tracks.length === 0) {
			return <p className="warning">{this.state.errMessageEmpty}</p> 
		} else if(this.state.errMessageNotSet !== ''){
	    return <p className="warning">{this.state.errMessageNotSet}</p>;
		}
	}

	totalTracks(){
		if(this.props.tracks.length === 0){
			return 'Playlist is empty';
		}
		else if(this.props.tracks.length === 1){
			return <span>{this.props.tracks.length} track in your Playlist</span>
		} else {
			return <span>{this.props.tracks.length} tracks in your Playlist</span>
		}
	}


	render() {
		return (
			<div className="Playlist">
				<div>
					<input placeholder="Enter Playlist Name"
							onChange={this.handleNameChange}
							onKeyPress={this.handleKeyPress}
							value={this.state.inputValue}/>
						<a className="Playlist-save" onClick={this.handleClick} style = {{marginBottom: ''}}>Save to Spotify</a>	
				</div>
				<div className =' plist'>
				{this.props.playlistName}
				</div>
				{this.renderWarning()}
				<p style = {{margin:'0.5rem 0', fontSize: '1rem', color: 'green'}}>{this.totalTracks()}</p>
				<TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} isRemoval={true} />
			</div>
		);
	}
};

export default Playlist;


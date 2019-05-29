import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [], 
      playlistName: 'New Playlist',
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    //check if track is already in playlistTracks, if not -> add track to list and set new state
    let trackFind = this.state.playlistTracks.find(playlistsItem => playlistsItem.id === track.id )
    if (!trackFind) {
      let updatedPlaylistTracks = this.state.playlistTracks.concat(track)
     //remove added tracks from search results and get new search results array
      let updatedSearchResults = this.state.searchResults.filter(searchResultsItem => searchResultsItem.id !== track.id );
         
      this.setState({
        playlistTracks: updatedPlaylistTracks,
        searchResults: updatedSearchResults
      });
    } else {
      alert (`'${track.name}' is already in the playlist`);
    }
  }


  removeTrack(track) {
    //filter playlistTracks and return only those which do not have the id of the track parameter
    let updatedPlaylistTracks = this.state.playlistTracks.filter( playlistsItem => playlistsItem.id !== track.id );
    //confirmation for removal
    if(window.confirm(`do you want to remove  '${track.name}'`)){
      this.setState({
        playlistTracks: updatedPlaylistTracks
      });
    }
  
    }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }
  //generates an array of trackURIs from the playlistTracks property
  //and resets the state for playlistName and playlistTracks

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map( track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
       playlistTracks: [],
       playlistName: 'New Playlist'
    });
  }

  search(searchTerm) {
    if (searchTerm) {
      Spotify.search(searchTerm)
     .then(
        tracks => {
          this.setState({ searchResults: tracks});
        }
      );
    } 
  }

  render() {
    return (
      <div>
        <div className="Header-container">
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <SearchBar onSearch={this.search} />
        </div>
        <div className="App">
          <div className="App-playlist">
            <SearchResults tracks={this.state.searchResults} onAdd={this.addTrack}  />
            <Playlist playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onUpdatePlaylistName={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;

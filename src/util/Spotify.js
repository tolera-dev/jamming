const clientId = '56c202855f99406db737b2a42952706d';
const redirectUri = 'http://localhost:3000/';
//const redirectUri = 'http://chivalrous-weight.surge.sh/';
const scopes = 'user-modify-playback-state user-read-playback-state user-read-email streaming user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-read-currently-playing';
const authEndpoint = 'https://accounts.spotify.com/authorize';
let accessToken = '';


const Spotify = {
// get access_token
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} else {
			accessToken = window.location.href.match(/access_token=([^&]*)/);
			let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
			if(accessToken && expiresIn) {
			accessToken = accessToken[1];
			expiresIn = expiresIn[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('AccessToken', null, '/');
			return accessToken;
			} else {
			window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
		  }
	   }
	},
   
	async search(searchTerm) {
		accessToken = this.getAccessToken();
		try {
			const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			});
			if (response.ok) {
				const jsonResponse = await response.json();
				if (jsonResponse.tracks) {
					return jsonResponse.tracks.items.map(track => ({
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						image: track.album.images[0].url,
						popularity: track.popularity,
						duration: track.duration_ms,
						uri: track.uri
					}));
				}
			}
			else {
				throw new Error('Request failed!');
			}
		}
		catch (error) {
			console.log('Request failed', error);
		}
	},

		//get user ID
		
	async getUserId(accessToken, headers) {

		try {
			const response = await fetch('https://api.spotify.com/v1/me', {headers: headers});
			if (response.ok) {
				const jsonResponse = await response.json();
				if (jsonResponse) {
					return jsonResponse.id;
				}
			}
			else {
				throw new Error('Request failed!');
			}
		}
		catch (error) {
			console.log('Request failed', error);
		}
	},

	async getPLaylistId(userID, headers, playlistName) {

		try {
			const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
						headers,
						method: 'POST',
						body: JSON.stringify({name: playlistName})
			});
				if(response.ok){
			  const jsonResponse = await response.json();
			  return jsonResponse.id;
				}
				throw new Error('Request failed!');	
	 } catch (error) {
			console.log(error);
		}
	},


  savePlaylist(playlistName, uriArray) {

		if (!playlistName || uriArray.length === 0) {
			return;
		} else {
            accessToken = this.getAccessToken();
		const headers = { 'Authorization': `Bearer ${accessToken}` } ;

		//get current user's id

		let userID = this.getUserId(accessToken, headers);
        
		//POST new playlist with name and get its id
		//then POST the track uris with the user-id and playlist-id

		userID.then( uId => {
			let playlistID = this.getPLaylistId(uId, headers, playlistName);
			playlistID.then( async pId => {
			 try {
				const response = await fetch(`https://api.spotify.com/v1/users/${uId}/playlists/${pId}/tracks?uris=${uriArray.join(',')}`, {
						headers,
						method: 'POST'
				   });
					if(response.ok){
					const jsonResponse = await response.json();
					return jsonResponse;
				  }
				  throw new Error('Request failed!');
				} catch (error) {
				console.log(error);
				}
			})
		});
	  }
	}
};

export default Spotify;

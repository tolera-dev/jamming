import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

   handleSearch(event) {
    this.props.onSearch(this.state.searchTerm);
    //event.preventDefault();
   }

   handleTermChange(event){
      this.setState({searchTerm: event.target.value})
   }

	handleKeyPress(e) {
		if(e.key === 'Enter'){
			this.props.onSearch(this.state.searchTerm);
	    } 
	}

    render(){
        return (
          <div className="SearchBar">
            <input type = "search" placeholder="Enter A Song, Album, or Artist"
            onKeyPress={this.handleKeyPress}
            onChange = {this.handleTermChange} />
            <button className="SearchButton" onClick = {this.handleSearch}>Search</button>
          </div> 
        );
    }
};

export default SearchBar;
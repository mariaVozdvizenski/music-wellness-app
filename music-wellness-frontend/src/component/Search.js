import React from "react";
import "./Search.css";

class Search extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <input className="search-bar" onChange={this.props.onInputChange}></input>
        );
    }

}

export default Search
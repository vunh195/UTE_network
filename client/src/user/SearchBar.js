import React, { Component } from "react";
import "../css/Search.css";
import { findPeople, follow } from "./apiUser";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      filteredData: [],
      users: [],
      isSearched: true,
    };
  }
  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        this.setState({ users: data });
      }
    });
  }

  changedHandler = (event) => {
    const searchedWord = event.target.value;
    const result = this.state.users.filter((user) => {
      return user.name.includes(searchedWord);
    });
    console.log(result);
    this.setState({
      isSearched: true,
      filteredData: result,
    });
  };

  setIsSearched = () => {
    this.setState({ isSearched: false });
    console.log(this.state.isSearched);
  };

  render() {
    const { filteredData, isSearched, users } = this.state;
    return (
      <div className="searchContainer">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={this.changedHandler}
        ></input>

        {filteredData.length !== 0 && isSearched && (
          <>
            <div className="result">
              {filteredData.map((user, key) => {
                return (
                  <div key={key} className="dataItem">
                    <Link
                      to={`/user/${user._id}`}
                      className="a"
                      onClick={this.setIsSearched}
                    >
                      {user.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default SearchBar;

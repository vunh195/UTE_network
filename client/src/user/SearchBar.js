import React, { Component } from "react";
import "../css/Search.css";
import { findPeople } from "./apiUser";
import { isAuthenticated } from "../auth/index";
import { list } from "../post/apiPost";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      userfilteredData: [],
      postfilteredData: [],
      posts: [],
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
        this.setState({ users: data });
      }
    });
    list(0).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          posts: data,
        });
      }
    });
  }

  changedHandler = (event) => {
    const searchedWord = event.target.value;
    const result = this.state.users.filter((user) => {
      return user.name.toLowerCase().includes(searchedWord.toLowerCase());
    });
    const result2 = this.state.posts.filter((post) => {
      return post.title.toLowerCase().includes(searchedWord.toLowerCase());
    });
    console.log(result2);
    if (searchedWord === "") {
      this.setState({
        userfilteredData: [],
        postfilteredData: [],
      });
    } else {
      this.setState({
        isSearched: true,
        userfilteredData: result,
        postfilteredData: result2,
      });
    }
  };

  setIsSearched = () => {
    this.setState({ isSearched: false });
    console.log(this.state.isSearched);
  };

  render() {
    const { userfilteredData, postfilteredData, isSearched, users } =
      this.state;
    return (
      <div className="searchContainer">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={this.changedHandler}
        ></input>

        {(userfilteredData.length !== 0 || postfilteredData.length !== 0) &&
          isSearched && (
            <>
              <div className="result">
                {userfilteredData.map((user, key) => {
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
                {postfilteredData.map((post, key) => {
                  return (
                    <div key={key} className="dataItem">
                      <Link
                        to={`/post/${post._id}`}
                        className="a"
                        onClick={this.setIsSearched}
                      >
                        {post.title}
                      </Link>{" "}
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

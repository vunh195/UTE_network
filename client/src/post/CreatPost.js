import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import NewPost from "./NewPost";
class CreatePost extends Component {
  render() {
    return (
      <div
        className="CreatePostContainer"
        style={{
          width: "70%",
          height: "900px",
          margin: "auto",
          padding: "80px",
        }}
      >
        {isAuthenticated() && <NewPost />}
      </div>
    );
  }
}

export default CreatePost;

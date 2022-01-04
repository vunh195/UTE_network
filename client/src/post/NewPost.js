import React, { Component } from "react";

import { create } from "./apiPost";
import { isAuthenticated } from "../auth";
import Loading from "../loading/Loading";
import { Redirect } from "react-router-dom";
import "../css/NewPost.css";
import DefaultProfile from "../images/avatar.jpg";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize, photo } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 1 MB",
        loading: false,
      });
      return false;
    }
    if (photo.length === 0) {
      this.setState({ error: "Photo is required", loading: false });
      return false;
    }
    if (title.length === 0) {
      this.setState({ error: "Title is required", loading: false });
      return false;
    }
    if (body.length === 0) {
      this.setState({ error: "Body is required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    const fileSize = e.target.name === "photo" ? e.target.files[0].size : 0;
    //Form Data method set
    this.postData.set(e.target.name, value);
    this.setState({
      error: "",
      [e.target.name]: value,
      fileSize,
    });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      create(userId, token, this.postData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          this.setState({
            title: "",
            body: "",
            photo: "",
            loading: false,
            redirectToProfile: true,
          });
          //console.log("NEW POST ",data);
        }
      });
    }
  };
  PostFrom = (user) => {
    return (
      <div className="PostFromContainer">
        {/* <img src={user.}></img> */}
        <p>{user.name}</p>
      </div>
    );
  };

  newPostForm = (title, body, user, photoUrl) => (
    <form className="FormContainer">
      <div className="title">
        <img
          //   style={{ border: "solid 1px" }}
          height="50"
          width="60"
          src={photoUrl}
          alt={user.name}
          onError={(i) => (i.target.src = DefaultProfile)}
          className="avatar img-circle"
        />
        {/* <span
          className="titleText"
          style={{
            marginRight: "20px",
            marginLeft: "10px",
            position: "relative",
            top: "+15px",
          }}
        >
          {user.name}
        </span> */}
        <input
          onChange={this.handleChange}
          name="title"
          type="text"
          //   className="form-control"
          value={title}
          className="input inputTitle"
          placeholder={"Say something....." + user.name}
        />
      </div>
      <div className="body">
        {/* <label className="text-muted">Body</label> */}
        <textarea
          style={{ resize: "none" }}
          onChange={this.handleChange}
          type="text"
          name="body"
          //   className="form-control"
          value={body}
          className="input inputBody"
          placeholder="Type content here..."
        />
      </div>
      <div className="image">
        <label htmlFor="photoInput" className="optionImage">
          <i class="far fa-image"></i>

          <span style={{ marginLeft: "10px" }}>Photo</span>
          <input
            onChange={this.handleChange}
            id="photoInput"
            name="photo"
            type="file"
            accept="image/*"
            className="importImage"
            style={{ display: "none" }}
          />
        </label>
        <button onClick={this.clickSubmit} className="submit">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      {/* </div> */}
    </form>
  );

  render() {
    const { title, body, user, loading, error, redirectToProfile } = this.state;
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`}></Redirect>;
    }

    return (
      <div
        className="containerNewPost"
        // style={{ marginbottom: "20", height: "800px" }}
      >
        {/* <h2 className="mt-5 mb-5">Create a new post</h2> */}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {/* {loading ? <Loading /> : this.PostFrom(user)} */}

        {loading ? <Loading /> : this.newPostForm(title, body, user, photoUrl)}
      </div>
    );
  }
}

export default NewPost;

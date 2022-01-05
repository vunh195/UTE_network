import React, { useState, Component } from "react";
import "../css/Home.css";
import Posts from "../post/Posts";
import { list } from "../post/apiPost";
import { listAllUsers } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import Ranking from "../user/Ranking";
import NewPost from "../post/NewPost";
function RankItem(id, likes, name) {
  this.id = id;
  this.likes = likes;
  this.name = name;
}
class Home extends Component {
  constructor() {
    super();
    this.createRank = this.createRank.bind(this);
    this.state = {
      users: [],
      posts: [],
      rankList: [],
      skip: 0,
      isLoaded: true,
    };
  }

  async componentDidMount() {
    const allPosts = await list(this.state.skip);
    if (allPosts?.error) {
      console.log(allPosts.error);
    } else {
      console.log("list posts in home :", allPosts);
      this.setState({
        posts: allPosts,
      });
    }

    const allUsers = await listAllUsers();
    if (allUsers?.error) {
      console.log(allUsers.error);
    } else {
      console.log("list users in home :", allUsers);
      this.setState({
        users: allUsers,
      });
    }
    this.createRank();
  }

  createRank = () => {
    var Lst = [];
    const { users, posts } = this.state;
    for (let i = 0; i < users.length; i++) {
      const userId = users[i]._id;
      const name = users[i].name;
      var totallikes = 0;
      for (let j = 0; j < this.state.posts.length; j++) {
        if (userId === posts[j].postedBy._id) {
          totallikes += posts[j].likes.length;
        }
      }
      const rankitem = new RankItem(userId, totallikes, name);
      Lst.push(rankitem);
    }
    Lst.sort((a, b) => -a.likes + b.likes);
    this.setState({
      rankList: Lst,
    });

    console.log("list item rank ", this.state.rankList);
  };

  render() {
    const { isLoaded, users, posts, rankList } = this.state;

    return (
      <div className="HomeContainer">
        <div className="LeftContainer">
          <div className="ranklist">
            <Ranking ranks={rankList} />
          </div>
          <div className="postlist">
            {isAuthenticated() && (
              <div className="newPostContainer">
                <NewPost />
              </div>
            )}
            <Posts />
          </div>
        </div>

        <footer
          className="page-footer font-small"
          style={{ background: "#3E4551", position: "sticky", bottom: "0" }}
        >
          <div className="container">
            <p
              className="text-center"
              style={{
                color: "#fff",
                fontSize: "medium",

                padding: "10px",
              }}
            >
              From HCMUTE with love{" "}
              <i
                className="fas fa-heart"
                style={{ color: "red", fontSize: "24px" }}
              ></i>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;

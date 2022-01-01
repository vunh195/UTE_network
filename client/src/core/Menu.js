import { color } from "@mui/system";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import SearchBar from "../user/SearchBar";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { borderBottom: "4px solid #ff9900", color: "#3E4551" };
  } else {
    return { color: "#3E4551" };
  }
};

const Menu = (props) => (
  <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{
      background: "#ffff",
      paddingTop: "15px",
      paddingBottom: "0",
      marginBottom: "50px",
      position: "sticky",
      top: "0",
      backgroundColor: "rgb(27, 145, 223)",
    }}
  >
    <div className="navbar-brand">
      <img
        src="https://youth.hcmute.edu.vn/assets/img/logo/logo_UTE_HSV_DTN.svg"
        alt=""
      ></img>
      <a
        style={{
          color: "#3E4551",
          fontFamily: "Candara",
          fontWeight: "bold",
          marginLeft: 10,
          color: "white",
        }}
        href="/"
      >
        myHCMUTE
      </a>
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div
      className="searchContainer"
      style={{
        position: "relative",
        left: "300px",
        width: "330px",
        height: "35px",
      }}
    >
      <SearchBar />
    </div>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link
            className="nav-link"
            style={isActive(props.history, "/")}
            to="/"
            style={{ color: "white" }}
          >
            <i className="fas fa-home mr-1"></i>
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            {/* <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, "/users")} to='/users' >
                        <i className="fas fa-users mr-1"></i>Users
                        </Link>
                    </li> */}
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signin")}
                to="/signin"
                style={{ color: "white" }}
              >
                <i className="fas fa-sign-in-alt mr-1"></i>Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signup")}
                to="/signup"
                style={{ color: "white" }}
              >
                <i className="fas fa-user-plus mr-1"></i>Sign Up
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/findpeople"}
                style={isActive(props.history, "/findpeople")}
                style={{ color: "white" }}
              >
                <i className="fas fa-users mr-1"></i>Find People
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/post/create"}
                style={isActive(props.history, "/post/create")}
                style={{ color: "white" }}
              >
                <i className="fas fa-plus mr-1"></i>Create Post
              </Link>
            </li>
            <div className="dropdown">
              <button
                style={{ color: "#3E4551", color: "white" }}
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user-cog mr-1"></i>
                {`${isAuthenticated().user.name}'s profile`}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  className="dropdown-item"
                  to={`/user/${isAuthenticated().user._id}`}
                >
                  <i className="fas fa-user mr-1"></i>Your Profile
                </Link>
                <Link
                  className="dropdown-item"
                  to={`/chats/${isAuthenticated().user._id}`}
                >
                  <i className="fas fa-comment-alt mr-1"></i>Chats
                </Link>
                <span
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => props.history.push("/"))}
                >
                  <i className="fas fa-sign-out-alt mr-1"></i>Sign Out
                </span>
              </div>
            </div>
            {/* <li className="nav-item">
                        <Link
                            className="nav-link"
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(props.history, `/user/${isAuthenticated().user._id}`)}
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={
                                (isActive(props.history, "/signup"),
                                { cursor: "pointer",color: "#fff" })
                            }
                            onClick={() => signout(() => props.history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li> */}
          </>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);

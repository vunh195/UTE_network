import React, { Component } from 'react';
import { follow, unfollow } from './apiUser';
import "../css/FollowProfileButton.css";

class FollowProfileButton extends Component{

    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    render(){
        return(
            <>
                { !this.props.following ? 
                    (
                        <button onClick={this.followClick} className="follow-button btn-sm btn-not-follow">
                            <i class="fas fa-user-plus"></i>
                        </button>
                    ) : (
                        <button onClick={this.unfollowClick} className="follow-button btn-sm btn-followed">
                            <i class="fas fa-user-check"></i>
                        </button>
                    )
                } 
            </>
        );
    }
}

export default FollowProfileButton;
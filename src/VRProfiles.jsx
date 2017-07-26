import React from 'react';
import Profile from './VRProfile.jsx';

class VRProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliceIndex: 5,
      friends: this.props.friends,
      friendsToShow: this.props.friends.slice(0, 5)
    };
    this.onMoreFriendsClick = this.onMoreFriendsClick.bind(this);
  }

  onMoreFriendsClick() {
    if (this.state.sliceIndex > this.state.friends.length) {
      this.setState({
        friendsToShow: this.props.friends.slice(0, 5),
        sliceIndex: 5
      });
    } else {
      this.setState({
        friendsToShow: this.state.friends.slice(this.state.sliceIndex, this.state.sliceIndex + 5),
        sliceIndex: this.state.sliceIndex + 5
      });
    }
  }

  render() {
    let n = this.state.friendsToShow.length;
    let start = (n) * Math.PI / 12;
    let theta = (Math.PI - start) / 2;
    let x, z, yRotation;
    let radius = 10;
    let y = -4;

    return (

      <a-entity>
        <a-box
          geometry="width: 2; height: 2; depth: 0.15"
          material="color: white; opacity: 0.5"
          position={`${(-Math.cos(theta) * radius)} ${y} ${(-Math.sin(theta) * radius)}`}
          rotation={`${(-Math.atan(Math.abs(y) / radius) * 180 / Math.PI)} ${((Math.PI / 2) - theta) * 180 / Math.PI} 0`}
          onClick={this.onMoreFriendsClick}
        />
        <a-text
          value='show\nmore\nfriends'
          align='center'
          material='color: white'
          width='10'
          position={`${-Math.cos(theta) * radius} ${y} ${.1 - Math.sin(theta) * radius}`}
          rotation={`${-Math.atan(Math.abs(y) / radius) * 180 / Math.PI} ${((Math.PI / 2) - theta) * 180 / Math.PI} 0`}
        />
        {
          this.state.friendsToShow.map((friend, i) => {
            theta += (Math.PI / 12);
            x = -Math.cos(theta) * radius;
            z = -Math.sin(theta) * radius;
            let xRotation = -Math.atan(Math.abs(y) / radius) * 180 / Math.PI;
            yRotation = ((Math.PI / 2) - theta) * 180 / Math.PI;
            // console.log('LINE 69 OF VRPROFILES, this means all the calculations ran through successfully');
            return (
              <Profile
                i={i}
                x={x}
                y={y}
                z={z}
                key={i}
                xRotation={xRotation}
                yRotation={yRotation}
                radius={radius}
                friend={friend}
                currentStory={this.props.currentStory}
                onFriendClick={this.props.onFriendClick}
                currentStoriesDuration={this.props.currentStoriesDuration}
              />
            );
          })
        }
      </a-entity>
    );
  }
}

export default VRProfiles;

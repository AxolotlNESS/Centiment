import React, { Component } from 'react';

// here is our feed component
class Feed extends Component {
  render() {
    const feedItems = [];
    // populate our feeditmes array with FeedItem components, passing down
    // attributes originally from the state
    for (let item in this.props.feedItems) {
      feedItems.push(<FeedItem attributes={this.props.feedItems[item]} />);
    }
    // we reverse order here so that items go from most recent to least
    return <div id='theFeed'>{feedItems.reverse()}</div>;
  }
}

// feed item components
// we decided to make this show everything expect points, decided that 
// that aspect could be anonomous
class FeedItem extends Component {
  render() {
    return (
      <div id='feedItem'>
        <h3>{this.props.attributes.sender}</h3>
        <div>
          <p id='shoutoutText'>
            {this.props.attributes.messages} to{' '}
            {this.props.attributes.recipient}
          </p>
        </div>
      </div>
    );
  }
}

export default Feed;

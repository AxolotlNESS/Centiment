import React, { Component } from "react";

class Feed extends Component {
  render() {
    const feedItems = [];
    for (let item in this.props.feedItems) {
      feedItems.push(<FeedItem attributes={this.props.feedItems[item]} />);
    }
    return (
      <div>
        {feedItems}
      </div>
    )
  }
}

class FeedItem extends Component {
  render() {
    // sender text reciepient
    return (
      <div>
        <h3>{this.props.attributes.sender}</h3>
        <div>
          <p>
            {this.props.attributes.messages} to {this.props.attributes.recipient}
          </p>
        </div>
      </div>
    );
  }
}

export default Feed;

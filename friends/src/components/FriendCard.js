import React from "react";

function FriendCard(props) {
  return (
    <div className="friend-card">
      <h1>{props.friend.name}</h1>
      <ul>
        <li>{props.friend.age}</li>
        <li>{props.friend.email}</li>
      </ul>
    </div>
  );
}

export default FriendCard;

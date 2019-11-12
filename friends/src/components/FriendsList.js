import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendCard from "./FriendCard";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    id: Date.now(),
    name: "",
    age: 0,
    email: ""
  });

  const axiosWithAuth = () => {
    return axios.create({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  };
  const changeHandler = e => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const addNewFriend = friend => {
    const authAxios = axiosWithAuth();
    return authAxios
      .post("http://localhost:5000/api/friends", friend)
      .then(response => {
        setFriends(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  const submitEntry = e => {
    e.preventDefault();
    addNewFriend(newFriend);
  };

  useEffect(() => {
    const authAxios = axiosWithAuth();
    authAxios.get("http://localhost:5000/api/friends").then(response => {
      console.log(response);
      setFriends(response.data);
    });
  }, []);

  return (
    <>
      <div className="friend-entry">
        <form>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            onChange={changeHandler}
            value={newFriend.name}
          />

          <label htmlFor="age">Age</label>
          <input
            name="age"
            id="age"
            type="text"
            onChange={changeHandler}
            value={newFriend.age}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            onChange={changeHandler}
            value={newFriend.email}
          />

          <button type="submit" onClick={e => submitEntry(e)}>
            Submit
          </button>
        </form>
      </div>
      <div className="friendCard">
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </div>
    </>
  );
}

export default FriendsList;

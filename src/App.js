import Getstarted from "./components/Getstarted";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Write from "./components/Write";
import Allposts from "./components/Allposts";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { getData } from "./Auth/control.js";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [postshow, setPostshow] = useState(false);

  useEffect(() => {
    getDatas();
    return () => {};
  }, []);

  async function getDatas() {
    let allData = await getData();

    let postData = allData.filter((e) => {
      return e.email == localStorage.getItem("id");
    })[0].posts;

    let arr = postData.map((e) => {
      return JSON.stringify(e);
    });
    localStorage.setItem("posts", JSON.stringify(arr));
    console.log("item is set", postData);
    setPostshow(true);

    postData.map((e, i) => {
      console.log(e.title, e.descrip, e.Date);
    });
  }

  let post = [];
  let search = "";

  localStorage.getItem("posts") == null
    ? (post = [])
    : (post = JSON.parse(localStorage.getItem("posts")));

  function del(h, m) {
    let hr = "";
    let min = "";

    for (let i = 0; i < post.length; ) {
      hr = JSON.parse(post[i]).title;
      min = JSON.parse(post[i]).descrip;

      if (hr === h && min === m) {
        post.splice(i, 1);

        localStorage.setItem("posts", JSON.stringify(post));
      } else {
        ++i;
      }
    }
  }

  function value() {
    setRefresh(!refresh);
    console.log(" so how is the search 😁");
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Getstarted />
          </Route>
          <Route exact path="/home">
            <Navbar del={del} post={post} value={value} />
            <Write post={post} del={del} />
          </Route>

          <Route exact path="/posts">
            <Navbar del={del} post={post} value={value} />
            <Allposts post={post} del={del} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

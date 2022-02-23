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
  const [post, setPost] = useState([]);

  useEffect(() => {
    getDatas();
    return () => {};
  }, []);

  async function getDatas() {
    let allData = await getData(); // getData() has already setItem into local storage
    console.log(allData);

    setPost(JSON.parse(localStorage.getItem("posts")));
    // console.log("item is set", postData);
    setPostshow(true);

  }

  // let post = []

  let search = "";

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
            <Navbar post={post} value={value} />
            <Write post={post} />
          </Route>

          <Route exact path="/posts">
            <Navbar post={post} value={value} />
            <Allposts post={post}  />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

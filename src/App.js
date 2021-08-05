import Getstarted from "./Getstarted";
import React from "react";
import Navbar from "./Navbar";
import Write from "./Write";
import Allposts from "./Allposts";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let post = [];
  let valid= true;

  localStorage.getItem("posts") == null
    ? (post = [])
    : (post = JSON.parse(localStorage.getItem("posts")));

  function del(h, m) {
    let hr = 0;
    let min = 0;

    for (let i = 0; i < post.length; ) {
      hr = JSON.parse(post[i]).title;
      min = JSON.parse(post[i]).descrip;

      if (hr === h && min === m) {
        post.splice(i, 1);

        localStorage.clear();
        localStorage.setItem("posts", JSON.stringify(post));
      } else {
        ++i;
      }
    }
  }
  return (
    <>
      <Router>
        <Navbar valid={valid}/>
        <Switch>
          <Route exact path="/">
            <Getstarted />
          </Route>
          <Route exact path="/home">
            <Write post={post} del={del} valid={valid} />
          </Route>

          <Route exact path="/posts">
            <Allposts post={post} del={del} valid={valid} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

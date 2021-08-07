import Getstarted from "./Getstarted";
import React,{useState} from "react";
import Navbar from "./Navbar";
import Write from "./Write";
import Allposts from "./Allposts";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let post = [];
  let search ="";
  const [refresh, setRefresh] = useState(false);

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

        localStorage.clear();
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
            <Navbar del={del}  post={post} value={value}/>
            <Write post={post} del={del}  />
            
          </Route>

          <Route exact path="/posts">
             <Navbar del={del}  post={post} value={value} />
            <Allposts post={post} del={del} />
           
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

import Getstarted from "./components/Getstarted";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Write from "./components/Write";
import Allposts from "./components/Allposts";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./fire";
import { getData } from "./Auth/control.js";



      

function App() {

  const [postshow, setPostshow] = useState(false)

  useEffect(async () => {
   
    return () => {
      // cleanup
    }
  }, [])

   async function getDatas() {

    let allData = await getData()
  
    let postData = allData.filter(e=>{
       return e.email == localStorage.getItem("id")
    })[0].posts

    let arr= postData.map(e=>{
      return JSON.stringify(e)
    })
    localStorage.setItem("posts", JSON.stringify(arr));
          console.log("item is set" , postData);
          setPostshow(true)

   postData.map((e,i)=>{
     console.log(e.title, e.descrip, e.Date);
     
   })

    // let arr = [];
    // const querySnapshot =   getDocs(collection(db, localStorage.getItem("id")));
    // console.log(querySnapshot,"query snapshots")
    // querySnapshot.then((res) => {
    //   let i=0
    //   let m=0
    //   res.docs.forEach((data) => {
    //     let docum = data.id;
    //     console.log(data.id);
  
    //     const docRef = doc(db, localStorage.getItem("id"), docum); // for specified id
  
    //     getDoc(docRef).then((res) => {
    //       m++
    //       arr.unshift(JSON.stringify(res.data()));
    //       console.log(res.data());
    //       if(i==m){
    //       localStorage.setItem("posts", JSON.stringify(arr));
    //       console.log("item is set from firebase", arr);
    //       setPostshow(true)
    //     }
    //     });
    //     i++
    //   });  
      
    // });
  }
  
  try {
    getDatas()
  } catch (error) {
    console.log(error);
    
  }


  let post = [];
  let search = "";
  const [refresh, setRefresh] = useState(false);

  localStorage.getItem("posts") == null
    ? (post = [])
    : (post = JSON.parse(localStorage.getItem("posts")));

  function del(h, m) {
    deleteDoc(doc(db, localStorage.getItem("id"), h));
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

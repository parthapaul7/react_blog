import React, { useState } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import Posts from "./Posts";

export default function Navbar({ post, value }) {
  const [sea, setsea] = useState("");
  const [searc, setsearc] = useState([]);
  const [active, setactive] = useState('active')
  let count = 0;

  let searches = [];

  function wipe() {
    localStorage.clear()
    localStorage.setItem("config", "/");
    window.location.reload();
  }

  function onSearch() {
    if (sea == "") return;
    let hr = "";
    let min = "";
    let dat = "";

    for (let i = 0; i < post.length; i++) {
      hr = JSON.parse(post[i]).title.toLowerCase();
      min = JSON.parse(post[i]).descrip.toLowerCase();
      dat = JSON.parse(post[i]).date.toLowerCase();

      if (hr.includes(sea.toLowerCase()) || min.includes(sea.toLowerCase())) {
        searches.push(post[i]);

        console.log("yes we found it");
        console.log(searches);
      }
    }

    setsearc(searches);
  }

  function navLink(){
    let boxes= document.getElementsByTagName('a')
    
    for(let i=0;i<boxes.length;i++){
      boxes[i].className="nav-link"
      
    }
  }
  return (
    <div>
      <Redirect to={localStorage.getItem("config")} />

      {searc.map((element) => {
        count++;
        return (
          <>
            <Posts element={element} count={count} value={value} />
          </>
        );
      })}
      <h3> Search Results </h3>
      <hr />
      <nav
        className="navbar navbar-expand-lg  navbar-dark bg-dark "
        id="navBar"
      >
        <div className="container-fluid">
          <div className="navbar-brand">
            Post your Thoughts
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto d-flex">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                  onClick={(e)=>{navLink(); e.target.className="nav-link active"}

                  }
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts" onClick={(e)=>{navLink() ; e.target.className="nav-link active"}}>
                  All Posts
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link"  >
              {localStorage.getItem('id')}
              </div>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger mr-auto p-2"
                  onClick={() => {
                    wipe();
                  }}
                >
                  {" "}
                  Log Out
                </button>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setsea(e.target.value);
                }}
              />
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  onSearch();
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

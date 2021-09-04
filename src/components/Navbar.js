import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Posts from "./Posts";

export default function Navbar({ post, del, value }) {
  const [sea, setsea] = useState("");
  const [searc, setsearc] = useState([]);

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

  return (
    <div>
      <Redirect to={localStorage.getItem("config")} />

      {searc.map((element) => {
        count++;
        return (
          <>
            <Posts element={element} del={del} count={count} value={value} />
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/posts">
                  All Posts
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger"
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
                className="btn btn-outline-success"
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

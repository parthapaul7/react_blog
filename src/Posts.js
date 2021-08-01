import React, { useState, useEffect } from "react";

export default function Posts({ element }) {
  console.log(element);

  return (
    <div className="container my-3">
      <div class="card">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <h5 class="card-title">{JSON.parse(element).title}</h5>
          <p class="card-text">{JSON.parse(element).descrip}</p>
          <button type="button" class="btn btn-danger">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}

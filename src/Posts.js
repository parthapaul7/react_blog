import React from "react";

export default function Posts({ element, del, value, count }) {



  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header">
          <p>SL no. {count}</p> <p> Posted at --- {JSON.parse(element).date}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">{JSON.parse(element).title}</h5>
          <p className="card-text">{JSON.parse(element).descrip}</p>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Delete Post
          </button>

          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle"></h5>
                </div>
                <div className="modal-body">
            
                  Your post Will be deleted Permanently
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => {
                      del(
                        JSON.parse(element).title,
                        JSON.parse(element).descrip
                      );
                      value();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

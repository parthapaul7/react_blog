import React,{useState} from "react";
import { Button,Modal } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc 
} from "firebase/firestore";
import { db } from "../fire";

function getDatas(){

  const querySnapshot = getDocs(collection(db, "titles"));
  
  querySnapshot.then((res) => {
    console.log(res.docs);
    res.docs.forEach((data) => {
      let docum= data.id
      console.log(data.id);
  
      const docRef = doc(db, "titles", docum);  // for specified id
  
      getDoc(docRef).then((res) => {
        console.log(res.data());
      });
    });
  });
  }

export default function Posts({ element, del, value, count }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const  [tit, settit] = useState("default");
  const [desc, setdesc] = useState("default")
  function pass(a,b){
    settit(a);
    setdesc(b);

  console.log(tit,desc);
  

  }



  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header">
          <p>SL no.  {count}</p> <p> Posted at --- {JSON.parse(element).date}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">{JSON.parse(element).title}</h5>
          <pre className="card-text">{JSON.parse(element).descrip}</pre>
          

          <Button variant="danger" onClick={()=>{handleShow();pass(JSON.parse(element).title,JSON.parse(element).descrip)}}>
        Delete Post
      </Button>

      <Modal show={show} onHide={handleClose}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Body>Your Post : "{tit}" will be permanently deleted</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{handleClose(); del(tit,desc);value()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  );
}

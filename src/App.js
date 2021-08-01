
// import './App.css';
import Navbar from './Navbar';
import Write from './Write';
import Blogs from './Blogs';

function App() {

  let post = [];

  localStorage.getItem("posts") == null ? post=[]: post =JSON.parse(localStorage.getItem("posts"));

  return (
   <>
    <Navbar/>
    <Write/>
    <Blogs post={post}/>
   </>
   
  );
}

export default App;

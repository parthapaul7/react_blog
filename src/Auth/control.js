import axios from "axios";
import md5 from "md5";
import qs from "qs"
const apiKey = "https://warm-shore-07971.herokuapp.com/data";
async function getData() {
  const datas = await axios.get(apiKey);
  return datas.data;
}

async function login(email, password) {
  let users = await getData();
  let [id, posts] = [];


  for(let i=0; i<users.length; i++)
  {
    if (users[i].email == email && users[i].password == md5(password)) {
      [id, posts] = [email, users[i].posts];

      break;
      
    }
    else {
      id = false;
      
    }
  }

  return { id: id, posts: posts };
}

async function newUser(email, password) {

    let data= {
        email: email,
        password: password,
      }
  const newUser = await axios.post(
   apiKey, qs.stringify(data)
  );
  console.log("new user added");
}


async function postData(id, title, descrip){
  let data={ email: id, title: title, descrip: descrip}

  const post = await axios.put(apiKey, qs.stringify(data))

  console.log("data posted",post);
  

}

async function delPost( postId){
  
  
  let data ={ email: localStorage.getItem("id"), id: postId}
  console.log(qs.stringify(data));
  const del = await axios.put(apiKey, qs.stringify(data) )
  console.log(del," this si delpost function");
  

}

export { getData, login, newUser , postData, delPost};

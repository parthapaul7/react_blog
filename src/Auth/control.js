import axios from "axios";
import md5 from "md5";
import qs from "qs";
const apiKey = process.env.React_App_apiKey;

async function getUsers() {
  const users = await axios.get(apiKey);

  return users.data;
}

async function getData() {
  const datas = await axios.get(apiKey);

  let postData = datas.data.filter((e) => {
    return e.email == localStorage.getItem("id");
  })[0].posts;

  let arr = postData.map((e) => {
    return JSON.stringify(e);
  });
  localStorage.setItem("posts", JSON.stringify(arr));

  return arr;
}

async function login(email, password) {
  let users = await getUsers();
  let [id, posts] = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == md5(password)) {
      [id, posts] = [email, users[i].posts];

      break;
    } else {
      id = false;
    }
  }

  return { id: id, posts: posts };
}

async function newUser(name, email, password) {
  let data = {
    name: name,
    email: email,
    password: password,
  };
  const newUser = await axios.post(apiKey, qs.stringify(data));
  console.log("new user added");
}

async function postData(id, title, descrip) {
  let data = { email: id, title: title, descrip: descrip };

  const post = await axios.put(apiKey, qs.stringify(data));

  console.log("data posted", post);
}

async function delPost(postId) {
  let data = { email: localStorage.getItem("id"), id: postId };
  console.log(qs.stringify(data));
  const del = await axios.put(apiKey, qs.stringify(data));
  console.log(del, " this si delpost function");
}

export { getData, login, newUser, postData, delPost };

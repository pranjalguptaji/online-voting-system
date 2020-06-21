// const userAction = async () => {
//     const response = await fetch('./script.js');
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     console.log(myJson);
//   }

// userAction();

const fetch = require("node-fetch");

fetch('.D:/Pranjal/qpzm/assignment/website/online-blog-voting-system/src/app/services')
  .then(response => {
      return response.json();
  })
  .then(users => {
      console.log(users);
  })
// import express from 'express'
// const app = express()
// import { mainRoute } from "./router/route";
// import connection from "./db/connection";
// connection();


// // ===================  import helmet for web secruity points  =======================
// import helmet from "helmet";
// import cors from "cors";

// app.use(express.json());
// app.use("/", mainRoute);

// // ============================  web security =============================


// app.use(
//   cors({
//     origin: "http://localhost:1000/",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
//   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     hsts: {
//       maxAge: 31536000, // 1 year in seconds
//       includeSubDomains: true,
//       preload: true,
//     },
//     frameguard: {
//       action: "deny",
//     },
//     referrerPolicy: { policy: "same-origin" },
//   })
// );

// app.listen(1000, () => {
//   console.log("server is running on 1000 port");
// });




// const arr = [['ravi'],['amit'],['subham'],['manish']];
// const nearrrv = [['chuitya'],['gandu'],['bkl'],['fffffff'],['atulchutya'],['eeeeeeeeeter']]

// const new_arr = []
// for(let i=0;i<arr.length; i++){
  
// for(let j=0;j<i;j++){
  
//   new_arr.push(arr[i][j])
// }
// }

// console.log(new_arr)




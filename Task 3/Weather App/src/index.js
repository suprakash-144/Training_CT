import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import axios from "axios";
// import { useEffect, useState } from "react";

// const useFetch = (search) => {
//   const [data, setdata] = useState([]);

//   const [loading, setloading] = useState(true);
//   const options = {
//     method: "GET",
//     url: "https://yahoo-weather5.p.rapidapi.com/weather",
//     params: {
//       location: search,
//       format: "json",
//       u: "c",
//     },
//     headers: {
//       "x-rapidapi-key": "617261895emshef1de6afde9dfdap1edc84jsn4687cec47764",
//       "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
//     },
//   };

//   const fetchData = async () => {
//     try {
//       setloading(true);
//       const res = await axios.request(options);
//       setdata(res.data);
//       setloading(false);
//     } catch (error) {
//       console.log(error);
//       alert(error);
//     } finally {
//       setloading(false);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     fetchData();
//   };
//   return { data, refetch, loading };
// };

// export default useFetch;

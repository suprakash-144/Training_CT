import React from "react";
import { useState } from "react";
import Form from "../components/Form";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
const Home = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="">
      <Nav setshow={setshow} />
      {show ? <Form setshow={setshow} /> : <></>}
      <Banner setshow={setshow} />
    </div>
  );
};

export default Home;

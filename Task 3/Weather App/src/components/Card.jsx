import React, { useState } from "react";
import { iconlist } from "../data/iconlist";
import axios from "axios";

const Card = ({ data }) => {
  const d = new Date();
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [url, seturl] = useState();
  const iconselector = (code) => {
    let urls = "https://openweathermap.org/img/wn/02d.png";
    iconlist.forEach((item) => {
      if (item.code === code) {
        urls = item.url;
      }
    });
    return <img src={urls} alt="icon" />;
  };
  const getimageurl = (city) => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?query=${city}&client_id=NYSQt0exSlXYtIxbMAhLx-_O1ANymZF0quXomiTQn6Y`
      )
      .then((data) => {
        seturl(data.data.results[0].urls.small);
      });
    return <img src={url} alt="icon" className="cityimg" />;
  };
  return (
    <div className="row">
      <div className="col-12 ">
        <div className="d-flex flex-column justify-content-center gap-2">
          <div className="d-flex flex-column border-bottom py-3">
            <div className="text-center">
              <img src="/images/image.png" alt="icon" className="mainimg" />
            </div>
            <div className="temp fs-1">
              {data.current_observation.condition.temperature} &deg;c
            </div>
            <div className="loc">
              {day[d.getDay()]},{" "}
              <span className="title">{Date().split(" ")[4].slice(0, 5)}</span>
            </div>
          </div>
          <div className="summary">
            {iconselector(data.current_observation.condition.code)}
            {data.current_observation.condition.text}
          </div>
          <div className="position-relative">
            <div className=" fs-1 centered">{data.location.city}</div>
            {getimageurl(data.location.city)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

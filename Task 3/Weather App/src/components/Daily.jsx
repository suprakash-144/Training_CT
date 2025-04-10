import React from "react";
import { iconlist } from "../data/iconlist";

const Daily = ({ data }) => {
  const iconselector = (code) => {
    let url = "https://openweathermap.org/img/wn/02d.png";
    iconlist.forEach((item) => {
      if (item.code === code) {
        url = item.url;
      }
    });
    return <img src={url} alt="icon" />;
  };
  // {
  //   day: "Mon",
  //   date: 1739808000,
  //   high: 27,
  //   low: 13,
  //   text: "Cloudy",
  //   code: 26,
  // },
  return (
    <div className=" ">
      <div className="d-flex gap-4 dailybody py-2">
        {data.map((item, key) => (
          <div
            className="cardbody d-flex gap-2 flex-column   p-4 justify-content-center align-items-center "
            key={key}
          >
            <div className="fw-bold">{item.day}</div>
            <div className="icon">{iconselector(item.code)}</div>
            {/* <div className="climate ">`${item.text}`</div> */}
            <div className="temp d-flex gap-4">
              <div className="fw-bold">{item.high}&deg;c</div>
              <div className="fw-light">{item.low}&deg;c</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Daily;

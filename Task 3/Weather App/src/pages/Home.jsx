import React, { useEffect, useState } from "react";
import apiFetch from "../config/axiossetup";
import Card from "../components/Card";
import Daily from "../components/Daily";
import Highlights from "../components/Highlights";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { FaDirections } from "react-icons/fa";
import Search from "../components/Search";

const Home = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    apiFetch("Delhi", setloading, setdata);
  }, []);

  return (
    <div className=" container ">
      <div className="m-3">
        <div className="row mainbody">
          {loading ? (
            <div className="row">
              <Search setdata={setdata} setloading={setloading} />
              <div className="d-flex justify-content-center align-items-center fs-1 fw-bolder">
                Loading...
              </div>
            </div>
          ) : (
            <>
              <div className="col-lg-4 col-12 col-sm-12 col-md-12 ">
                <div className="d-flex flex-column responsive-padding">
                  <Search setdata={setdata} setloading={setloading} />
                  {data !== null ? <Card data={data} /> : <></>}
                </div>
              </div>
              {data !== null ? (
                <>
                  <div className="col-lg-8 col-sm-12 col-md-12  col-12 sidebody">
                    <div className="d-flex flex-column gap-3 justify-content-center responsive-padding ">
                      <h3>Today's Highlights</h3>
                      <div className="d-flex flex-wrap gap-3">
                        <Highlights
                          title={"Humidity"}
                          value={`${data?.current_observation?.atmosphere.humidity} %`}
                        />
                        <Highlights
                          title={"Pressure"}
                          value={`${data?.current_observation?.atmosphere.pressure} pa`}
                        />
                        <Highlights
                          title={"Visibility"}
                          value={`${data?.current_observation?.atmosphere.visibility} km`}
                        />{" "}
                        <div className="cardbody  p-3 col-lg-3 col-md-3 col-sm-12 col-12  ">
                          <div className="title">Sunrise & Sunset</div>
                          <div className="sunrise">
                            <WiSunrise color="orange" size={30} />{" "}
                            {data.current_observation.astronomy.sunrise}
                          </div>
                          <div className="sunset">
                            <WiSunset color="orange" size={30} />{" "}
                            {data.current_observation.astronomy.sunset}
                          </div>
                        </div>
                        <div className="cardbody  p-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="title">Wind speed</div>
                          <div className="fs-3">
                            {data.current_observation.wind.speed} km/h
                          </div>
                          <div className="d-flex gap-1 align-items-center">
                            <FaDirections color="blue" size={20} />
                            {data.current_observation.wind.direction}
                          </div>
                        </div>
                      </div>
                      <h3>This Week</h3>
                      {data?.forecasts ? (
                        <Daily data={data.forecasts} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
//

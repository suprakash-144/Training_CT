import axios from "axios";

const apiFetch = async (search, setloading, setdata) => {
  const options = {
    method: "GET",
    url: "https://yahoo-weather5.p.rapidapi.com/weather",
    params: {
      location: search,
      format: "json",
      u: "c",
    },
    headers: {
      "x-rapidapi-key": "06bfcbb05amsh2fdd97640f4337cp197408jsn423c36eba7c7",
      "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
    },
  };

  try {
    setloading(true);
    const res = await axios.request(options);
    setdata(res.data);
    setloading(false);
  } catch (error) {
    alert(error);
  } finally {
    setloading(false);
  }
};

export default apiFetch;

import { toast } from "react-toastify";
import axios from "../config/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("User/Refresh", {
        withCredentials: true,
      });

      setAuth((prev) => {
        return { ...prev, token: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {
      toast.error(error);
    }
  };
  return refresh;
};

export default useRefreshToken;

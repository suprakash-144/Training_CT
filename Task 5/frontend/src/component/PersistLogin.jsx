import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        toast.error("Login Again");
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
          <div className="h-100">
            <ThreeDot
              variant="bounce"
              color="#040404"
              size="medium"
              text=""
              textColor=""
            />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;

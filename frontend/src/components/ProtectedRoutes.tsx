import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { checkPatientAuthAsync } from "../state/apiCommunicator/auth";
import { useAppDispatch, useAppSelector } from "../state/hooks";
const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.patientSlice.isAuthenticated
  );
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  useEffect(() => {
    const checkPatientAuth = async () => {
      const res = await dispatch(checkPatientAuthAsync());
      if (checkPatientAuthAsync.fulfilled.match(res)) {
        navigate("/patient/home");
      } else if (checkPatientAuthAsync.rejected.match(res)) {
        navigate("/patient/login");
      }
    };

    if (!isAuthenticated) {
      checkPatientAuth();
    }
  }, [dispatch, navigate, path, isAuthenticated]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="size-full space-y-3">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;

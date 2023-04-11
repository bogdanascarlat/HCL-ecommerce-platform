import { useQuery } from "@apollo/client";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../features/user/authSlice";
import { addErrorMessage } from "../features/message/messageSlice";
import { PROFILE_QUERY } from "../graphql/query";

function useProtected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      dispatch(login(data.getProfile));
    },
    fetchPolicy: "no-cache",
    onError: (err) => {
      if (err.networkError && err.networkError.statusCode === 401) {
        // User is not authenticated
        dispatch(logout());
        navigate("/login");
      } else if (err.message.includes("LOGIN")) {
        // User session has expired
        dispatch(logout());
        navigate("/login");
      } else {
        // Other error
        batch(() => {
          dispatch(logout());
          dispatch(addErrorMessage(err.message));
        });
      }
    },
  });
}

export default useProtected;

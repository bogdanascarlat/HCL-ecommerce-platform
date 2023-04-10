import { useQuery } from "@apollo/client";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../features/user/authSlice";
import { addErrorMessage } from "../features/message/messageSlice";
import { PROFILE_QUERY } from "../graphql/query";
import { useSelector } from "react-redux";

function useProtected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLogedIn);

  useQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      dispatch(login(data.getProfile));
    },
    fetchPolicy: "no-cache",
    onError: (err) => {
      if (!isLoggedIn) {
        navigate("/login");
      }
      err.message.includes("LOGIN")
        ? dispatch(logout())
        : batch(() => {
            dispatch(logout());
            dispatch(addErrorMessage(err.message));
          });
    },
  });
}

export default useProtected;

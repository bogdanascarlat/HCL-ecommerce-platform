import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { logout } from "../../features/user/authSlice";
import useProtected from "../../hooks/useProtected";

const Profile = () => {
  useProtected();

  const user = useSelector((state) => state.auth.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Wait for 1 second before navigating
  };

  if (!user) { 
    navigate('/login')
    return (<></>)
  }

  return (
    <>
      <Navbar />
      <div className="d-flex container my-5" style={{ width: "100%" }}>
        <div className="row d-flex flex-column  flex-lg-row w-100">
        <h3 className="text-muted align-self-start mb-4">Profile</h3>
          <div className="col-lg-4 justify-content-start text-center">
            <div className="d-flex flex-column">
              <div className="">
                <img
                  className="rounded-circle"
                 
                  src ={user.firstName === "John" ? "https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                
                  style={{ maxWidth: 125 }}
                  alt="profile-pic"
                />
              </div>
              <p className="mt-3 mb-0 fw-bold">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="mt-0">
                {user.isAdmin ? "Administrator" : "Customer"}
              </p>
              <button onClick={handleLogout} className="btn btn-secondary mb-5 w-50 mx-auto">Logout</button>
            </div>
          </div>
          <div className="col mx-auto mt-auto">
            <h5 className="mb-3">Details</h5>
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex py-3">
                  <div className="text fw-bold ps-4">Email:</div>
                  <div className="mx-auto">{user.email}</div>
                </li>
                <li className="list-group-item d-flex py-3">
                  <div className="text fw-bold ps-4">Phone:</div>
                  <div className="mx-auto">{user.phone}</div>
                </li>
                <li className="list-group-item d-flex py-3 ">
                  <div className="text fw-bold ps-4">Address:</div>
                  <div className="mx-auto">{user.address}</div>
                </li>
                <li className="list-group-item d-flex py-3 ">
                  <div className="text fw-bold ps-4">Birth Day:</div>
                  <div className="mx-auto">{user.birthDate}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

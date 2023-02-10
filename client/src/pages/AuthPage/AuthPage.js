import { useSelector } from "react-redux";
import featuredImage from "../../assets/authImage.webp";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = ({ children = <LoginForm /> }) => {

  const {errorMessage} = useSelector((state) => state.messages)

  return (
    <div className="d-flex flex-column-reverse flex-md-row ">
      <div className="col ps-5 p-4 m-auto">
        <img
          style={{ minWidth: 400 }}
          className="img-fluid rounded-3 shadow"
          src={featuredImage}
          alt="featured"
        />
      </div>
      <div className="col p-4">
        <div className="d-flex row justify-content-center text-center ">
          <img
            className="m-4 mb-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/HCL_Technologies_logo.svg/2560px-HCL_Technologies_logo.svg.png"
            style={{ maxWidth: 350 }}
            alt="logo"
          />
          <h1 className="fw-bold">Welcome to HCL Shopping Portal</h1>
          <h3 className="fs-5 text-black-50 px-4 w-75">
            India's only shopping portal which allows free coupons to their
            employees.
          </h3>
        </div>
        { errorMessage && <div
          className="alert alert-warning alert-dismissible fade show mt-4 text-center mx-5"
          role="alert"
        >
          <strong>WARNING!</strong> {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>}
        {children}
      </div>
    </div>
  );
};

export default AuthPage;

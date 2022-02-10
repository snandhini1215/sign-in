import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
const SignIn = () => (
  <Formik
    initialValues={{ username: "", password: "" }}
    // on submit api call trigger
    onSubmit={(values) => {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((data) => data.json());
    }}
    //setting the validations
    validationSchema={Yup.object().shape({
      username: Yup.string().required("Please fill the Username."),
      password: Yup.string()
        .required("Please fill the Password.")
        .min(8, "Password should be min 8 chars."),
    })}
  >
    {/* props */}
    {(props) => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <div className="App">
          <div className="container">
            <h1 className="heading"> Sign in </h1>
            <form onSubmit={handleSubmit}>
              <div className="feild">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username ? "error" : ""}
                />
                {errors.username && touched.username && (
                  <div className="error-label">{errors.username}</div>
                )}
              </div>
              <div className="feild ">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
                />
                {errors.password && touched.password && (
                  <div className="error-label">{errors.password}</div>
                )}
              </div>
              <div className="checkbox">
                <input type="checkbox" /> Remember me?
              </div>
              <button>SIGN IN</button>
            </form>
            <div className="links">
              <div>
                <a>forgot your password?</a>
              </div>
              <div>
                don't have account? <a>Sign up</a>{" "}
              </div>
              <div>
                <a>Resend Email confirmation</a>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default SignIn;

import React from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loding from "../../Shared/Loding/Loding";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import axios from "axios";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  //sign in method firebase
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let errorElement;

  if (error) {
    errorElement = <p className="text-light">Error: {error?.message}</p>;
  }

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  if (loading || sending) {
    return <Loding></Loding>;
  }
  if (user) {
    // navigate(from, { replace: true });
  }
  //get input value when submited form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post("http://localhost:5000/login", { email });
    localStorage.setItem("access token", data.token);
    navigate(from, { replace: true });
    console.log(data);
  };
  const navigateRegister = (event) => {
    navigate("/register");
  };
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email");
    }
  };

  return (
    <div className="container w-50  mx-auto shadow-lg bg-primary  py-2  rounded my-5">
      <PageTitle title="Login"></PageTitle>
      <h2 className="text-light text-center mt-2"> Please Login...</h2>

      <Form
        onSubmit={handleSubmit}
        className="text-light text-start   justify-content-center"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button
          className="bg-light text-primary fw-semibold px-5"
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
      {errorElement}
      <p className="text-light">
        New to genuin car?{" "}
        <Link
          to="/register"
          onClick={navigateRegister}
          className="text-light text-decoration-none   fw-semibold"
        >
          {" "}
          Register
        </Link>{" "}
      </p>
      <p className="text-light">
        Forget password?{" "}
        <button
          onClick={resetPassword}
          className="btn btn-link text-light text-decoration-none  fw-semibold"
        >
          {" "}
          Reset Password
        </button>{" "}
      </p>
      <SocialLogin></SocialLogin>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
    </div>
  );
};

export default Login;

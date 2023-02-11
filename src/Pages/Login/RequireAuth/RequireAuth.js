import React from "react";
import { Button } from "react-bootstrap";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "../../../firebase.init";
import Loding from "../../Shared/Loding/Loding";

const RequireAuth = ({ children }) => {
  const [user, loding] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification] = useSendEmailVerification(auth);
  if (loding) {
    return <Loding></Loding>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.providerData[0].providerId === "password" && !user.emailVerified) {
    return (
      <div>
        <h3 className="text-danger">Your Email is not verified</h3>
        <h5 className="text-success">Please verify your email address</h5>
        <Button
          onClick={async () => {
            const success = await sendEmailVerification();
            if (success) {
              toast("Sent email");
            }
          }}
          variant="primary"
        >
          Send Verification
        </Button>
        <ToastContainer></ToastContainer>
      </div>
    );
  }
  return children;
};

export default RequireAuth;

import { Login } from "../loginSinginComponents/Login";
import { useState } from "react";
import { Signin } from "../loginSinginComponents/Signin";
import { ForgotPassword } from "../loginSinginComponents/ForgotPassword";

export const LoginSignin = () => {
  const [direct, setDirect] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

  const handleDirect = () => {
    setForgetPassword(false);
    setDirect(!direct);
  };

  const handleForget = () => {
    setForgetPassword(!forgetPassword);
  };

  return (
    <div className="pt-16 min-h-screen w-full bg-bgLogin bg-cover bg-center bg-no-repeat">
      {!forgetPassword ? (
        <>
          {" "}
          {direct ? (
            <Signin onDirect={handleDirect} />
          ) : (
            <Login onDirect={handleDirect} onForget={handleForget} />
          )}
        </>
      ) : (
        <ForgotPassword onDirect={handleDirect} onForget={handleForget} />
      )}
    </div>
  );
};

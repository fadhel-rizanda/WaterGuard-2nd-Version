import { Login } from "../loginSinginComponents/Login";
import { useState } from "react";
import { Signin } from "../loginSinginComponents/Signin";

export const LoginSignin = () => {
  const [direct, setDirect] = useState(false);

  const handleDirect = () => {
    setDirect(!direct);
  };

  return (
    <div className="pt-16 min-h-screen w-full bg-bgLogin bg-cover bg-center bg-no-repeat">
      {direct ? (
        <Signin onDirect={handleDirect} />
      ) : (
        <Login onDirect={handleDirect} />
      )}
    </div>
  );
};

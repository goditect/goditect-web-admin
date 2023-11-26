import { useState, useEffect } from "react";
import { Checkbox, Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import { useLoginMutation } from "../featured/auth/authApi";
import logo from "../assets/logo/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  //  Login From submit handler

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome back");
    } else if (isError) {
      toast.error(error?.data || error?.message);
    }
  }, [isSuccess, isError, error]);
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="w-[95%] rounded-md  md:w-[400px] shadow-lg bg-white p-10">
          <form onSubmit={loginFormSubmitHandler}>
            <div className="flex justify-center items-center mb-10">
              <img src={logo} alt="logo" className="w-[100px]" />
            </div>
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Email *" />
              </div>
              <TextInput
                name="email"
                id="email1"
                type="email"
                rightIcon={HiMail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Password *" />
              </div>
              <TextInput
                name="password"
                id="password1"
                type="password"
                rightIcon={MdPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex justify-between ">
              <div className="mb-5 flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
            </div>
            <div>
              <Button
                disabled={isLoading}
                type="submit"
                gradientMonochrome="info"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export default Login;

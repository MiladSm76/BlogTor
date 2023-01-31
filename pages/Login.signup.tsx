import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React, { ReactInstance, ReactNode, useState } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import Cookies from "universal-cookie";
import Loading from "../Notfound/Loading";
import { FieldValue, useForm } from "react-hook-form";
import { FunctionBody, TaggedTemplateExpression } from "typescript";
const cookies = new Cookies();
interface formProp {
  userName: string;
  password: string;
}
type LoginMutation = {}
type LoginMutationVariables = {
  variable: string,
}
const LoginSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: formProp) => console.log(data.userName);

  const [select_form, setselect_form] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");


  const login = async ({ userName, password }: formProp) => {

    const res: AxiosResponse | void = await axios
      .post("http://localhost:4000/user/login", {
        username: userName,
        password: password,
      })
      .catch((error) => {
        console.log(error.message);
      });
      if (!res) return;
      const {data} = res;
    if (data !== undefined) {
      cookies.set("token", data.token);
      alert("You've logged in successfully");
      return data;
    }
  };
  const login_Mutation: any = useMutation(login);
  const signup_Mutation = useMutation({
    mutationFn:async (data:formProp) =>{const res:any =await axios.post("http://localhost:4000/user/signup",
     {
      username: data.userName,
      name: data.password
    }
    )
    console.log("first")
    if (res.data.token !== undefined) {
      cookies.set("token", res.data.token);
      console.log(res.data);
      return res.data;
    }
  return res
  }
  })
  const signup = async ({ userName, password }: formProp) => {
    console.log(userName, password);
    const res: AxiosResponse | void = await axios
      .post("http://localhost:4000/user/signup", {
        username: userName,
        name: password,
      })
      .catch((error) => {
        console.log(error.message);
      });
    if (!res) return;
    if (res.data.token !== undefined) {
      cookies.set("token", res.data.token);
      console.log(res.data);
      return res.data;
    }
  };

  return (
    <>
      <div className="w-full h-screen relative bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src="./login.jpg"
          alt="/"
        />

        <div className="flex justify-center items-center h-full">
          {select_form ? (
            <div className="absolute max-w-[400px] w-full mx-auto bg-gray-100 p-8 rounded-sm text-black">
              <form onSubmit={handleSubmit(login_Mutation.mutate)}>
                <h2 className="font-bold text-4xl text-center py-6">Login</h2>
                <div className="flex flex-col my-4">
                  <label>Username</label>
                  <input
                    className="border relative bg-gray-300 p-2 text-[18px] font-medium rounded-md focus:outline-none "
                    type="text"
                    {...register("userName", { required: true, maxLength: 30 })}
                  />
                  {errors.userName && errors.userName.type === "required" && (
                    <span className="text-red-700 font-medium">
                      This is required
                    </span>
                  )}
                  {errors.userName && errors.userName.type === "maxLength" && (
                    <span className="text-red-700 font-medium">
                      This is Max length exceeded
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    className="border relative bg-gray-300 text-[18px] font-medium  p-2 rounded-md focus:outline-none "
                    type="password"
                    {...register("password", { required: true, maxLength: 30 })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="text-red-700 font-medium">
                      This is required
                    </span>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <span className="text-red-700 font-medium">
                      This is Max length exceeded
                    </span>
                  )}
                </div>
                <input
                  name="sign up"
                  type="submit"
                  className="rounded-md text-xl w-full
               bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3"
                ></input>
                <div className="flex justify-center items-center py-2 mt-3">
                  <p className="text-center mr-2 ">Don't have an account?</p>
                  <span
                    className="text-blue-900 font-bold cursor-pointer"
                    onClick={() => setselect_form(false)}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </div>
          ) : (
            <div className="absolute max-w-[400px] w-full mx-auto bg-gray-100 text-black rounded-sm p-8">
              <form onSubmit={handleSubmit(signup_Mutation.mutate)}>
                <h2 className="font-bold text-4xl text-center py-6">Sign up</h2>
                <div className="flex flex-col my-4">
                  <label>Username</label>
                  <input
                    className="border relative text-[18px] font-medium  bg-gray-300 p-2 rounded-md focus:outline-none "
                    type="text"
                    {...register("userName", { required: true, maxLength: 30 })}
                  />
                  {errors.userName && errors.userName.type === "required" && (
                    <span className="text-red-700 font-medium">
                      This is required
                    </span>
                  )}
                  {errors.userName && errors.userName.type === "maxLength" && (
                    <span className="text-red-700 font-medium">
                      This is Max length exceeded
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    className="border relative text-[18px] font-medium  bg-gray-300 p-2 rounded-md focus:outline-none "
                    type="text"
                    {...register("password", { required: true, maxLength: 30 })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="text-red-700 font-medium">
                      This is required
                    </span>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <span className="text-red-700 font-medium">
                      This is Max length exceeded
                    </span>
                  )}
                </div>
                <input
                  name="Login"
                  type="submit"
                  className="rounded-md text-xl w-full
               bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3"
                ></input>

                <div className="flex justify-center items-center py-2 mt-3">
                  <p className="text-center mr-2 ">
                    You have an account already?
                  </p>
                  <span
                    className="text-blue-900 font-bold cursor-pointer"
                    onClick={() => setselect_form(true)}
                  >
                    Login
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginSignup;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:3001/users/signup", formData)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response.data.message === "email must be unique")
          alert("User Already Exist");
        console.log(err);
      });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="border border-gray-900/10 mt-10 p-6 w-full sm:w-1/4 max-w-md mx-auto flex flex-col justify-center">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900 mx-auto">
          Sign Up
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full sm:w-auto sm:self-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      <Link className="mt-4" to={'/signin'}>Already have an account ? <span className="text-indigo-600 font-bold">Login here</span></Link>
      </div>
      
    </form>
  );
};

export default SignUpForm;

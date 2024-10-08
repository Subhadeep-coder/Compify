"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import "../globals.css"
import { useRouter } from 'next/navigation';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://compify.onrender.com/api/v1/auth/signup', {
        name,
        email,
        password
      });
      const data = res.data;
      localStorage.setItem("acc_compify", data.accessToken);
      router.push('/chat');
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("acc_compify");
    if(token){
      router.push("/chat")
    }
  }, []
  )
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700 w-full max-w-lg">
        {/* Card header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
        </div>
        {/* Card body */}
        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="string"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?{' '}
              <Link
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

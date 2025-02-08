import React from "react";

export default function Banner() {
  return (
    <div
      role="alert"
      className="mt-5 justify-center relative flex w-full p-2 text-sm text-white  bg-[linear-gradient(-45deg,_#1E3A8A_25%,_transparent_25%,_transparent_50%,_#1E3A8A_50%,_#1E3A8A_75%,_transparent_75%,_transparent)] 
  bg-[size:50px_50px] bg-blue-700 "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        ></path>
      </svg>
      Beta release
    </div>
  );
}

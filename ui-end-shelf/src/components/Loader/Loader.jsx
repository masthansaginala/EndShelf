import React from 'react'
import { BallTriangle, Hourglass, TailSpin } from 'react-loader-spinner';

// import { Hourglass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="api-loading-wrapper">
   <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="rgb(45, 61, 55)"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>
  )
}

export default Loader;
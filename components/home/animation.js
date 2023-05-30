//animation.js <-- animation.tsx로  하면 에러
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "/public/my-lottie.json";

export default function Animation() {
  return <Lottie loop animationData={lottieJson} play />;
}

"use client"

import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Re = ({ Component, pageProps }) => {

  return (
    <>
      <GoogleReCaptchaProvider
      reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "body",
        nonce: undefined,
        
      }}
      >
       
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Re;
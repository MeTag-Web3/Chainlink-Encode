import React, { useState } from "react";
import UAuth from "@uauth/js";
import { Button, useColorModeValue } from "@chakra-ui/react";

const uauth = new UAuth({
  clientID: "91dfcfe5-6be7-4683-9d3e-4b1347c23781",
  redirectUri: "https://test.getmetag.io/",
});

function UNSD() {
  const ButtonColorMode1 = useColorModeValue("gray.600", "#303E46");
  const [Uauth, setUauth] = useState();

  async function Connect() {
    try {
      const authorization = await uauth.loginWithPopup();
      setUauth(JSON.parse(JSON.stringify(authorization))["idToken"]);

      await authenticate();
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    uauth.logout();
    logout();
  }

  function log() {
    if (Uauth === null || Uauth === undefined) {
      Connect();
    } else {
      logOut();
    }
  }

  return (
    <>
      <Button
        className="tetiary-1 font-roboto  text-white"  onClick={log} >
        {Uauth != null
          ? Uauth["sub"]
          : "Login UNS Domains"}
      </Button>
    </>
  );
}

export default UNSD;

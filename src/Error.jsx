import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>Opss!</h1>
      {error.statusText || error.message}
      <br/>
      <a href="/">Go Home</a>
    </div>
  );
}

export default Error;

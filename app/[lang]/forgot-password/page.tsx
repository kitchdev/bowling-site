import React from "react";

function page({ params }) {
  console.log(params);
  return <div>{params.lang}</div>;
}

export default page;

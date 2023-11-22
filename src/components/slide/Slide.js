import Image from "next/image";
import React from "react";

const Slide = ({ img }) => {
  console.log('im imageeeeeee',img)
  return (
    <>
      <img
        className="d-sm-block w-100 "
        src={img}
        alt={img}
        width={2000}
        height={300}
        priority={true}
      />
    </>
  );
};

export default Slide;

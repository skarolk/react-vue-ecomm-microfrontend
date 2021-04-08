// mount function preferable to react component import to maintain framework agnosticism
import { mount as marketingMount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  // only want mount to run once
  useEffect(() => {
    // reference to the html element
    marketingMount(ref.current);
  });

  return <div ref={ref} />;
};

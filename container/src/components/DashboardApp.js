// mount function preferable to react component import to maintain framework agnosticism
import { mount as dashboardMount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  // only want mount to run once
  useEffect(() => {
    dashboardMount(ref.current);
  }, []);

  return <div ref={ref} />;
};

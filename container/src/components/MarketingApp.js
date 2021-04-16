// mount function preferable to react component import to maintain framework agnosticism
import { mount as marketingMount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  // only want mount to run once
  useEffect(() => {
    // reference to the html element
    const { onParentNavigate } = marketingMount(ref.current, {
      // onNavigate anonymous function has param of location with pathname destructured from it
      // can use colon to rename pathname to nextPathname
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // to avoid infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
    // empty array will make useeffect only run once on initial render to screen
  }, []);

  return <div ref={ref} />;
};

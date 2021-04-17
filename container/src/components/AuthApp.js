// mount function preferable to react component import to maintain framework agnosticism
import { mount as authMount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  // only want mount to run once
  useEffect(() => {
    // reference to the html element
    const { onParentNavigate } = authMount(ref.current, {
      initialPath: history.location.pathname,
      // onNavigate anonymous function has param of location with pathname destructured from it
      // can use colon to rename pathname to nextPathname
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // to avoid infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
      // equivalent to above
      // onSignIn: () => {
      //   onSignIn();
      // },
    });

    history.listen(onParentNavigate);
    // empty array will make useeffect only run once on initial render to screen
  }, []);

  return <div ref={ref} />;
};

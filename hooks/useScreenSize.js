import { useState, useEffect } from "react";

export default function ScreenSize({ size }) {
  const screen = {
    width: window.matchMedia(`(max-width: ${size} )`),
  };

  const [mobileVersion, setMobileVersion] = useState();

  useEffect(() => {
    function handleResize() {
      if (screen.width.matches) {
        setMobileVersion(true);
      } else {
        setMobileVersion(false);
      }
      window.addEventListener("resize", handleResize);
    }
    handleResize();
    // eslint-disable-next-line
  }, []);
  return mobileVersion;
}

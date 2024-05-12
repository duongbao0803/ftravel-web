import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const useAnimation = () => {
  useEffect(() => {
    const initAOSInstance = () => {
      if (window.innerWidth < 768) {
        AOS.init({ disable: true });
      } else {
        AOS.init({
          once: true,
          duration: 600,
          easing: "ease-in-sine",
        });
      }
    };

    initAOSInstance();

    return () => {
      AOS.refresh();
    };
  }, []);
};

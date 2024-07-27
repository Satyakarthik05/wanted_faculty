import React from "react";
import banner from "./Banner.module.css";
import bannerimg from "../../../assets/banner1.png";
import "bootstrap/dist/css/bootstrap.css";

const Banner = () => {
  return (
    <section className={`${banner.banner} container`}>
      <div className={`${banner.bannerL} row`}>
        <h3 className={`${banner.text} col-12`}>
          <span className={`h1 ${banner.textSpan}`}>
            Unlock your potential and shape the future — apply now to find your
            next faculty role with us.
          </span>
          {/* <span className={`h1 text-danger ${banner.textSpan}`}>
            world-class educators.
          </span>
          <span className={`h3 ${banner.textSpan}`}>
            Your journey to excellence begins here.
          </span> */}
        </h3>
      </div>
      <div className={`${banner.bannerR} row`}>
        <img
          src={bannerimg}
          alt="Banner"
          className={`img-fluid ${banner.img}`}
        />
      </div>
    </section>
  );
};

export default Banner;

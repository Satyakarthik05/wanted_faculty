import React from "react";
import about from "./About.module.css";
import about1 from "../../assets/about1.png";

const AboutUs = () => {
  return (
    <>
      <br />
      <h1 style={{ textAlign: "center" }}>About Us</h1>
      <section className={`${about.banner} container`}>
        <div className="row">
          <div className="col-lg-6 col-12 d-flex align-items-center">
            <h3 className="w-100">
              <span className={`${about.textSpan} h6`}>
                Faculty Wanted was born out of a need for a more cohesive
                connection between educational institutions and talented
                educators. As experienced professionals in the academic realm,
                we understood the challenges both sides faced during the hiring
                process. Our journey began with a simple vision: to create a
                platform that bridges the gap between colleges seeking faculty
                and job-seeking educators.
              </span>
            </h3>
          </div>
          <div className="col-lg-4 col-8 pl-5">
            <img
              src={about1}
              alt="Banner"
              className={`img-fluid ${about.img}`}
            />
          </div>
        </div>
      </section>
      <section className={`${about.banner} container`}>
        <div className="row">
          <div className="col-lg-4 col-8 pl-5">
            <img
              src={about1}
              alt="Banner"
              className={`img-fluid ${about.img}`}
            />
          </div>
          <div className="col-lg-6 col-12 d-flex align-items-center">
            <h3 className="w-100">
              <span className={`${about.textSpan} h6`}>
                Faculty Wanted was born out of a need for a more cohesive
                connection between educational institutions and talented
                educators. As experienced professionals in the academic realm,
                we understood the challenges both sides faced during the hiring
                process. Our journey began with a simple vision: to create a
                platform that bridges the gap between colleges seeking faculty
                and job-seeking educators.
              </span>
            </h3>
          </div>
        </div>
      </section>
      {/* Uncomment the below section if you want to add more content later
      <div className="container mt-5">
        <h1 className="text-center mb-4">Faculty Wanted: About Us</h1>

        <section className="mb-5">
          <h2>Company's Journey</h2>
          <p>
            Faculty Wanted was born out of a need for a more cohesive connection
            between educational institutions and talented educators. As
            experienced professionals in the academic realm, we understood the
            challenges both sides faced during the hiring process. Our journey
            began with a simple vision: to create a platform that bridges the
            gap between colleges seeking faculty and job-seeking educators. Over
            the years, we've liaised with numerous colleges and universities,
            constantly refining our approach to ensure we deliver the best
            possible service to both parties.
          </p>
        </section>

        <section className="mb-5">
          <h2>Purpose and Goals</h2>
          <p>
            At Faculty Wanted, our primary purpose is clear: to facilitate the
            hiring process in academia. By connecting colleges with passionate
            educators, we aim to enhance the quality of education by ensuring
            that institutions have access to top-tier faculty. Our goals
            include:
          </p>
          <ul>
            <li>
              <strong>Streamlining Online Job Searches:</strong> Making it
              easier for educators to find job postings that align with their
              skills and aspirations.
            </li>
            <li>
              <strong>Supporting Academic Institutions:</strong> Helping
              colleges discover exceptional talent that contributes to their
              academic missions.
            </li>
            <li>
              <strong>Fostering a Supportive Community:</strong> Creating a
              space where educators can share experiences, gain insights, and
              find mentorship within the academic community.
            </li>
          </ul>
        </section>
      </div>
      */}
    </>
  );
};

export default AboutUs;

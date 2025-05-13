import React from "react";
import Hero from "../components/Hero";
// import BlogGenerator from "../components/BlogGenerator";
import Blogs from "./Blogs";
import About from "./About";
// import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <BlogGenerator /> */}
      <Blogs />
      <About />
      {/* <Contact /> */}
    </div>
  );
};

export default Home;

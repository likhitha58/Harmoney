import React from "react";
import Harmoneylogo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-center border-top py-4 mt-4">
      <img
        src={Harmoneylogo}
        alt="Harmoney"
        width="40"
        height="40"
        className="mb-2"
      />
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Harmoney, Inc. All rights reserved.
      </p>
      <small className="text-muted">
        Built with 💜 to help you achieve your dreams.
      </small>
    </footer>
  );
};

export default Footer;

import React from "react";

interface NavProps {}

const Footer: React.FunctionComponent<NavProps> = () => {
  return (
    <nav className="navbar navbar-dark bg-dark w-100 position-fixed fixed-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          support the project at <code>github.com/open-library-attendance</code>
        </a>
      </div>
    </nav>
  );
};

export default Footer;

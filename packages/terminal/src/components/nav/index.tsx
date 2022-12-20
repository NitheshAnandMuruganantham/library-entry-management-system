import React, { useEffect, useState } from "react";

interface NavProps {}

const Nav: React.FunctionComponent<NavProps> = () => {
  const [name, SetName] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env["VITE_SERVER"]}/library`).then((dt) =>
      dt.json().then((dt2) => SetName(dt2?.name || ""))
    );
  }, []);
  return (
    <nav className="navbar navbar-dark bg-dark w-100 position-fixed fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Library User Management System | {name}
        </a>
      </div>
    </nav>
  );
};

export default Nav;

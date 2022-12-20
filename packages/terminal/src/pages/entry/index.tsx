import React, { useState } from "react";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
interface EntryProps {}

const Entry: React.FunctionComponent<EntryProps> = () => {
  const [data, SetData] = useState({});
  const [id_input, setIdInput] = useState("");
  const [name, SetName] = useState("");
  return (
    <div className="container-fluid">
      <Nav />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "90vh" }}
      >
        <div className="p-2 w-50 d-flex align-items-center justify-content-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`${import.meta.env["VITE_SERVER"]}/input/${id_input}`);
            }}
          >
            <div
              className="mb-3 d-flex flex-column text-light bg-secondary border rounded border border-primary "
              style={{
                padding: "10px",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <label htmlFor="studentIdInput1" className="form-label">
                Student Id
              </label>
              <input
                autoFocus
                type="text"
                value={id_input}
                onChange={(e) => {
                  setIdInput(e.currentTarget.value);
                }}
                className="form-control"
                id="studentIdInput1"
                aria-describedby="studentIsHelp"
              />
              <div id="studentIsHelp" className="form-text text-light ">
                input your student id here
              </div>
              <button type="submit" className="m-2 mt-3 btn btn-sm btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="p-2 w-50 d-flex align-items-center flex-column justify-content-center">
          <div className="p-2 w-50 d-flex align-items-center justify-content-center w-100 m-1">
            <div
              className="p-2 bg-success text-light border rounded m-1 d-flex flex-column align-items-center justify-content-center"
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              <h5>Students inside</h5>
              <h5>120</h5>
            </div>
            <div
              className="p-2 bg-warning m-1 d-flex border rounded flex-column align-items-center justify-content-center"
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              <h5>Staffs inside</h5>
              <h5>10</h5>
            </div>
          </div>
          <div className="p-2 w-50 d-flex align-items-center justify-content-center w-100 m-1">
            <div
              className="p-2 bg-info text-light border rounded m-1 d-flex flex-column align-items-center justify-content-center"
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              <h5>Students Today</h5>
              <h5>120</h5>
            </div>
            <div
              className="p-2 bg-info text-light border rounded m-1 d-flex flex-column align-items-center justify-content-center"
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              <h5>Staffs Today</h5>
              <h5>12</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Entry;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import data from "../../data/data.json";

const Destination = () => {
  const [vehicleType] = useContext(UserContext);
  const [pickPoint, setPickPoint] = useState({
    pickFrom: "",
    pickTo: "",
    pickDate: null,
    pickTime: null,
  });
  const [showPickPointForm, setShowPickPointForm] = useState(true);
  const selectedVehicle = data.find((ve) => ve.id === parseInt(vehicleType));

  const arr = () => {
    if (selectedVehicle !== undefined) {
      const range = (start, end) => {
        return Array(end - start + 1)
          .fill()
          .map((_, idx) => start + idx);
      };
      const result = range(1, selectedVehicle.numberOfVehicle);
      return result;
    }
  };

  const handleInput = (e) => {
    const pickPointInfo = { ...pickPoint };
    pickPointInfo[e.target.name] = e.target.value;
    setPickPoint(pickPointInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickPoint.pickFrom && pickPoint.pickTo) {
      setShowPickPointForm(!showPickPointForm);
    }
  };
  return (
    <div className="row">
      <div className="col-md-4" style={{ maxWidth: "390px" }}>
        {showPickPointForm && (
          <form
            className="p-4 my-5 mx-2 shadow-lg rounded"
            onSubmit={handleSubmit}
          >
            <label htmlFor="pickFrom" className="my-1">
              <b>Pick from</b>
            </label>
            <input
              type="text"
              name="pickFrom"
              id="pickFrom"
              placeholder="Starting point"
              onBlur={handleInput}
              className="m-1 px-1 form-control"
              required
            />
            <label htmlFor="pickTo" className="my-1">
              <b>Pick to</b>
            </label>
            <input
              type="text"
              name="pickTo"
              id="pickTo"
              placeholder="Desnination"
              onBlur={handleInput}
              className="m-1 px-1 form-control"
            />
            <input
              type="date"
              className="m-1 px-1 form-control"
              name="pickDate"
              onBlur={handleInput}
              id="pickDate"
            />
            <input
              type="time"
              className="m-1 px-1 form-control"
              name="pickTime"
              onBlur={handleInput}
              id="pickTime"
            />
            {selectedVehicle !== undefined ? (
              <input
                type="submit"
                value="Search"
                className="btn btn-success d-inline-block py-2 px-5 btn-sm mx-1 my-2"
                required
              />
            ) : (
              <Link to="/" className="btn btn-warning px-4 py-2 m-1">
                Select vehicle first
              </Link>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Destination;

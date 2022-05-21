import { Stack, InputGroup, FormControl, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const SearchCarPlate = () => {
  const [carList, setCarList] = useState([]);
  const [carToSearch, setCarToSearch] = useState("");

  async function findAllCars() {
    axios
      .post(
        "http://localhost:3333/findPlateNumber",
        {},
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setCarList(data);
      });
  }

  async function findCarByPlateNumber() {
    axios
      .post(
        "http://localhost:3333/findPlateNumber",
        { carPlateNumber: carToSearch },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const data = response.data;

        setCarList(data);

        if (data.length === 0) {
          alert("No vehicle found");
        }
      });
  }

  useEffect(() => {
    findAllCars();
  }, []);

  return (
    <Stack gap={2} className="col-md-9 mx-auto">
      <div className="text-center h2 mt-5">Search Item</div>
      <InputGroup className="col-2 mt-2">
        <InputGroup.Text>Car Plate Number</InputGroup.Text>
        <FormControl
          onChange={(event) => {
            setCarToSearch(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              findCarByPlateNumber();
            }
          }}
        />
      </InputGroup>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Car Plate</th>
            <th>Status</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Car Price</th>
            <th>Sold Price</th>
            <th>Sold Date</th>
          </tr>
        </thead>
        <tbody>
          {carList &&
            carList.map((car: any) => {
              return (
                <tr key={car.carPlate}>
                  <td>
                    <a href={`http://localhost:1379/viewCarInfo?Id=${car._id}`}>
                      {car.carPlate}
                    </a>
                  </td>
                  <td>{car.status.toUpperCase()}</td>
                  <td>{car.carMake}</td>
                  <td>{car.carModel}</td>
                  <td>{car.carPrice}</td>
                  <td>{car.soldPrice}</td>
                  <td>
                    {car.soldDate &&
                      moment(car.soldDate)
                        .utcOffset("+0800")
                        .format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
};

export default SearchCarPlate;

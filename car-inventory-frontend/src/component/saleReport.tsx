import { Stack, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const SaleReport = () => {
  const [carList, setCarList] = useState([]);
  const [soldCarList, setSoldCarList] = useState([]);
  const [newCarList, setNewCarList] = useState([]);

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

  useEffect(() => {
    findAllCars();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(carList)) {
      let soldCounts: any = {};
      let newCounts: any = {};
      carList.forEach((x: any) => {
        if (x.status === "purchased") {
          soldCounts[x.carMake] = (soldCounts[x.carMake] || 0) + 1;
        } else if (x.status === "new") {
          newCounts[x.carMake] = (newCounts[x.carMake] || 0) + 1;
        }
      });

      let tempSold: any = [];
      for (let item in soldCounts) {
        tempSold.push({ vehicleModel: item, count: soldCounts[item] });
      }
      setSoldCarList(tempSold);

      let tempNew: any = [];
      for (let item in newCounts) {
        tempNew.push({ vehicleModel: item, count: newCounts[item] });
      }
      setNewCarList(tempNew);
    }
  }, [carList]);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <div className="text-center h2 mt-5">Sale Report</div>
      <div className="text-left h5 mt-3">
        <u>Sold Cars</u>
      </div>
      <Table className="mt-1" striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Make</th>
            <th>Number Of Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {soldCarList &&
            soldCarList.map((car: any) => {
              return (
                <tr key={car.vehicleModel}>
                  <td>{car.vehicleModel}</td>
                  <td>{car.count}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="text-left h5 mt-3">
        <u>New Cars</u>
      </div>
      <Table className="mt-1" striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Make</th>
            <th>Number Of Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {newCarList &&
            newCarList.map((car: any) => {
              return (
                <tr key={car.vehicleModel}>
                  <td>{car.vehicleModel}</td>
                  <td>{car.count}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
};

export default SaleReport;

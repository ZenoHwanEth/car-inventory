import React, { useState } from "react";
import { Button, Form, Stack, Alert } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [carInfo, setCarInfo] = useState({
    carMake: "",
    carModel: "",
    carPlate: "",
    carPrice: "",
    sku: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [failure, setFailure] = useState("");

  const handleChange = (event: any) => {
    // force it to capital
    if (event.target.name === "carMake" || event.target.name === "carModel") {
      event.target.value = event.target.value.toUpperCase();
    }

    // remove space and capitalize them
    if (event.target.name === "sku" || event.target.name === "carPlate") {
      event.target.value = event.target.value.toUpperCase();
      event.target.value = event.target.value.replace(" ", "");
    }

    setCarInfo({ ...carInfo, [event.target.name]: event.target.value });
  };

  const handleAdd = async (event: any) => {
    // to prevent refresh
    event.preventDefault();

    if (
      carInfo.carMake === "" ||
      carInfo.carModel === "" ||
      carInfo.carPlate === "" ||
      carInfo.carPrice === "" ||
      carInfo.sku === ""
    ) {
      setFailure("Please make sure all the fields are not empty.");
      return;
    }

    await axios
      .post(
        "http://localhost:3333/addCar",
        {
          ...carInfo,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => {
        setFailure("");
        setShowSuccess(true);
      })
      .catch((error) => {
        setShowSuccess(false);
        console.log(error.response);
        setFailure(error.response.data);
      });

    // set back to empty
    setCarInfo({
      carMake: "",
      carModel: "",
      carPlate: "",
      carPrice: "",
      sku: "",
    });
  };

  function renderSuccess() {
    if (showSuccess) {
      return (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          className="mt-3"
          dismissible
        >
          <Alert.Heading>You have submitted the car info</Alert.Heading>
          <p>Your car has added into inventory</p>
        </Alert>
      );
    }
  }

  function renderError() {
    if (failure !== "") {
      return (
        <Alert
          variant="danger"
          onClose={() => setFailure("")}
          className="mt-3"
          dismissible
        >
          <Alert.Heading>Fail to submit</Alert.Heading>
          <p>Failure message : {failure}</p>
        </Alert>
      );
    }
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      {renderSuccess()}
      {renderError()}
      <div className="bg-light text-center h2 mt-5">
        Welcome To Car Inventory
      </div>
      <div className="text-left h5 mt-3">
        <u>Add New Car</u>
      </div>
      <Form className="border p-4 rounded">
        <Form.Group className="mb-3" controlId="formCarMake">
          <Form.Label>Car Make</Form.Label>
          <Form.Control
            placeholder="PROTON"
            name="carMake"
            value={carInfo.carMake}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarModel">
          <Form.Label>Car Model</Form.Label>
          <Form.Control
            placeholder="SAGA"
            name="carModel"
            value={carInfo.carModel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarPlate">
          <Form.Label>Car Plate</Form.Label>
          <Form.Control
            placeholder="PFQ5217"
            name="carPlate"
            value={carInfo.carPlate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarPrice">
          <Form.Label>Car Price</Form.Label>
          <Form.Control
            placeholder="20000"
            name="carPrice"
            min="1000"
            type="number"
            value={carInfo.carPrice}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarPrice">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            placeholder="ZG011AQA"
            name="sku"
            value={carInfo.sku}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Form>
    </Stack>
  );
};

export default Home;

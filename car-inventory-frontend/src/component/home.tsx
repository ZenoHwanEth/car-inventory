import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

const Home = () => {
  const [carInfo, setCarInfo] = useState({
    carMake: "",
    carModel: "",
    carPlate: "",
    carPrice: "",
    sku: "",
  });

  const handleChange = (event: any) => {
    setCarInfo({ ...carInfo, [event.target.name]: event.target.value });
  };

  const handleAdd = (event: any) => {
    // to prevent refresh
    event.preventDefault();
    console.log(carInfo);

    // set back to empty
    setCarInfo({
      carMake: "",
      carModel: "",
      carPlate: "",
      carPrice: "",
      sku: "",
    });
  };

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <div className="bg-light text-center h2 mt-5">
        Welcome To Car Inventory
      </div>
      <div className="text-left h5 mt-5">
        <u>Add New Car</u>
      </div>
      <Form className="border p-4 rounded">
        <Form.Group className="mb-3" controlId="formCarMake">
          <Form.Label>Car Make</Form.Label>
          <Form.Control
            placeholder="Proton"
            name="carMake"
            value={carInfo.carMake}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarModel">
          <Form.Label>Car Model</Form.Label>
          <Form.Control
            placeholder="Saga"
            name="carModel"
            value={carInfo.carModel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCarPlate">
          <Form.Label>Car Plate</Form.Label>
          <Form.Control
            placeholder="PFQ 5217"
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

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import {
  Spinner,
  Stack,
  Table,
  InputGroup,
  FormControl,
  Button,
  Container,
  Image,
} from "react-bootstrap";

const ViewCarInfo = () => {
  const { search } = useLocation();
  const [carInfo, setCarInfo] = useState({
    id: "",
    sku: "",
    status: "",
    carPrice: "",
    carMake: "",
    carModel: "",
    carPlate: "",
    soldPrice: "",
    soldDate: "",
  });
  const [soldPrice, setSoldPrice] = useState("");

  async function getCarInfo(id: string) {
    axios
      .post("http://localhost:3333/viewCarInfo", { id: id })
      .then((response) => {
        const data = response.data;

        setCarInfo({
          id: data._id,
          sku: data.sku,
          status: data.status,
          carPrice: data.carPrice,
          carMake: data.carMake,
          carModel: data.carModel,
          carPlate: data.carPlate,
          soldPrice: data.soldPrice ?? "",
          soldDate: data.soldDate ?? "",
        });

        return response.data;
      });
  }

  useEffect(() => {
    const { Id } = queryString.parse(search);

    // When id is not null
    if (!_.isEmpty(Id) && Id !== null) {
      setTimeout(() => {
        getCarInfo(Id.toString());
      }, 1000);
    }
  }, [search]);

  const handleSubmitSold = async (event: any) => {
    await axios.post("http://localhost:3333/soldCar", {
      id: carInfo.id,
      soldPrice,
    });

    window.location.reload();
  };

  function renderTableInfo() {
    if (carInfo.carPlate === "") {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading For Car Info...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <Table className="mt-5" striped bordered hover>
          <tbody>
            <tr>
              <td>Car Plate</td>
              <td>{carInfo.carPlate}</td>
            </tr>
            <tr>
              <td>Car Make</td>
              <td>{carInfo.carMake}</td>
            </tr>
            <tr>
              <td>Car Model</td>
              <td>{carInfo.carModel}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{carInfo.status.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Car Price</td>
              <td>RM {carInfo.carPrice}</td>
            </tr>
            {carInfo.soldPrice && (
              <>
                <tr>
                  <td>Sold Price</td>
                  <td>RM {carInfo.soldPrice}</td>
                </tr>
                <tr>
                  <td>Sold Date</td>
                  <td>
                    {moment(carInfo.soldDate)
                      .utcOffset("+0800")
                      .format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      );
    }
  }

  function renderPurchaseSection() {
    if (!carInfo.soldDate && carInfo.carPlate) {
      return (
        <Container>
          <div className="justify-content-md-center row">
            <InputGroup className="col-2 mt-2">
              <InputGroup.Text>Sold Price</InputGroup.Text>
              <FormControl
                min="1000"
                type="number"
                value={soldPrice}
                onChange={(event: any) => {
                  setSoldPrice(event.target.value);
                }}
              />
            </InputGroup>
            <Button
              as="input"
              type="submit"
              value="Submit"
              className="col-2 mt-4"
              onClick={handleSubmitSold}
            />
          </div>
        </Container>
      );
    } else if (carInfo.soldDate && carInfo.carPlate) {
      return (
        <Image
          src="https://c.tenor.com/UVdyTjo2DHAAAAAd/leonardo-dicaprio-sold-gif.gif"
          className=" img-fluid mx-auto"
          height="50%"
          width="50%"
        ></Image>
      );
    }
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <div className="text-center h2 mt-5">Car Info</div>
      {renderTableInfo()}
      {renderPurchaseSection()}
    </Stack>
  );
};

export default ViewCarInfo;

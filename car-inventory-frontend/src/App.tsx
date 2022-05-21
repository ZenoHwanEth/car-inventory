import NavigationBar from "./component/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import ViewCarInfo from "./component/viewCarInfo";
import SearchCarPlate from "./component/searchCarPlate";
import SaleReport from "./component/saleReport";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewCarInfo" element={<ViewCarInfo />} />
        <Route path="/searchCarPlate" element={<SearchCarPlate />} />
        <Route path="/saleReport" element={<SaleReport />} />
      </Routes>
    </Router>
  );
}

export default App;

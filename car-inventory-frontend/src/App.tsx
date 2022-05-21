import NavigationBar from "./component/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import ViewCarInfo from "./component/viewCarInfo";
import SearchCarPlate from "./component/searchCarPlate";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewCarInfo" element={<ViewCarInfo />} />
        <Route path="/searchCarPlate" element={<SearchCarPlate />} />
      </Routes>
    </Router>
  );
}

export default App;

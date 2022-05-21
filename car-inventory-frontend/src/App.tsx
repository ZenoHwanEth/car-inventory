import NavigationBar from "./component/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import ViewCarInfo from "./component/viewCarInfo";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewCarInfo" element={<ViewCarInfo />} />
      </Routes>
    </Router>
  );
}

export default App;

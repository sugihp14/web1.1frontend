import logo from "./logo.svg";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import User from "../src/pages/user.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

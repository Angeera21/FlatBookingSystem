import logo from './logo.svg';
import './App.css';
import LoginRegister from './LoginRegister';
import SearchFlat from './SearchFlat';
import Home from './Home';
import { useHistory } from "react-router-dom";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FlatCreation from './FlatCreation';
import AdminApproval from './AdminApproval';
function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/home" element={<Home />} />
      <Route path="login" element={<LoginRegister />} />
      <Route path="search" element={<SearchFlat />} />
      <Route path="flatcreate" element={<FlatCreation />} />
      <Route path="adminApprove" element={<AdminApproval />} />

    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;

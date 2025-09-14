import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SellTickets from "../pages/SellTickets";
import Help from "../pages/Help";
import Organizer from "../pages/Organizer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/help" element={<Help />} />
      <Route path="/organizers" element={<Organizer />} />
    </Routes>
  );
}

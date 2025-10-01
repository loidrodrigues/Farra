import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SellTickets from "../pages/SellTickets";
import Help from "../pages/Help";
import Organizer from "../pages/Organizer";
import TicketDetails from "../pages/TicketDetails";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/ticket/:id" element={<TicketDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/help" element={<Help />} />
      <Route path="/organizers" element={<Organizer />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

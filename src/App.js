import "./App.css";
import Persons from "./pages/Persons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Person from "./pages/Person";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
            <Route path="/" element={<Persons />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/persons/:id" element={<Person />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}
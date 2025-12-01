import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";
import NewProject from "./pages/NewProject";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProject />} />
          <Route path="/projects" element={<ProjectsList />} />
        </Routes>
      </div>
    </div>
  );
}
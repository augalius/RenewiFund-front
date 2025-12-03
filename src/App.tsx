import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NewProject from "./pages/NewProject";
import { ProjectList } from "./pages/ProjectList";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProject />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </div>
    </div>
  );
}
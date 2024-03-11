import { Link, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Authors } from "./pages/Authors";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
    </>
   
  );
}

export default App;

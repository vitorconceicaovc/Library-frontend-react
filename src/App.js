import { Link, Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { Authors } from './pages/Authors';
import { BookDetail } from './pages/BookDetail';
import { AuthorDetail } from './pages/AuthorDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/author/:id" element={<AuthorDetail />} />
      </Routes>
    </>
  );
}

export default App;

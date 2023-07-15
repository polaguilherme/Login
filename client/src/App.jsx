

import Cadastro from "./components/Cadastro/Cadastro";
import Home  from "./components/Home/Home";
import Horarios from "./components/Horarios/Horarios";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';





function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App

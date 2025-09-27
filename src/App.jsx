import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import './App.css'    

export default function App() {
  return (
    <div>
      <header className="nav">
        <Link to="/" className="brand">🎬 Movie Explorer</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </div>
  )
}

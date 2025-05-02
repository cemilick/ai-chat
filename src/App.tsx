import { Routes, Route } from 'react-router-dom';
import Chatbox from './components/Chatbox';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai" element={<Chatbox />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
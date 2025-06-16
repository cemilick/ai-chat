import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingPageNew from './pages/LandingPageNew';
import ChatApp from './pages/ChatApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new" element={<LandingPageNew />} />
          <Route path="/ai" element={<ChatApp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
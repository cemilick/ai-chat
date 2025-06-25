import { Routes, Route } from 'react-router-dom';
import ChatApp from './pages/ChatApp';
import LandingPageNew2 from './pages/LandingPageNew2';
import Blog from './pages/Blog';
import Games from './pages/Games';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Routes>
          <Route path="/" element={<LandingPageNew2 />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/ai" element={<ChatApp />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
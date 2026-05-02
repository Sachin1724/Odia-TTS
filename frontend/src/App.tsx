import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Collect from './pages/Collect';
import Workspace from './pages/Workspace';
import Analytics from './pages/Analytics';
import SpeakerProfile from './pages/SpeakerProfile';
import Library from './pages/Library';
import ApiSettings from './pages/ApiSettings';
import ApiDocs from './pages/ApiDocs';
import MobileNavbar from './components/MobileNavbar';

function App() {
  return (
    <Router>
      <MobileNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/collect" element={<Collect />} />
        <Route path="/api" element={<ApiDocs />} />
        
        {/* Workspace Routes */}
        <Route path="/workspace" element={<Workspace />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<SpeakerProfile />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<ApiSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

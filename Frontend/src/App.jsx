import { BrowserRouter, Route ,Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";
import RecipePage from "./RecipePage";
import FitnessPage from "./FitnessPage";
import DiyPage from "./DiyPage";
import AiPage from "./AiPage";
import StudyPage from "./StudyPage";
import VideoGallery from './VideoGallery';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/diy" element={<DiyPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Add more routes as needed */}
      </Routes>
    
    </BrowserRouter>
  );
}



export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScanCode from '@/pages/ScanCode/ScanCode';
import LandingPage from '@/pages/LandingPage/LandingPage';
import ReviewScanResult from '@/pages/ReviewScanResult/ReviewScanResult';
import ErrorOnScan from '@/pages/ErrorOnScan/ErrorOnScan';
import Feedback from '@/pages/Feedback/Feedback';
import ContactUs from '@/pages/ContactUs/ContactUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ScanCode" element={<ScanCode />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/:customThemeId" element={<LandingPage />} />
        <Route path="/ReviewScan" element={<ReviewScanResult />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/ErrorOnScan" element={<ErrorOnScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

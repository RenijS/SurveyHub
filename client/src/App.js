import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AnswerSurvey from './components/taker/AnswerSurvey';
import NavBar from './components/NavBar';
import CreateSurvey from './components/creator/CreateSurvey';
import EditSurvey from './components/creator/EditSurvey';
import { useState } from 'react';
import StatsPage from './components/creator/StatsPage';

function App() {

  const [popupActive, setPopupActive] = useState(false);

  return (
    <div className="App">
      <NavBar/>
      {popupActive && <div className='popup'></div>}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surveys/add" element={<CreateSurvey />}/>
          <Route path='/surveys/:id/edit' element={<EditSurvey setPopupActive={setPopupActive} popupActive={popupActive}/>}/>
          <Route path="/surveys/:id/answer" element={<AnswerSurvey />} />
          <Route path='/surveys/:id/analyze' element={<StatsPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

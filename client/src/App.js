import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AnswerSurvey from './components/taker/AnswerSurvey';
import NavBar from './components/NavBar';
import CreateSurvey from './components/creator/CreateSurvey';
import EditSurvey from './components/creator/EditSurvey';
import { useState } from 'react';
import StatsPage from './components/creator/StatsPage';
import Loading from './components/Loading';
import { LoadContext } from './context/LoadContext';


function App() {

  const [popupActive, setPopupActive] = useState(false);

  //info for loading popup, different status: closed, loading, success, error.
  const [loadInfo, setLoadInfo] = useState({status: "closed", msg: ""})

  return (<>
    <div className="App">
      <NavBar/>
      {(loadInfo.status !== "closed") && <Loading loadInfo={loadInfo}/>}
      <LoadContext.Provider value={{setLoadInfo}}>
      <Router>
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/surveys/add" element={<CreateSurvey />}/>
            <Route path='/surveys/:id/edit' element={<EditSurvey setPopupActive={setPopupActive} popupActive={popupActive}/>}/>
            <Route path="/surveys/:id/answer" element={<AnswerSurvey />} />
            <Route path='/surveys/:id/analyze' element={<StatsPage />}/>
        </Routes>
      </Router>
      </LoadContext.Provider>
    </div>
    </>
  );
}

export default App;

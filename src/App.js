import './App.css';
import ApplicantLogin from './Pages/ApplicantLogin';
import ConfirmExam from './Pages/ConfirmExam';
import Route from './Components/Route';
import QuestionsExam from './Pages/QuestionsExam';
import SubmitExam from './Pages/SubmitExam';
import AwaitExamResults from './Pages/AwaitExamResults';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_PAGE_PATH, CONFIRM_PAGE_PATH, QUESTIONS_PAGE_PATH, SUBMIT_PAGE_PATH, WAIT_PAGE_PATH, setUserField } from './store';
import { useEffect } from 'react';
import ExamTimer from './Components/ExamTimer';
import UserUploader from './Effects/UserUploader';
import SubmissionUploader from './Effects/SubmissionUploader';
import useChangePath from './Hooks/useChangePage';

function App() {

  const user = useSelector(state => state.userData);
  const questions = useSelector(state => state.questionsData);

  const userUploader = UserUploader();
  const subUploader = SubmissionUploader();
  const changePage = useChangePath();

  useEffect(() =>
  {
    if(user.id == 0){
      changePage(LOGIN_PAGE_PATH);
    }
  }, []);

  const userHeaderContent = user.id != 0 ? `Logged-in as ${user.email}` : <></>;
  

  const headerContent =
      <div className="headerh1" style={{paddingLeft: 15}}>
        <h1>
          InterviewHub
          <div style={{fontSize: 15}}>{userHeaderContent}</div>
        </h1>
        <h1 className="headerh1" style={{paddingLeft: 20}}>
          {
          (user.id != 0 && user.startedExam && !user.submitedExam) ? 
          <ExamTimer></ExamTimer> : 
          <></>
          }
        </h1>
      </div>
  
  return (
    <div>
      <header className="App-header">
        <div>{headerContent}</div>
      </header>

      <div>
        <Route path={LOGIN_PAGE_PATH}>
          <ApplicantLogin/></Route>
        <Route path={CONFIRM_PAGE_PATH}>
          <ConfirmExam/></Route>
        <Route path={QUESTIONS_PAGE_PATH}>
          <QuestionsExam/></Route>
        <Route path={SUBMIT_PAGE_PATH}>
          <SubmitExam/>
        </Route>
        <Route path={WAIT_PAGE_PATH}>
          <AwaitExamResults/>
        </Route>
      </div>
    </div> 
  );
}

export default App;

import Link from '../Components/Link';
import Question from '../Components/Question';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SUBMIT_PAGE_PATH, 
    selectQuestionAlternative,
} from '../store';
import TryLoadUserSubmission from '../Hooks/TryLoadUserSubmission';
import TryLoadUserQuestions from '../Hooks/TryLoadUserQuestions';
import useSetUserField from '../Hooks/useSetUserField';

function QuestionsExam()
{
    const questionsData = useSelector((state)=> state.questionsData.data);
    const user = useSelector(state => state.userData);
    const submission = useSelector(state=> state.submissionData);
    const loadQuestionsResults = TryLoadUserQuestions();
    const loadSubmissionResults = TryLoadUserSubmission(user, submission);
    const setUserField = useSetUserField();
    const dispatch = useDispatch();
    
    // Setup user answers if has started the exam before
    useEffect(()=>{
        if(user.id == 0) return;
        if(submission.id ==0) return;
        if(!user.startedExam) return;

        submission.answers.map((answer) =>{
            const alternative = {questionId: answer.questionId, answerId: parseInt(answer.answerId), forceSelect: false};
            dispatch(selectQuestionAlternative(alternative));
        })
    }, [submission])
    
    // Setup user if hasn't started the exam before
    useEffect(()=>{
        if(user.id == 0) return;
        if(user.startedExam) return;
        
        const newDate = new Date();
        const startTime = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}-${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;

        setUserField("startedExam", true);
        setUserField("examStartTime", startTime);
        
    }, [user]);

    // Setup of questions content if questions are loaded
    if(questionsData[0].id == 0) return;
    const questionsContent = questionsData.map((qObject) => 
    {
        return <div key={qObject.id} style={{paddingTop: 5}}>
            <div style={{paddingLeft: 15, paddingRight: 15}}>
                <Question data={qObject}/>
            </div>
        </div>
    })
    
    return <div>
        <h3 style={{display: 'flex',  justifyContent:'center', fontSize: 24}}>Questions:</h3>
        {questionsContent}
        <div style={{display: 'flex', justifyContent:'center',paddingTop: 35, heigth: 40}}>
            <Link to={SUBMIT_PAGE_PATH}>
                <button style={{fontSize : `16px`}}>SUBMIT</button>
            </Link>
            <div style={{paddingTop: 55}}></div>
        </div>
    </div>
}

export default QuestionsExam;
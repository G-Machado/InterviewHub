import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSubmissionDirty, useUpdateSubmissionMutation } from '../store';

function SubmissionUploader()
{
    const user = useSelector(state => state.userData);
    const userAnswers = useSelector((state)=>state.submissionData);
    const [updateSubmission, updateResults] = useUpdateSubmissionMutation();
    const dispatch = useDispatch();
    
    // Patches submissionData slice mutation to data base
    useEffect(()=>{
        if(userAnswers.id == 0) return;
        if(!user.startedExam) return;
        if(!userAnswers.isDirty) return;

        updateSubmission(userAnswers);
        dispatch(setSubmissionDirty({value: false}));
    }, [userAnswers]);
}

export default SubmissionUploader;
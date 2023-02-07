import { useDispatch } from "react-redux";
import { selectQuestionAlternative, selectSubmissionAlternative } from "../store";

// Selects an question alternative and dispatch 
// to questionSlice and submissionSlice.
function useSelectAlternative(){

    const dispatch = useDispatch();
    return (alternative) => {
        dispatch(selectQuestionAlternative(alternative));
        dispatch(selectSubmissionAlternative(alternative));
    };
}

export default useSelectAlternative;
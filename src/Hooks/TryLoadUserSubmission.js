import { setupSubmission, 
    useLazyFetchSubmissionQuery
} from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function TryLoadUserSubmission(user, submission)
{
    const [fetchSubmission, results] = useLazyFetchSubmissionQuery();
    const dispatch = useDispatch();
    
    // Dispatch loaded user submission
    useEffect(() => {
        if(user.id == 0) return;
        if(submission.id != 0) return;

        if(results.isUninitialized) 
        {
            fetchSubmission(user);
            return;
        }

        if(results.isFetching ||
            results.isLoading ||
            results.error) return;

        dispatch(setupSubmission(results.data[0]));
        // console.log('dispatched submission to slice');
        // console.log(results.data[0]);
    });

}

export default TryLoadUserSubmission;
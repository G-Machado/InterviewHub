import { QUESTIONS_PAGE_PATH, WAIT_PAGE_PATH } from '../store';
import useChangePage from '../Hooks/useChangePage';
import InfoForm from '../Components/InfoForm';

function SubmitExam()
{
    return <div>
        <InfoForm infoTag='confirm_submit' confirmPath={WAIT_PAGE_PATH} returnPath={QUESTIONS_PAGE_PATH}></InfoForm>
    </div>
}

export default SubmitExam;
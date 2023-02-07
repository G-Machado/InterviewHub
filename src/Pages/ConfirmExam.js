import InfoForm from '../Components/InfoForm';
import { QUESTIONS_PAGE_PATH } from '../store';

function ConfirmExam()
{
    return <div>
        <InfoForm infoTag='confirm_exam' confirmPath={QUESTIONS_PAGE_PATH}></InfoForm>
    </div>
}

export default ConfirmExam;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useSelectAlternative from "../Hooks/useSelectAlternative";
import { selectQuestionAlternative } from "../store";

function Question({data})
{
    const [loadedAnswer, setLoadedAnswer] = useState(data.userAnswerId);
    const [userAnswer, setUserAnswer] = useState(0);
    const dispatch = useDispatch();
    const selectAlternative = useSelectAlternative();

    useEffect(() => {
        if(userAnswer == 0) return; // stops from selecting 0
        selectAlternative({questionId: data.id, answerId: userAnswer});
    }, [userAnswer]);

    useEffect(() => {
        if(loadedAnswer == 0) return; // stops from selecting 0
        dispatch(selectQuestionAlternative({questionId: data.id, answerId: userAnswer}));
    }, [loadedAnswer]);

    // Updates the current selected answer with user onclick alternative input
    const handleSetUserAnswer = (alternative) =>
    {
        setUserAnswer(alternative.id);
    }

    // Displays the content of the alternatives and connects to 'handleSetUserAnswer'
    const alternativesContent = data.alternatives.map((alternative) =>
    {
        const selectionStyle = data.userAnswerId == alternative.id ? {backgroundColor: '#282c3451'} : {backgroundColor: '#ffffff'}
        const content = <div 
            className="box"
            style={selectionStyle}
            onClick={() => handleSetUserAnswer(alternative)} 
            key={alternative.id}>{alternative.answer}
        </div>
        return content;
    });

    return <div className="box" >
        <div style={{paddingLeft: 15}}>{data.question}</div>
        <div style={{paddingTop: 10}}>
            {alternativesContent}
        </div>
        
    </div>
}

export default Question;
import { useFetchQuestionsQuery } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setUserField, 
    loadQuestionsData,
    useLazyFetchQuestionsQuery
 } from "../store";
import { useEffect, useState } from "react";

function TryLoadUserQuestions()
{
    const dispatch = useDispatch();
    const [fetchQuestions, results] = useLazyFetchQuestionsQuery();
    const user = useSelector(state => state.userData);
    const questions = useSelector(state => state.questionsData)
    
    // Filter and dispatch loaded user questions after fetch sucess
    useEffect(() => {

        if(questions.data[0].id != 0) return; // this means is already loaded
        if(!user || user.id == 0) return;

        if(results.isUninitialized)
        {
            fetchQuestions();
            return;
        }
        
        if(!results.isSuccess || 
            results.isUninitialized ||
            results.isFetching) return;
            
        let filteredQuestions = [];
        results.data.map((question) =>
        {
            user.questionsId.map((id) => {
                if(id == question.id) 
                {
                    filteredQuestions.push(question);
                }
            });
        })
    
        dispatch(loadQuestionsData(filteredQuestions));
        // console.log('loaded filtered questions to slice');
        // console.log(filteredQuestions);
    });
}

export default TryLoadUserQuestions;
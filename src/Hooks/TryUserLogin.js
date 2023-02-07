import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeUser } from "../store";
import { 
    useLazyFetchUserQuery
} from "../store";
import TryLoadUserQuestions from '../Hooks/TryLoadUserQuestions';

function TryUserLogin()
{
    const dispatch = useDispatch();
    const [loginInput, setLoginInput] = useState('');
    const [fetchUser, results] = useLazyFetchUserQuery();
    const user = useSelector(state=>state.userData);
    
    // Handles data fetched from data base
    useEffect(() => {
        if(user.id != 0) return; // this means user is already logged
        if(loginInput == '') return;
        if(!results.isSuccess ||  
            results.isUninitialized || 
            results.isFetching) return;
        
        if(results.data.length <= 0){
            return;
        }

        dispatch(changeUser(results.data[0]));
        // console.log(`login validated, user dispatched`);
        // console.log(results.data[0]);

    }, [results])

    // Returns the function to start login fetching process
    return [(loginInput) => {
        setLoginInput(loginInput);
        fetchUser(loginInput);
    }, results];
}

export default TryUserLogin;
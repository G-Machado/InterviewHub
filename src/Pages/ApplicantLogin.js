import { useEffect } from 'react';
import { useState } from 'react';
import { 
    CONFIRM_PAGE_PATH, 
    QUESTIONS_PAGE_PATH, 
    WAIT_PAGE_PATH 
} from '../store';
import { currentTimeLeft } from '../Components/ExamTimer';

import useChangePage from '../Hooks/useChangePage';
import TryUserLogin from '../Hooks/TryUserLogin';

function ApplicantLogin()
{
    const [loginError, setLoginError] = useState(false);
    const [loginInput, setLoginInput] = useState('');
    const [loginSubmit, setLoginSubmit] = useState('');

    const [doFetchLogin, loginResults] = TryUserLogin(loginSubmit);
    
    const inputStyle = loginError ? 
        {borderColor: `#da4242`,  
         display: "flex", 
         justifyContent: "center"} : 
        {borderColor: `#7caaf0`,
         display: "flex", 
         justifyContent: "center"}
    const changePage = useChangePage();

    // Updates loginInput to latest user input 
    const handleLoginInputChange = (event)=>
    {
        setLoginInput(event.target.value);
        if(loginError) setLoginError(false);
    }

    // Updates loginSubmit, which triggers useFetchUserQuery again
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        setLoginSubmit(loginInput);
        doFetchLogin(loginInput);
    }

    // Validates user after login
    const validateLogin = (user) =>
    {
        if(user.submitedExam)
        {
            changePage(WAIT_PAGE_PATH);
        }
        else if(user.startedExam)
        {
            console.log(currentTimeLeft(user));
            if(currentTimeLeft(user) <= 0)
            {
                changePage(WAIT_PAGE_PATH);
            }
            else
            {
                changePage(QUESTIONS_PAGE_PATH);
            }
        }
        else // If no exceptions, load normal user flow to confirm
        {
            changePage(CONFIRM_PAGE_PATH);
        }
    }

    // Handle data coming from data base 
    useEffect(()=>{
        if(loginSubmit == '') return;
        if(!loginResults.isSuccess ||  
            loginResults.isUninitialized || 
            loginResults.isFetching) return;

        if(loginResults.data.length <= 0)
        {
            setLoginError(true);
        }
        else
        {
            validateLogin(loginResults.data[0]);
        }
    }, [loginResults]);

    return <div className="centerForm">
        <div className="centerScreen" style={{display: `inline-block`}}>
        <form onSubmit={handleSubmit} className="car-form panel">
            <div className='field-group' style={{display: 'flex', justifyContent: 'center'}}>
                <div >
                    <label>Please enter provided code:</label>
                    <input
                        style={inputStyle}
                        className="input is-xpanded"
                        value={loginInput}
                        onChange={handleLoginInputChange}
                    ></input>
                </div>
            </div>
            <div className="field" style={{paddingTop: 10, display: "flex", justifyContent: "center"}}>
                <button style={{buttonSize: 30, fontSize : `20px`}}>LOGIN</button>
            </div>
        </form>
        </div>
    </div>
}

export default ApplicantLogin;
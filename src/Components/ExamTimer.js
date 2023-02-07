import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useChangePage from "../Hooks/useChangePage";
import { WAIT_PAGE_PATH } from "../store";

// Calculates and returns total exam time left in seconds
const currentTimeLeft = (user)=> {
       
    const date = new Date();
    const startTime = user.examStartTime;
    
    // Parse exam start time
    const startHour = parseInt(startTime.split("-")[1].split(":")[0]);
    const startMinute = parseInt(startTime.split("-")[1].split(":")[1]);
    const startSecond = parseInt(startTime.split("-")[1].split(":")[2]);
    const startDay = parseInt(startTime.split("-")[0].split("/")[0]);
    
    // Calculates time spent
    const deltaSeconds = date.getSeconds() < startSecond ? date.getSeconds() : date.getSeconds() - startSecond;
    const deltaMinutes = date.getMinutes() < startMinute ? date.getMinutes() : date.getMinutes() - startMinute;
    const deltaHours = date.getHours() < startHour ? date.getHours() : date.getHours() - startHour;
    const deltaDays =  date.getDate() < startDay ? date.getDate() : date.getDate() - startDay;
    
    // Calculates time left in seconds subtracting from exam duration in seconds
    const examDuration = 30 * 60;       // TODO -> fetch exam duration by user.exam.duration
    const deltaTime = deltaSeconds + deltaMinutes * 60 + deltaHours * 3600;
    let timeLeft = examDuration - deltaTime;

    // If more than one day has passed, the time left is definitely over
    if(deltaDays > 0) 
    {
        timeLeft = -1;
    }

    return timeLeft;
}

function ExamTimer()
{
    const [date, setDate] = useState(new Date());
    const user = useSelector(state => state.userData);

    // Calculates exam time left and converts to display format
    const timeLeft = currentTimeLeft(user);
    
    const hoursLeftText = parseInt(timeLeft/3600) < 10 ? `0${parseInt(timeLeft/3600)}`: parseInt(timeLeft/3600);
    const minutesLeftText = parseInt(timeLeft/60) < 10 ? `0${parseInt(timeLeft/60)}`: parseInt(timeLeft/60);
    const secondsLeftText = parseInt(timeLeft%60) < 10 ? `0${parseInt(timeLeft%60)}`: parseInt(timeLeft%60);
    let timeLeftDisplay = `${hoursLeftText}:${minutesLeftText}:${secondsLeftText}`;

    // Updates component every second
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date);
        }, 1000);
        
        // Check if time left is over and change path
        if(timeLeft < 0) 
        {
            changePage(WAIT_PAGE_PATH);
        }

        return () => clearInterval(interval);
    }, [date]);
    
    const changePage = useChangePage();
    

    return <div style={{display: 'block'}}>{timeLeftDisplay}</div>
}

export default ExamTimer;
export {currentTimeLeft};
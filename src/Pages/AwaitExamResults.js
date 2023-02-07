import { useSelector } from "react-redux";
import useSetUserField from '../Hooks/useSetUserField';
import { useEffect } from "react";
import { Text } from 'react-native-web';

function AwaitExamResults()
{
    const user = useSelector((state) => state.userData);
    const setUserField = useSetUserField();

    // Modifies the user as submitedExam when enter page
    useEffect(() => {
        if(!user.submitedExam)
        {
            setUserField("submitedExam", true);
        }
    }, []);

    return <div style={ { padding: 15, paddingLeft: 20 }}>
        <Text style={{fontSize: 23}}>
            {`Your answers were submitted sucessfully !\nPlease wait for further contact.`}
        </Text>
    <div style={{ paddingTop: 10}}>
        <div style={{ border: '2px solid color:#282c3451', borderRadius: 20, padding: 5, backgroundColor: '#282c3451' }}>
            <h2 style={{padding : 10}}>{`Best of luck! HR Team`}</h2>
        </div>
        <div style={{paddingTop: 15, 
            display: "flex", 
            justifyContent: "center", 
            }}>
        </div>
    </div>
    </div>
}

export default AwaitExamResults;
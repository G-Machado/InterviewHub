import Link from '../Components/Link';
import { Text } from 'react-native-web';
import { useFetchTextQuery } from '../store';

function InfoForm({infoTag, returnPath, confirmPath})
{
    const {data, error, isLoading} = useFetchTextQuery(infoTag);
    if(isLoading || error) return; // Waits until text is fetched

    const formHeader = 
        <div style={{paddingLeft: 15}}>
            {data[0].header}
        </div>

    const confirmContent = 
        <div>
            {data[0].text}
        </div>

    // Check if InfoForms was initialized with returnPath,
    // if so create return button link
    const canReturnButton = 
        returnPath != undefined?
        <Link to={returnPath}>
            <button style={{fontSize : `16px`}}>RETURN</button>
        </Link> 
        : <></>

    return <div style={ { padding: 15, paddingLeft: 20 }}>
        <Text style={{fontSize: 18}}>
            {formHeader}
        </Text>
        <div style={{ paddingTop: 10}}>
            <div style={{ border: '2px solid color:#282c3451', borderRadius: 20, padding: 15, backgroundColor: '#282c3451' }}>
                <Text style={{fontSize: 18, color: '#444444'}}>{confirmContent}</Text>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", paddingTop: 15}}>
            {canReturnButton}
            <Link to={confirmPath}>
                <button style={{fontSize : `16px`}}>CONFIRM</button>
            </Link>
        </div>
    </div>
}

export default InfoForm;
import { useDispatch } from "react-redux";
import { setUserField } from "../store";

// Change a field from userData
function useSetUserField(){
    const dispatch = useDispatch();
    return (key, value) => {
        dispatch(setUserField({key:key, value:value}))
    };
}

export default useSetUserField;
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserField, useUploadUserMutation } from '../store';
import useSetUserField from "../Hooks/useSetUserField";

function UserUploader()
{
    const [uploadUser, updateUserResults] = useUploadUserMutation();
    const user = useSelector((state)=> state.userData);
    const setUserField = useSetUserField();

    // Patches userData slice mutation to data base
    useEffect(()=>{
        if(user.id == 0) return;
        if(!user.isDirty) return;

        uploadUser(user);
        setUserField("isDirty", false);
    }, [user]);

}

export default UserUploader;
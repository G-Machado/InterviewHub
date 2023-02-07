import { useDispatch } from "react-redux";
import { loadPath } from "../store";

// Change the page to 'newPath'
function useChangePage(){
    const dispatch = useDispatch();
    return (newPath) => dispatch(loadPath(newPath));
}

export default useChangePage;
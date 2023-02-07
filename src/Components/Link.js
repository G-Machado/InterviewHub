 import { useDispatch } from "react-redux";
 import { loadPath } from "../store";

 // Creates an automatic link that dispatches the new path when user clicks the component
 function Link({to, children, style})
 {
    const dispatch = useDispatch();
    const handleClick = (event) =>
    {
        event.preventDefault();
        dispatch(loadPath(to));
    }
    
    return <div style={style}>
        <a onClick={handleClick}>{children}</a>
    </div>
 }

 export default Link;
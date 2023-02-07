import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Component that renders the children regarding the currentPath 
function Route({children, path})
{
    const currentPath = useSelector((state) => {
        return state.navigation.currentPath;
    })
    
    if(path == currentPath)
    {
        return children;
    }
    return;
}

export default Route;
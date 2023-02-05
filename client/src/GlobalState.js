import React, {createContext,useEffect,useState } from "react";
import axios from "axios";
import AdminAPI from "./api/AdminAPI";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext()
export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)

    const refreshToken=async ()=>{
        const res =await axios.get('/admin/refresh_token')
       setToken(res.data.accesstoken)
    }
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])

    const state={
        token:[token,setToken],
        adminAPI:AdminAPI(token),
        userAPI:UserAPI(token)
    }
    return(
        
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
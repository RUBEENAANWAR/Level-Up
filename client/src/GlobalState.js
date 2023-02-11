import React, {createContext,useEffect,useState } from "react";
import axios from "axios";
import AdminAPI from "./api/AdminAPI";
import UserAPI from "./api/UserAPI";
import TutorAPI from './api/TutorAPI'

export const GlobalState = createContext()
export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)

    const refreshToken=async ()=>{
        const res =await axios.get('/admin/refresh_token')
       setToken(res.data.accesstoken)
    }

    const userRefreshToken=async ()=>{
        const res =await axios.get('/user/refresh_token')
       setToken(res.data.accesstoken)
    }

    
    const tutorRefreshToken=async ()=>{
        const res =await axios.get('/tutor/refresh_token')
       setToken(res.data.accesstoken)
    }

    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        const studentLogin=localStorage.getItem('studentLogin')
        const tutorLogin=localStorage.getItem('tutorLogin')


        if(firstLogin) refreshToken()
        if(studentLogin) userRefreshToken()
        if(tutorLogin) tutorRefreshToken()
    },[])

    const state={
        token:[token,setToken],
        adminAPI:AdminAPI(token),
        userAPI:UserAPI(token),
        tutorAPI:TutorAPI(token)
    }
    return(
        
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
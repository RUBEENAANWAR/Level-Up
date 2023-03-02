
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import NotFound from '../../adminMainPages/utils/not_found/NotFound';
import './StudentMarks.css'

const Marks=()=>{
    const state=useContext(GlobalState)
    const [marks,setMarks]=useState([])
    
    const fetchMarks=async()=>{
        const tutor=await axios.get('tutor/refresh_token')
        const studentMarks=tutor.data.marks
        console.log(studentMarks);
        setMarks(studentMarks)
    }
    
    useEffect(()=>{
        fetchMarks()
    },[])

    const handleUpdate = async () => {
        try {
            const res = await axios.put('tutor/update_marks', { marks })
            setMarks(res.data.marks)
            alert("Marks updated successfully!")
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

   return(
    <div className='main-div'>
        <div className="marks-container">
            <button className="update-button" onClick={handleUpdate}>Update</button>
            <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th> Grade</th>
                    <th> Subject</th>
                    <th>Marks</th>    
                  </tr>
                </thead>
                <tbody>
                  {marks.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.grade}</td>
                      <td>{data.subject}</td>
                      <td>{data.marks}</td>
                    </tr>
                  ))}
                </tbody>   
            </table>
        </div>
    </div>
   ) 
}

export default Marks;

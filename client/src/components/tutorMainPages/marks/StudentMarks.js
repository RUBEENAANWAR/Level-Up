import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import './StudentMarks.css'

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [student, setStudent] = useState([]);
  
  const fetchMarks = async () => {
    const tutor = await axios.get('tutor/refresh_token');
    const studentMarks = tutor.data.marks;
    const userDetails = tutor.data.userDetails;
    console.log("hii",tutor.data)
    setStudent(userDetails);
    setMarks(studentMarks);
  };
  
  useEffect(() => {
    fetchMarks();
  }, []);

 
  return (
    <div className="main-div">
      <div className="marks-container">
       <Link to="/updateMarks"><button className="update-button">
          Update
        </button></Link> 
        <h1>{marks.subject}</h1>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
             
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>

  {marks.map((data, index) => (
    <tr key={index}>
      <td>{data.name}</td>
      <td>{data.grade}</td>
      <td style={{color:"red"}}>{data.marks}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
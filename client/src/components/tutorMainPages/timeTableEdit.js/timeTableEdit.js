import React, { useContext, useState, useEffect } from 'react';
import './timeTableEdit.css';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import NotFound from '../../adminMainPages/utils/not_found/NotFound';
import { useNavigate, useParams } from "react-router-dom";


const initialState={
  day:"",
  time:"",
  subject:"",
  grade:""
}

const Timetable = () => {
  const state = useContext(GlobalState);
  const [timeTable, setTimeTable] = useState([]);
  
  // fetch timetable data from the server
  const fetchTimeTable = async () => {
    const tutor = await axios.get('tutor/refresh_token');
    const tTable = tutor.data.timeTable;
    console.log(tTable);
    setTimeTable(tTable);
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);
  
  // function to handle the update button click
  const handleUpdate = async () => {
    try {
      const updatedTimeTable = await axios.put('tutor/timetableupdate', timeTable);
      console.log(updatedTimeTable);
    } catch (error) {
      console.log(error);
    }
  };
  
  // sort the timetable data by day of the week
  const sortedTable = timeTable.sort((a, b) => {
    const daysOfWeek = ['sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'saturday'];
    return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
  });

  return (
    <div className='main-div'>
      <div className='timetable-container'>
        <button className='update-button' onClick={handleUpdate}>
          Update
        </button>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th> Day</th>
              <th> Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {sortedTable.map((data, index) => (
              <tr key={index}>
                <td>{data.time}</td>
                <td>{data.day}</td>
                <td>{data.subject}</td>
                <td>{data.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;

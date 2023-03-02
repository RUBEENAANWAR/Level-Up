import React, { useContext, useState, useEffect } from 'react';
import './TimeTable.css';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import NotFound from '../../adminMainPages/utils/not_found/NotFound';

const Timetable = () => {
  const state = useContext(GlobalState);
  const [timeTable, setTimeTable] = useState([]);
  const fetchTimeTable=async()=>{
    const tutor= await axios.get("tutor/refresh_token")
    const tTable=tutor.data.timeTable
    console.log(tTable);
    setTimeTable(tTable)
  };
  useEffect(() => {
    fetchTimeTable();
  }, []);
  const sortedTable = timeTable.sort((a, b) => {
    const daysOfWeek = ["sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","saturday"];
    return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
  });
  return (
    <div className='main-div'>
    <div className="timetable-container">
<button className="update-button">Update</button>
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
}
export default Timetable;
  

  // const [formData, setFormData] = useState({
  //   time: '',
  //   day: '',
  //   subject: '',
  //   grade: ''
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post('/timetable', formData);
  //     setTimeTable(res.data.timeTable);
  //     setFormData({
  //       time: '',
  //       day: '',
  //       subject: '',
  //       grade: ''
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const getTimeTable = async () => {
  //     try {
  //       const res = await axios.get('/timetable');
  //       setTimeTable(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getTimeTable();
  // }, []);

  //  let timetableData = timeTable.map((data, index) => ({
  //   time: data.time,
  //   day: data.day,
  //   subject: data.subject,
  //   grade: data.grade
  // }))
//   return (
//     <div className="timetable">
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
//         <input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="Day" required />
//         <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
//         <input type="text" name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" required />
//         <button type="submit">Add</button>
//       </form>
//       <table>
//         {/* table headers here */}
//         <tbody>
//           {timetableData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.time}</td>
//               <td>{data.day}</td>
//               <td>{data.subject}</td>
//               <td>{data.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

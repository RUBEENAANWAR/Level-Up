// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import NotFound from "../../adminMainPages/utils/not_found/NotFound";
// import { GlobalState } from "../../../GlobalState";
// import "./TutorViewStds.css";

// const TutorViewStds = () => {
//   const state = useContext(GlobalState);
//   console.log(state);
//   const {isTutorLogged,isTutor} = state.tutorAPI

//   const [allUsers, setAllUsers] = useState([]);
//   const [tutorDetails, setTutorDetails] = useState([]);
//   console.log(isTutorLogged,isTutor);

//   function LoggedRouter() {
//     const GetUsers = async (e) => {
//       try {
//         const res = await axios.get("/user/refresh_token");
//         setAllUsers(res.data.users);
//         setTutorDetails(res.data.tutorDetails);
//       } catch (err) {
//         console.log(err.response.data.msg, "error");

//         // Swal.fire({
//         //   text: err.response.data.msg,
//         //   confirmButtonColor: "#b8121b",
//         // });
//       }
//     };

//     useEffect(() => {
//       GetUsers();
//     }, []);
//     return (
//       <div className="table-container">
//         {/* <h3>Class Teacher:{tchrDetails.name}</h3> */}

//         <h1 className="stdHeading">Class:{tutorDetails.grade}</h1>
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Ad.No</th>

//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allUsers.map((user) => (
//               <tr key={user._id}>
//                 <img
//                   src={`http://localhost:3000/public/images/${user?.avatar}`}
//                   alt={user.name}
//                 />
//                 <td>{user.studentId}</td>

//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.mobile}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
//   return <>{isTutor && isTutorLogged ? LoggedRouter() : NotFound()}</>;
// };

// export default TutorViewStds;
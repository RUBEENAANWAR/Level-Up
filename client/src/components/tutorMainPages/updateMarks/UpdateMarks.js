import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UpdateMarks.css";
import { GlobalState } from "../../../GlobalState";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { margin } from "@mui/system";

const initialState = {
  // tutorId: "",
  name: "",
  grade: "",
  subject: "",
  marks: "",
};

function UpdateMarks() {
  const [marks, setMarks] = useState(initialState);
  const navigate = useNavigate();
  const params = useParams();
  const state = useContext(GlobalState);
  const [isTutorLogged, setIsTutorLogged] = state.tutorAPI.isTutorLogged;
  const [isTutor, setIsTutor] = state.tutorAPI.isTutor;
  const details = state.tutorAPI.tutorDetails;
  console.log("details", details._id);

  // } else {
  //   setMarks(initialState);
  // }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setMarks(prev => ({ ...prev, [name]: value }));
    console.log(marks,name)
    // setEvent((ev) => ({
    //   ...ev,
    //   [key]: value,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formdata = new FormData();
    // formdata.append("name", marks.name);
    // formdata.append("subject", marks.subject);
    // formdata.append("grade", marks.grade);
    // formdata.append("marks", marks.marks);

    try {
      //await axios.put(`/tutor/updateMarks/${tutor.tutorId}`,formdata)
      console.log("marks",marks);
      const response = await axios.put(
        `/tutor/updateMarks/${details._id}`,
        marks
      );
      console.log("this is response",response)
      Swal.fire({
        title: "Success!",
        text: "Marks have been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/studentMarks");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to update marks.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
          <th>Subject</th>
            <th>Student</th>
            <th>Grade</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>
              <input
                type="text"
                name="subject"
                value={marks.subject}
                onChange={handleChangeInput}
              />
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={marks.name}
                onChange={handleChangeInput}
              />
            </td>
            <td>
              <input
                type="text"
                name="grade"
                value={marks.grade}
                onChange={handleChangeInput}
              />
            </td>
            <td>
              <input
                type="text"
                name="marks"
                value={marks.marks}
                onChange={handleChangeInput}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}

export default UpdateMarks;

import { useState } from "react";
import Student from "./Student";

function Diaplay() {
  const [students] = useState([
    { id: 1, name: "Ravi", department: "CSE", marks: 85 },
    { id: 2, name: "Priya", department: "ECE", marks: 45 },
    { id: 3, name: "Arjun", department: "MECH", marks: 72 },
    { id: 4, name: "Sneha", department: "IT", marks: 92 },
    { id: 5, name: "Kiran", department: "CIVIL", marks: 38 },
  ]);
  const [filter, setFilter] = useState("all");
  let filteredStudents = students;
  if (filter === "below50") {
    filteredStudents = students.filter((s) => s.marks < 50);
  } else if (filter === "above80") {
    filteredStudents = students.filter((s) => s.marks > 80);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student List</h2>
      <button onClick={() => setFilter("all")}>All Students</button>{" "}
      <button onClick={() => setFilter("below50")}>Marks &lt; 50</button>{" "}
      <button onClick={() => setFilter("above80")}>Marks &gt; 80</button>
      <br />
      <br />
      <Student students={filteredStudents} />
    </div>
  );
}

export default Diaplay;

function Student(props) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.department}</td>
            <td>{s.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Student;

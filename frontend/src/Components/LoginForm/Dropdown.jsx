const Dropdown = ({ value, onChange }) => {
  return (
    <>
      <select value={value} onChange={onChange}>
        <option value="scouter">Scouter</option>
        <option value="coach">Coach</option>
        <option value="technical-analyst">Technical analyst</option>
        <option value="other">Other</option>
      </select>
    </>
  );
};

export default Dropdown;

import { useState, useEffect } from "react";

const initialGradeData = [
  { assignmentName: "Quiz", mark: 80, weight: 10 },
  { assignmentName: "Assignment", mark: 75, weight: 15 },
  { assignmentName: "Midterm", mark: 70, weight: 30 },
];

function App() {
  const [currentGradeData, setCurrentGradeData] = useState(initialGradeData);
  const [currentOverallMark, setCurrentOverallMark] = useState(73.182);
  const [markToBeObtained, setMarkToBeObtained] = useState();
  const [targetGrade, setTargetGrade] = useState(50);
  const [totalCurrentWeight, setTotalCurrentWeight] = useState(0);

  useEffect(() => {
    calculateCurrentAverageAndMarkToBeObtained(currentGradeData);
  });

  const addRow = () => {
    const newRow = { assignmentName: "New assessment", mark: 75, weight: 10 };
    const newArr = [...currentGradeData];
    newArr.push(newRow);
    setCurrentGradeData(newArr);
  };

  const deleteRow = () => {
    if (currentGradeData.length > 0) {
      const newGradesArr = currentGradeData.slice(
        0,
        currentGradeData.length - 1
      );
      setCurrentGradeData(newGradesArr);
    }
  };

  const calculateCurrentAverageAndMarkToBeObtained = (data) => {
    let weightedGrade = 0;
    let currentGrade = 0;
    let totalCurrentWeightTemp = 0;
    let targetGradeTemp;
    let targetGradeRounded;

    // calculating current grade percentage
    data.forEach((assessment) => {
      if (assessment.weight) {
        weightedGrade += (assessment.mark * parseInt(assessment.weight)) / 100;
        totalCurrentWeightTemp += parseInt(assessment.weight);
      }
      if (totalCurrentWeightTemp === 0) {
        currentGrade = 0;
      } else currentGrade = (weightedGrade / totalCurrentWeightTemp) * 100;
    });
    // calculating the grade to be obtained
    if (totalCurrentWeightTemp < 100) {
      targetGradeTemp =
        ((targetGrade - weightedGrade) / (100 - totalCurrentWeightTemp)) * 100;
      targetGradeRounded = Math.round(targetGradeTemp * 1000) / 1000;
    }

    setMarkToBeObtained(targetGradeRounded);
    let currentGradeRounded = Math.round(currentGrade * 1000) / 1000;
    setCurrentOverallMark(currentGradeRounded);
    setTotalCurrentWeight(totalCurrentWeightTemp);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...currentGradeData];
    list[index][name] = value;
    setCurrentGradeData(list);
  };

  return (
    <div className="flex-container">
      <div className="grades-col-left flex-col">
        <h2 className="text">
          {" "}
          Add the work you've done in class
          <span className="btn-container">
            <button className="add-btn" onClick={addRow}>
              {" "}
              +{" "}
            </button>
            <button className="rmv-btn" onClick={deleteRow}>
              {" "}
              -{" "}
            </button>
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Mark (%) </th>
              <th> Weight (%)</th>
            </tr>
          </thead>
          <tbody>
            {currentGradeData.map((gradeData, index) => {
              const { assignmentName, mark, weight } = gradeData;
              return (
                <tr key={index}>
                  <td>
                    {" "}
                    <input
                      className="name-input"
                      type="text"
                      onChange={(e) => handleChange(index, e)}
                      value={assignmentName}
                      name="assignmentName"
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="number"
                      onChange={(e) => handleChange(index, e)}
                      value={mark}
                      name="mark"
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="number"
                      onChange={(e) => handleChange(index, e)}
                      value={weight}
                      name="weight"
                    />{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="results-col-right flex-col">
        <h2 className="text">
          {" "}
          Your current mark is{" "}
          <span className="number-bold"> {currentOverallMark}% </span>{" "}
        </h2>
        <h2 className="text">
          {" "}
          To get a{" "}
          <input
            className="desired-grade-input"
            type="number"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
          />
          % in the class, you need a{" "}
          <span className="number-bold"> {markToBeObtained}% </span> on your
          final{" "}
        </h2>
        <h2 className="text over-100">
          {" "}
          {totalCurrentWeight >= 100
            ? "Your total weight is over 100%"
            : ""}{" "}
        </h2>{" "}
        <br />
        <h1
          className={
            markToBeObtained > 100
              ? "text drop-course"
              : markToBeObtained < 0
              ? "text aced-it"
              : "text"
          }
        >
          {" "}
          {markToBeObtained > 100
            ? "It is strongly advised that you drop this course"
            : markToBeObtained < 0
            ? "YOU ACED IT"
            : ""}
        </h1>
      </div>
    </div>
  );
}

export default App;

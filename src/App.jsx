import { useState } from "react";
import "./App.css";

const YearInput = ({ value, onChange, onBlur }) => {
  return (
    <div id="year_input" className="input-field">
      <label>
        <span id="Year_label">Year</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Added onBlur for validation
        id="year"
        placeholder="YYYY"
        max={new Date().getFullYear()}
      />
      <span id="yearErrorMsg"></span> {/* Added error message span */}
    </div>
  );
};

const MonthInput = ({ value, onChange, onBlur }) => {
  return (
    <div id="month_input" className="input-field">
      <label>
        <span id="Month_label">Month</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Added onBlur for validation
        id="month"
        placeholder="MM"
        min="1"
        max="12"
      />
      <span id="monthErrorMsg"></span> {/* Added error message span */}
    </div>
  );
};

const DayInput = ({ value, onChange, onBlur }) => {
  return (
    <div id="day_input" className="input-field">
      <label>
        <span id="Day_label">Day</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Added onBlur for validation
        id="day"
        placeholder="DD"
        min="1"
        max="31"
      />
      <span id="dayErrorMsg"></span> {/* Added error message span */}
    </div>
  );
};

const Result = ({ age }) => {
  return (
    <div className="result">
      <div>
        <span>{age?.years || "--"}</span> years
      </div>
      <div>
        <span>{age?.months || "--"}</span> months
      </div>
      <div>
        <span>{age?.days || "--"}</span> days
      </div>
    </div>
  );
};

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState(null);

  const validateInputs = () => {
    const dayValid = validateDayInput();
    const monthValid = validateMonthInput();
    const yearValid = validateYearInput();

    return dayValid && monthValid && yearValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      return; // Early exit if validation fails
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        0
      ).getDate();
      days += previousMonth;
      months--;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="calculator-container">
        <div className="input-group">
          <DayInput
            value={day}
            onChange={(e) => setDay(e.target.value)}
            onBlur={validateDayInput}
          />
          <MonthInput
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            onBlur={validateMonthInput}
          />
          <YearInput
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onBlur={validateYearInput}
          />
        </div>
        <button className="calculate-btn" onClick={calculateAge}>
          <img src="./src/icon-arrow.svg" />
        </button>


      <Result age={age} />
    </div>
  );
}

function validateDayInput() {
  const dayInputElement = document.getElementById("day");
  const errorElement = document.getElementById("dayErrorMsg");
  const inputValue = parseInt(dayInputElement.value);
  const min = parseInt(dayInputElement.min);
  const max = parseInt(dayInputElement.max);

  if (inputValue < min || inputValue > max) {
    errorElement.textContent = `Must be a valid day.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}

function validateMonthInput() {
  const monthInputElement = document.getElementById("month");
  const errorElement = document.getElementById("monthErrorMsg");
  const inputValue = parseInt(monthInputElement.value);
  const min = parseInt(monthInputElement.min);
  const max = parseInt(monthInputElement.max);

  if (inputValue < min || inputValue > max) {
    errorElement.textContent = `Must be a valid month.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}

function validateYearInput() {
  const yearInputElement = document.getElementById("year");
  const errorElement = document.getElementById("yearErrorMsg");
  const inputValue = parseInt(yearInputElement.value);
  const max = parseInt(yearInputElement.max);

  if (inputValue > max) {
    errorElement.textContent = `Must be in the past.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}

export default App;

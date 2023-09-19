// Create Data table instance
new DataTable("#data-lab");

// Timer
function displayTimeAndDate() {
  const now = new Date();

  // Get the day of the week as a three-letter abbreviation (e.g., "Fri")
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[now.getDay()];

  // Get the day of the month
  const dayOfMonth = now.getDate();

  // Get the month as a three-letter abbreviation (e.g., "Sep")
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[now.getMonth()];

  // Format the time
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Create the final date-time string
  const dateTimeString = `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${minutes}`;

  // Update the content of the "datetime" div with the current date and time
  document.getElementById("timer").textContent = dateTimeString;
}

// Loads Options Data from json file
const loadDatas = () => {
  // Make an AJAX request to load the JSON file
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the JSON response
      const response = JSON.parse(xhr.responseText);

      // Get the select elements
      const selectDate = document.getElementById("data-for-date");
      const selectLab = document.getElementById("data-for-lab");
      const selectRelease = document.getElementById("data-for-release");

      response.date.forEach((date) => {
        const dateSelect = document.createElement("option");
        dateSelect.value = date.value;
        dateSelect.textContent = date.label;
        selectDate.appendChild(dateSelect);
      });

      // Add an event listener to the date dropdown to trigger actions on change
      selectDate.addEventListener("change", () => {
        const selectedValue = selectDate.value;

        // Use a switch case statement to perform actions based on the selected value
        switch (selectedValue) {
          case "last30":
            console.log("Fetching data for the last 30 days...");
            // Call your fetch function for the last 30 days
            break;
          case "last7":
            console.log("Fetching data for the last 7 days...");
            // Call your fetch function for the last 7 days
            break;
          default:
            console.log("Invalid selection or no action defined.");
            break;
        }
      });

      // Populate Lab Name options from the "lab-name" array in the JSON
      response["lab-name"].forEach((lab) => {
        const labOption = document.createElement("option");
        labOption.value = lab;
        labOption.textContent = lab;
        selectLab.appendChild(labOption);
      });

      // Populate Release options from the "options" array in the JSON
      response.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectRelease.appendChild(optionElement);
      });
    }
  };
  xhr.open("GET", "lab-data.json", true);
  xhr.send();
};

// Call Functions
loadDatas();
displayTimeAndDate();
setInterval(displayTimeAndDate, 60000);

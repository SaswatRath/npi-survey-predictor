document.getElementById("getDoctors").addEventListener("click", function () {
    let time = document.getElementById("timeInput").value;
    let resultDiv = document.getElementById("result");
    let downloadBtn = document.getElementById("downloadCSV");

    // Validate input (should be in HHMM format)
    if (!/^\d{4}$/.test(time)) {
        resultDiv.innerHTML = `<p class="error-message">Error: Please enter time in HHMM format (e.g., 1330).</p>`;
        return;
    }

    let inputHours = parseInt(time.slice(0, 2), 10);
    let inputMinutes = parseInt(time.slice(2), 10);

    if (inputHours < 0 || inputHours > 23 || inputMinutes < 0 || inputMinutes > 59) {
        resultDiv.innerHTML = `<p class="error-message">Error: Invalid time. Ensure hours are between 00-23 and minutes are between 00-59.</p>`;
        return;
    }

    document.getElementById("selected-time").innerHTML = `<strong>Selected Time:</strong> ${formatTime(inputHours, inputMinutes)}`;

    // Fetch doctor availability
    fetch(`http://127.0.0.1:5000/predict?time=${time}`)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = "";
            downloadBtn.style.display = "none"; // Hide download button initially

            if (data.error) {
                resultDiv.innerHTML = `<p class="error-message">Error: ${data.error}</p>`;
                return;
            }

            if (data.doctors.length === 0) {
                resultDiv.innerHTML = "<p>No available doctors at this time.</p>";
                return;
            }

            let doctorTable = `
                <div class="doctors-box">
                    <h3>Available Doctors:</h3>
                    <table class="doctors-table">
                        <thead>
                            <tr>
                                <th>NPI</th>
                                <th>State</th>
                                <th>Speciality</th>
                                <th>Region</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            let csvContent = "NPI,State,Speciality,Region\n"; 

            data.doctors.forEach(doc => {
                doctorTable += `
                    <tr>
                        <td>${doc.NPI}</td>
                        <td>${doc.State}</td>
                        <td>${doc.Speciality}</td>
                        <td>${doc.Region}</td>
                    </tr>
                `;
                csvContent += `${doc.NPI},${doc.State},${doc.Speciality},${doc.Region}\n`;
            });

            doctorTable += `</tbody></table></div>`;

            resultDiv.innerHTML = doctorTable;

            // Prepare CSV for download
            downloadBtn.style.display = "block";
            downloadBtn.onclick = function () {
                let blob = new Blob([csvContent], { type: "text/csv" });
                let url = URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = `Doctors_Available_${time}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error-message">Error fetching data.</p>`;
            console.error("Fetch error:", error);
        });
});

// Function to format time into 12-hour format with AM/PM
function formatTime(hours, minutes) {
    let period = hours >= 12 ? "PM" : "AM";
    let twelveHour = hours % 12 || 12;
    return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

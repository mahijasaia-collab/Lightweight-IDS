let barChart, lineChart, pieChart;
let history = [];
let running = true;
let lastHigh = 0;

async function fetchData() {
    if (!running) return;

    const res = await fetch('/data');
    const data = await res.json();

    const highCount = document.getElementById("highCount");
    const mediumCount = document.getElementById("mediumCount");
    const lowCount = document.getElementById("lowCount");

    const totalEl = document.getElementById("total");
    const percentEl = document.getElementById("percent");

    const alertsBox = document.getElementById("alertsBox");
    const ipBox = document.getElementById("ipBox");

    const barChartEl = document.getElementById("barChart");
    const lineChartEl = document.getElementById("lineChart");
    const pieChartEl = document.getElementById("pieChart");

    let total = data.high + data.medium + data.low;

    if (highCount) highCount.innerText = data.high;
    if (mediumCount) mediumCount.innerText = data.medium;
    if (lowCount) lowCount.innerText = data.low;

    if (totalEl) totalEl.innerText = total;
    if (percentEl && total > 0)
        percentEl.innerText = ((data.high/total)*100).toFixed(1)+"%";

    // Smooth history
    history.push(total);
    if (history.length > 20) history.shift();

    // Destroy old charts
    if (barChart) barChart.destroy();
    if (lineChart) lineChart.destroy();
    if (pieChart) pieChart.destroy();

    // LINE (TREND)
    if (lineChartEl) {
        lineChart = new Chart(lineChartEl, {
            type: 'line',
            data: {
                labels: history.map((_, i) => i+1),
                datasets: [{
                    label: 'Threat Activity',
                    data: history,
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    }

    // BAR
    if (barChartEl) {
        barChart = new Chart(barChartEl, {
            type: 'bar',
            data: {
                labels: ['High','Medium','Low'],
                datasets: [{
                    label: 'Alerts',
                    data: [data.high,data.medium,data.low]
                }]
            }
        });
    }

    // DOUGHNUT (MODERN PIE)
    if (pieChartEl) {
        pieChart = new Chart(pieChartEl, {
            type: 'doughnut',
            data: {
                labels: ['High','Medium','Low'],
                datasets: [{
                    data: [data.high,data.medium,data.low]
                }]
            }
        });
    }

    // Terminal logs
    if (alertsBox) {
        alertsBox.innerHTML = "";
        data.alerts.forEach(alert => {
            let p = document.createElement("p");
            let time = new Date().toLocaleTimeString();
            p.innerText = `[${time}] ${alert}`;
            alertsBox.appendChild(p);
        });
    }

    // IP panel
    if (ipBox) {
        ipBox.innerHTML = "";
        for (let ip in data.top_ips) {
            let p = document.createElement("p");
            p.innerText = `${ip} (${data.top_ips[ip]})`;
            ipBox.appendChild(p);
        }
    }

    // Sound
    if (data.high > lastHigh)
        new Audio("/static/alert.mp3").play();

    lastHigh = data.high;
}

function toggle(){
    running = !running;
}

setInterval(fetchData,3000);
fetchData();
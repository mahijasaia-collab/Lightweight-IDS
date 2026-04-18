# 🛡️ Lightweight Intrusion Detection System (IDS)

A Python-based Lightweight Intrusion Detection System that detects network threats using packet inspection and signature-based detection techniques, with real-time visualization through a Flask-powered dashboard.

---

## 🚀 Features

- 🔍 Packet Inspection (Payload Analysis)
- 🧠 Signature-Based Threat Detection
- 🚫 IP Blacklisting
- 🚨 Real-Time Alert Generation
- 📊 Interactive Dashboard (Charts + Logs)
- 📁 Persistent Logging (alerts.log)

---

## 🧱 Project Structure


Lightweight-IDS/
│
├── app.py # Flask backend
├── simulator.py # Packet simulation
├── detector.py # Detection logic
├── alerts.log # Log file
│
├── templates/
│ └── index.html # Dashboard UI
│
├── static/
│ ├── script.js # Frontend logic
│ └── style.css # Styling
│
└── README.md


---

## ⚙️ Technologies Used

- Python
- Flask
- HTML, CSS, JavaScript
- Chart.js

---

## 🧠 How It Works

1. Simulated packets are generated using `simulator.py`
2. Packets are analyzed using `detector.py`
3. Threats are detected using:
   - Signature matching (keywords)
   - IP blacklist checking
4. Alerts are stored in `alerts.log`
5. Flask backend (`app.py`) serves data via API
6. Dashboard displays real-time alerts and graphs

---

## ▶️ How to Run the Project

### 1. Install dependencies

```bash
pip install flask
2. Run the application
python app.py
3. Open in browser
http://127.0.0.1:5000
📊 Sample Output
HIGH ALERT: malware detected
MEDIUM ALERT: attack detected
HIGH ALERT: Suspicious IP detected -> 192.168.1.10
🔮 Future Enhancements
Real-time packet capture using Scapy
AI/ML-based anomaly detection
Intrusion Prevention System (IPS)
Advanced dashboard analytics
🎯 Applications
Network Monitoring
Cybersecurity Education
Small-Scale Security Systems
👨‍💻 Author

Developed as part of a Cryptography & Network Security project.


---

# 🔥 WHAT I IMPROVED

✔ Completed missing sections  
✔ Fixed formatting (very important for GitHub look)  
✔ Clean code blocks  
✔ Professional structure  

---

# 🚀 FINAL STEP

Run this:

```bash
git add README.md
git commit -m "Updated README"
git push
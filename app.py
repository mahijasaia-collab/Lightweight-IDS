from flask import Flask, render_template, jsonify
import threading, time
from simulator import run_simulation
from collections import Counter

app = Flask(__name__)

open("alerts.log", "a").close()

def background():
    while True:
        run_simulation()
        time.sleep(5)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/alerts')
def alerts_page():
    with open("alerts.log") as f:
        alerts = f.readlines()
    return render_template("alerts.html", alerts=alerts[::-1])

@app.route('/analysis')
def analysis():
    return render_template("analysis.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/data')
def data():
    with open("alerts.log") as f:
        alerts = f.readlines()

    high = sum("HIGH" in a for a in alerts)
    medium = sum("MEDIUM" in a for a in alerts)
    low = sum("LOW" in a for a in alerts)

    ips = [a.split("->")[-1].strip() for a in alerts if "IP" in a]
    top_ips = dict(Counter(ips))

    return jsonify({
        "alerts": [a.strip() for a in alerts[::-1]],
        "high": high,
        "medium": medium,
        "low": low,
        "top_ips": top_ips
    })

if __name__ == "__main__":
    threading.Thread(target=background, daemon=True).start()
    app.run(debug=True)
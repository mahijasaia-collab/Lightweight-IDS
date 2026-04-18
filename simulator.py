from detector import detect_payload, detect_ip

def packets():
    return [
        {"payload":"normal","ip":"192.168.1.2"},
        {"payload":"malware found","ip":"192.168.1.10"},
        {"payload":"attack detected","ip":"10.0.0.5"}
    ]

def run_simulation():
    for p in packets():
        for a in [detect_payload(p["payload"]), detect_ip(p["ip"])]:
            if a:
                with open("alerts.log","a") as f:
                    f.write(a+"\n")
    print(a)
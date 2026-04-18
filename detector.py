def detect_payload(payload):
    rules = {
        "malware": "HIGH",
        "attack": "MEDIUM",
        "hack": "LOW"
    }

    for k, v in rules.items():
        if k in payload.lower():
            return f"{v} ALERT: {k} detected"
    return None


blacklist_ips = ["192.168.1.10", "10.0.0.5"]

def detect_ip(ip):
    if ip in blacklist_ips:
        return f"HIGH ALERT: Suspicious IP detected -> {ip}"
    return None
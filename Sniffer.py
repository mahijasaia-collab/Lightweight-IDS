from scapy.all import sniff
from detector import detect_payload

def process_packet(packet):
    if packet.haslayer("Raw"):
        payload = str(packet["Raw"].load)
        alert = detect_payload(payload)

        if alert:
            print(alert)
            with open("alerts.log", "a") as f:
                f.write(alert + "\n")

sniff(prn=process_packet, store=0)
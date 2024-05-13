import requests
import psycopg2
import os
import csv
from io import StringIO

part_name = ["case-accessory", "case-fan", "case", "cpu-cooler", "cpu", "external-hard-drive", "fan-controller", "headphones", "internal-hard-drive", "keyboard", "memory", "monitor", "motherboard", "mouse", "optical-drive", "os", "power-supply", "sound-card", "speakers", "thermal-paste", "ups", "video-card", "webcam", "wired-network-card", "wireless-network-card"]

def fetch_csv(file_name):
    response = requests.get(f"https://github.com/docyx/pc-part-dataset/tree/main/data/csv/{file_name}.csv")
    if response.status_code == 200:
        csv_fi = f"{file_name}.csv"
        with open(csv_fi, 'wb') as csv_file:
            csv_file.write(response.content)
        return csv_fi
    else:
        return None

conn = psycopg2.connect(database="pcbuilderdatabase", user="buddy", password="brocode", host="45.76.76.242", port="5432")
cur = conn.cursor()

for part in part_name:
    print(f"Copying {part}")
    csv_file = fetch_csv(part)
    if csv_file:
        with open(csv_file, 'r') as f:
            #cur.copy_expert(sql=f'COPY pc_parts."{part}" FROM STDIN WITH CSV HEADER', file=f)
            try:
                cur.copy_expert(sql=f'COPY pc_parts."{part}" FROM STDIN WITH CSV HEADER', file=f)
                conn.commit()  # Commit after each table copy
            except Exception as e:
                conn.rollback()  # Rollback transaction in case of error
                print(f"Error inserting data into table {part}: {e}")
        os.remove(csv_file)  # Remove the downloaded CSV file after copying data
        conn.commit()  # Commit after each table copy
    print("Copy complete")

conn.close()
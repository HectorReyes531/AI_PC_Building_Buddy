import psycopg2
from psycopg2 import Error

def fetch_accessories():
    reccommendations = []

    try:
        # Establish connection to your PostgreSQL database
        connection = psycopg2.connect(database="pcbuilderdatabase", user="buddy", password="brocode", host="45.76.76.242", port="5432")

        # Create a cursor to perform database operations
        cursor = connection.cursor()

        # Define the schema and tables
        schema = "pc_parts"
        tables = ["mouse", "monitor", "headphones", "keyboard"]

        for table in tables:
            query = f"SELECT name FROM {schema}.{table} ORDER BY RANDOM() LIMIT 1;"
            cursor.execute(query)
            row = cursor.fetchone()
            reccommendations.append(row[0])

        # Close communication with the database
        cursor.close()
        connection.close()

    except (Exception, Error) as error:
        print("Error while connecting to PostgreSQL:", error)

    return reccommendations

if __name__ == "__main__":
    recs = fetch_accessories()
    print(recs)
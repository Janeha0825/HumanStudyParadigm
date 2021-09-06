import mysql.connector

class Database:

    def __init__(self):
        self.conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="rubysapphire",
            database="forced_choice", 
            auth_plugin='mysql_native_password'
        )

    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        return c.fetchall()

    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()

    def create_user(self, age, gender):
        self.execute("INSERT INTO User(age, gender) VALUES (%s, %s)", (age, gender))

    def get_user(self):
        data = self.select('SELECT MAX(ID) from User')
        return data[0][0]

    def create_response(self, userID, experimentID, imgName, guess, confidenceLevel):
        self.execute('INSERT INTO Response (userID, expID, imgName, guess, confidenceLevel) VALUES (%s, %s, %s, %s,%s)',
                     (userID, experimentID, imgName, guess, confidenceLevel))

    def close(self):
        self.conn.close()

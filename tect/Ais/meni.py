from PyQt6 import QtCore, QtGui, QtWidgets
from PyQt6.QtCore import QTime, QTimer
from PyQt6.uic import loadUi
from PyQt6.QtGui import QStandardItemModel, QStandardItem
import sys
import psycopg2

class VideoRentalApp(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        try:
            loadUi('C:/joxan/Ais/aais.ui', self)
        except Exception as e:
            print(f"Ошибка загрузки: {e}")
            sys.exit(1)

        self.comboBox_2.currentTextChanged.connect(self.on_filter_changed)
        self.comboBox_3.currentTextChanged.connect(self.on_filter_changed)
        self.comboBox_4.currentTextChanged.connect(self.on_filter_changed)
        self.comboBox_5.currentTextChanged.connect(self.on_filter_changed)
        self.pushButton.clicked.connect(self.load_films_in_listview)
        self.initialize_app()

    def connect_in_db(self):
        try:
            with psycopg2.connect(
                host="localhost", 
                port=5432, 
                database="vid", 
                user="postgres", 
                password="12345"
            ) as conn:
                return conn
        except Exception as e:
            print(f'Ошибка подключения к БД: {e}')
            return None

    # Загрузка студий в comboBox_5
    def load_studios_in_QComboBox(self):
        conn = self.connect_in_db()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("SELECT DISTINCT studio FROM Films ORDER BY studio")
                studios = cursor.fetchall()
                
                self.comboBox_5.clear()
                self.comboBox_5.addItem("Все студии")
                for studio in studios:
                    self.comboBox_5.addItem(studio[0]) 
                
                cursor.close()
                conn.close()
                print(f"Загружено студий: {len(studios)}")
            except Exception as err:
                print('Ошибка при загрузке студий:', err)

    # Загрузка жанров в comboBox_4
    def load_genres_in_QComboBox(self):
        conn = self.connect_in_db()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("SELECT DISTINCT genre FROM Films ORDER BY genre")
                genres = cursor.fetchall()
                
                self.comboBox_4.clear()
                self.comboBox_4.addItem("Все жанры")
                for genre in genres:
                    self.comboBox_4.addItem(genre[0])
                
                cursor.close()
                conn.close()
                print(f"Загружено жанров: {len(genres)}")
            except Exception as err:
                print('Ошибка при загрузке жанров:', err)

    # Загрузка годов выпуска в comboBox_2
    def load_years_in_QComboBox(self):
        conn = self.connect_in_db()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("SELECT DISTINCT release_year FROM Films ORDER BY release_year DESC")
                years = cursor.fetchall()
                
                self.comboBox_2.clear()
                self.comboBox_2.addItem("Все годы")
                for year in years:
                    self.comboBox_2.addItem(str(year[0]))
                
                cursor.close()
                conn.close()
                print(f"Загружено годов: {len(years)}")
            except Exception as err:
                print('Ошибка при загрузке годов:', err)

    def load_directors_in_QComboBox(self):
        conn = self.connect_in_db()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("SELECT DISTINCT director FROM Films ORDER BY director")
                directors = cursor.fetchall()
                
                self.comboBox_3.clear()
                self.comboBox_3.addItem("Все режиссеры")
                for director in directors:
                    self.comboBox_3.addItem(director[0])
                
                cursor.close()
                conn.close()
                print(f"Загружено режиссеров: {len(directors)}")
            except Exception as err:
                print('Ошибка при загрузке режиссеров:', err)

    def initialize_app(self):
        self.load_studios_in_QComboBox()
        self.load_genres_in_QComboBox()
        self.load_years_in_QComboBox()
        self.load_directors_in_QComboBox()

    def on_filter_changed(self):
        self.load_films_in_listview()

    def get_filter_query(self):
        studio = self.comboBox_5.currentText()
        genre = self.comboBox_4.currentText()
        year = self.comboBox_2.currentText()
        director = self.comboBox_3.currentText()
        conditions = []
        params = []
        if studio and studio != "Все студии":
            conditions.append("studio = %s")
            params.append(studio)
        if genre and genre != "Все жанры":
            conditions.append("genre = %s")
            params.append(genre)
        if year and year != "Все годы":
            conditions.append("release_year = %s")
            params.append(int(year))
        if director and director != "Все режиссеры":
            conditions.append("director = %s")
            params.append(director)
        
        if conditions:
            where_clause = "WHERE " + " AND ".join(conditions)
        else:
            where_clause = ""
        
        query = f"""
            SELECT title, studio, genre, release_year, director, rating 
            FROM Films 
            {where_clause} 
            ORDER BY title
            LIMIT 50
        """
        return query, params

    def load_films_in_listview(self):
        query, params = self.get_filter_query()  
        conn = self.connect_in_db()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute(query, params)
                films = cursor.fetchall()
                model = QStandardItemModel()
                self.listView.setModel(model)
                model.clear()
                for film in films:
                    item = QStandardItem(f"{film[0]} ({film[2]}, {film[3]}, {film[4]})")
                    model.appendRow(item)
                cursor.close()
                conn.close()
                print(f"Загружено фильмов: {len(films)}")
                
            except Exception as err:
                print('Ошибка при загрузке фильмов:', err)

    def clear_all(self):
        self.comboBox_2.clear()
        self.comboBox_3.clear()
        self.comboBox_4.clear()
        self.comboBox_5.clear()
        
        if self.listView.model():
            self.listView.model().clear()
        print("Все поля очищены")
        
        self.initialize_app()

if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = VideoRentalApp()
    window.show()
    sys.exit(app.exec())

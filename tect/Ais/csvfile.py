import psycopg2
import csv
from datetime import datetime, date, timedelta
import random
import os


FILM_GENRES = [
    'драма', 'комедия', 'триллер', 'боевик', 'фантастика', 'ужасы',
    'детектив', 'мелодрама', 'приключения', 'вестерн', 'криминал', 'исторический'
]


STUDIOS = [
    'Мосфильм', 'Ленфильм', 'Warner Bros', 'Paramount', '20th Century Fox',
    'Universal', 'Disney', 'Мир', 'Гостелерадио', 'Киностудия им. Горького'
]


DIRECTORS = [
    'Андрей Тарковский', 'Сергей Эйзенштейн', 'Эльдар Рязанов', 'Стэнли Кубрик',
    'Мартин Скорсезе', 'Квентин Тарантино', 'Стивен Спилберг', 'Ридли Скотт',
    'Дэвид Финчер', 'Гай Ричи', 'Александр Сокуров', 'Никита Михалков'
]


MAIN_ACTORS = [
    'Владимир Машков, Олег Меньшиков', 'Ингрид Бергман, Хамфри Богарт',
    'Леонардо ДиКаприо, Кейт Уинслет', 'Брюс Уиллис, Алан Рикман',
    'Николай Караченцов, Олег Табаков', 'Арнольд Шварценеггер, Джеймс Кэмерон',
    'Аль Пачино, Роберт Де Ниро', 'Райан Гослинг, Эмма Стоун'
]


SUMMARY_TEMPLATES = [
    "Классический {genre} о сложных человеческих отношениях и поиске себя.",
    "Захватывающий {genre} с неожиданными поворотами сюжета.",
    "Эпическая история любви на фоне {genre} событий.",
    "Напряженный {genre} триллер о борьбе добра и зла.",
    "Юмористическая комедия о приключениях простых людей."
]


def generate_fake_summary(genre):
    template = random.choice(SUMMARY_TEMPLATES)
    return template.format(genre=genre)


def generate_films_csv(filename='films.csv', count=200):   
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'id', 'title', 'studio', 'genre', 'release_year',
            'director', 'main_actors', 'summary', 'rating'
        ])
        for i in range(1, count + 1):
            title_words = [
                'Тень', 'Любовь', 'Кровь', 'Ночь', 'День', 'Огонь',
                'Вода', 'Ветер', 'Звезды', 'Дорога', 'Судьба', 'Мечта'
            ]
            title = f"{random.choice(title_words)} {' '.join(random.choices(title_words, k=random.randint(1,2)))}"
            studio = random.choice(STUDIOS)
            genre = random.choice(FILM_GENRES)
            release_year = random.randint(1960, 2024)
            director = random.choice(DIRECTORS)
            main_actors = random.choice(MAIN_ACTORS)
            summary = generate_fake_summary(genre)
            rating = random.randint(6, 10)
            
            writer.writerow([
                i, title, studio, genre, release_year,
                director, main_actors, summary, rating
            ])
   
    print(f"{filename} сгенерирован: {count} фильмов")
    return filename
def films_csv_to_db(db_params, csv_file):
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            inserted_count = 0
            for row in reader:
                try:
                    query = """
                    INSERT INTO Films (title, studio, genre, release_year,
                                    director, main_actors, summary, rating)
                    VALUES (%(title)s, %(studio)s, %(genre)s, %(release_year)s,
                            %(director)s, %(main_actors)s, %(summary)s, %(rating)s)
                    """
                    cur.execute(query, row)
                    inserted_count += 1
                except Exception as e:
                    print(f"Пропуск записи {row['id']}: {e}")
                    continue
            
            conn.commit()
            print(f"Загружено {inserted_count} фильмов в таблицу Films")
            
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"Ошибка загрузки: {e}")
        raise
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
def films_csv_main(db_params):
    films_csv = generate_films_csv(count=200)
    films_csv_to_db(db_params, films_csv)
if __name__ == "__main__":
    db_params = {
        'host': 'localhost',
        'port': 5432,
        'database': 'vid',
        'user': 'postgres',
        'password': '12345'
    }
    try:
        films_csv_main(db_params)
        print("\nГенерация фильмов завершена успешно!")
    except Exception as e:
        print(f"Ошибка: {e}")

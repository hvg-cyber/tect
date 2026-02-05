import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import sys


def create_Db():
    db_params1 = {
        'host': 'localhost',
        'port': 5432,
        'database': 'postgres', 
        'user': 'postgres',
        'password': '12345'
    }     
    conn = psycopg2.connect(**db_params1)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT) 
    cur = conn.cursor()
    cur.execute('CREATE DATABASE vid')
    if cur:
        cur.close()
    if conn:
        conn.close()
def create_database_structure(db_params):
    conn = None
    cur = None 
    try:
        print("Подключение к бд")
        conn = psycopg2.connect(**db_params)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT) 
        cur = conn.cursor()
        print("Создание таблиц базы данных видеопроката") 
        
        cur.execute("""
            CREATE TABLE Customers (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                phone VARCHAR(20),
                email VARCHAR(255),
                registration_date DATE DEFAULT CURRENT_DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("Customers создана")
        cur.execute("""
            CREATE TABLE Films (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                studio VARCHAR(255),
                genre VARCHAR(100),
                release_year INTEGER,
                director VARCHAR(255),
                main_actors TEXT,
                summary TEXT,
                rating INTEGER CHECK (rating >= 1 AND rating <= 10),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("Films создана")
        cur.execute("""
            CREATE TABLE Inventory (
                id SERIAL PRIMARY KEY,
                film_id INTEGER REFERENCES Films(id) ON DELETE CASCADE,
                cassette_id VARCHAR(50) UNIQUE,
                status VARCHAR(20) DEFAULT 'available' 
                    CHECK (status IN ('available','issued','damaged')),
                condition VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("Inventory создана")
        cur.execute("""
            CREATE TABLE Rentals (
                id SERIAL PRIMARY KEY,
                inventory_id INTEGER REFERENCES Inventory(id) ON DELETE CASCADE,
                customer_id INTEGER REFERENCES Customers(id) ON DELETE CASCADE,
                issue_date TIMESTAMP,
                return_date TIMESTAMP,
                due_date DATE,
                fine NUMERIC(10,2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("Rentals создана")
        print("Все таблицы созданы успешно")
    except Exception as e:
        print(f"Ошибка: {e}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

def main():
    db_params = {
        'database': 'vid', 
        'user': 'postgres',
        'password': '12345'
    }
    missing = [k for k, v in db_params.items() if v in [None, '', []]]
    if missing:
        print("Отсутствуют подключения:", missing)
        sys.exit(1)
    try:
        create_database_structure(db_params)
    except Exception as e:
        print(e)
        print("Попытка попытка занова создать BD")
        create_Db()
        create_database_structure(db_params)
        sys.exit(1)
if __name__ == "__main__":
    create_Db()
    main()

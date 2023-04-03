import psycopg2
import uuid
import sys
from os.path import dirname, abspath

from sqlalchemy import create_engine, Column, Integer, String, desc
from sqlalchemy.orm import sessionmaker

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)
from repositories.posgresql import Base
from models.history import History

class HistoriesRepository:
    def __init__(self, session: sessionmaker):
        self.Session = session

    def get_histories(self):
        with self.Session() as session:
            histories = session.query(History)\
                .order_by(desc(History.last_visit_time)).all()
        session.close()
        return histories

# test
if __name__ == '__main__':
    from repositories.posgresql import postgresql_session
    session = postgresql_session()
    repository = HistoriesRepository(session)
    histories = repository.get_histories()
    print([vars(h) for h in histories[0:10]])
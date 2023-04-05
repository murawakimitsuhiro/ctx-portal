import psycopg2
import uuid
import sys
from os.path import dirname, abspath

from sqlalchemy import create_engine, Column, Integer, String, desc, func
from sqlalchemy.orm import sessionmaker

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)
from repositories.posgresql import Base
from models.history import History

class HistoriesRepository:
    def __init__(self, session: sessionmaker):
        self.Session = session

    def all(self):
        with self.Session() as session:
            histories = session.query(History)\
                .order_by(desc(History.last_visit_time)).all()
        session.close()
        return histories

    def get_by_id_and_time(self, chromium_page_id, last_visit_time):
        # msでなく、sで丸めて検索している
        with self.Session() as session:
            history = session.query(History)\
                .filter(History.chromium_page_id == chromium_page_id)\
                .filter(func.TRUNC(History.last_visit_time) == func.TRUNC(last_visit_time))\
                .first()
        session.close()
        return history

# test
if __name__ == '__main__':
    from repositories.posgresql import postgresql_session
    session = postgresql_session()
    repository = HistoriesRepository(session)
    # histories = repository.get_histories()
    # print([vars(h) for h in histories[0:10]])
    his = repository.get_history_with_id_and_time(70342, 1678882585845.3/1000)
    print(vars(his))
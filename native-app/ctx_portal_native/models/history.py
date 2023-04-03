import uuid
import sys
from os.path import dirname, abspath
from sqlalchemy import Column, Integer, String, Float

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)
from repositories.posgresql import Base

class History(Base):
    __tablename__ = 'histories'
    __table_args__ = {'extend_existing': True}

    uuid = Column(String, primary_key=True, default=str(uuid.uuid4()))
    chromium_page_id = Column(Integer, nullable=False, unique=True)
    title = Column(String)
    url = Column(String, nullable=False)
    last_visit_time = Column(Float, nullable=False)
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

def _connect():
    user = os.environ.get("CTX_C_USER")
    passwd = os.environ.get("CTX_C_PASSWORD")
    host = os.environ.get("CTX_C_HOST")
    port = os.environ.get("CTX_C_PORT")
    dbname = os.environ.get("CTX_C_DBNAME")

    CONNECT_STR = 'postgresql://{user}:{password}@{host}:{port}/{dbname}'.format( 
                    user=user,
                    password=passwd,
                    host=host,
                    port=port,
                    dbname=dbname,
                    options="-c search_path=dbo,public")
    return create_engine(CONNECT_STR, isolation_level="AUTOCOMMIT")

Base = declarative_base()
_engine = _connect()

def postgresql_session():
    return sessionmaker(bind=_engine)
import os


# os.environ.get('EMAIL)


class Config:
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(os.path.dirname(__file__), '../app_data.db')
    db_uri = 'sqlite:///{}'.format(db_path)
    SECRET_KEY = '8c354020b6123bc8a8ffdeba488ae749'
    SQLALCHEMY_DATABASE_URI = db_uri  # specify any other
    SQLALCHEMY_TRACK_MODIFICATIONS = True #for full text search changes

    # flask-msearch will use table name as elasticsearch index name unless set __msearch_index__
    MSEARCH_INDEX_NAME = 'msearch'
    # simple,whoosh,elaticsearch, default is simple
    MSEARCH_BACKEND = 'whoosh'
    # table's primary key if you don't like to use id, or set __msearch_primary_key__ for special model
    MSEARCH_PRIMARY_KEY = 'id'
    # auto create or update index
    MSEARCH_ENABLE = True
    # logger level, default is logging.WARNING
    #MSEARCH_LOGGER = logging.DEBUG
    # SQLALCHEMY_TRACK_MODIFICATIONS must be set to True when msearch auto index is enabled
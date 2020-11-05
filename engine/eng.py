from db_id import create_app, db
from db_id.generate.random_dt import Generate
import logging


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(message)s')
file_handler = logging.FileHandler('testing.log')
file_handler.setFormatter(formatter)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)


logger.addHandler(file_handler)

# DEBUG, INFO, WARNING, ERROR, CRITICAL

app = create_app()
db.create_all(app=app)

if  __name__ == "__main__":
    logger.info('HELLO DEBUG LOGGIN!!!!!!!!!!!')
    #Generate().generate(1000)
    app.run(debug=True)

from db_id import create_app, db
from db_id.models import Item
from sqlalchemy.exc import IntegrityError

app = create_app()
app.app_context().push()

from faker import Faker
fake = Faker()
class Generate:
    @staticmethod
    def generate(n):
        for i in range(n):
            with app.app_context():
                item = Item(title=fake.name(), comment=fake.text())

                try:
                    db.session.add(item)
                    db.session.commit()
                    print(i)
                    print('***************** CVALLED *****************')
                    print('***************** CVALLED *****************')
                    print('||||||||||||||||| ITEM ||||||||||||||||||||||')
                    print('||||||||||||||||| ITEM ||||||||||||||||||||||')
                except IntegrityError:
                    db.session.rollback()




            #self.create_item()

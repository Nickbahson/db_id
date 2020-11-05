from db_id import db, ma
#from flask import current_app as app
from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class Item(db.Model):
    __tablename__ = 'item'
    __searchable__ = ['title']

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __init__(self, title, comment):
        self.title = title
        self.comment = comment

    def __repr__(self):
        return f"Post('{self.title}', '{self.created_on}')"

# Items Schema
class ItemSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'comment', 'created_on', 'updated_on', 'date_modified')


# Init schema
item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

# results = BlogPost.query.whoosh_search('cool')
# https://medium.com/@rajatrs5054/scout-vs-whoosh-for-full-text-search-in-python-5f1015591a62

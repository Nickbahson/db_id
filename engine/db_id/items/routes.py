from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint, jsonify)
from flask_marshmallow import Marshmallow
import json
from db_id import db
from db_id.items.forms import ItemForm
from db_id.models import Item, item_schema, items_schema

items = Blueprint('items', __name__)


@items.route('/item/new', methods=['GET', 'POST'])
def new_item():
    form = ItemForm()
    if form.validate_on_submit():
        item = Item(title=form.title.data, comment=form.comment.data)
        db.session.add(item)
        db.session.commit()
        flash('Item created', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_item.html', title='New Item',
                           form=form, legend='New Item')


@items.route('/item/<int:item_id>', methods=['GET', 'POST'])
def item(item_id):
    item = Item.query.get_or_404(item_id)
    return render_template('item.html', title=item.title, item=item)


@items.route('/item/<int:item_id>/update', methods=['GET', 'POST'])
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    form = ItemForm()

    if form.validate_on_submit():
        item.title = form.title.data
        item.comment = form.comment.data
        db.session.commit()
        flash('Item updated', 'success')
        return redirect(url_for('items.item', item_id=item.id))

    elif request.method == 'GET':
        form.title.data = item.title
        form.comment.data = item.comment

    return render_template('create_item.html', title='Update Item',
                           form=form, legend='Update Item')


@items.route('/items-list', methods=['GET'])
def items_list():
    page = request.args.get('page', 1, type=int)
    items = Item.query.order_by(Item.created_on.desc()).paginate(page=page, per_page=5)
    return jsonify(items)


# api create new item
@items.route('/api/new-item', methods=['POST'])
def api_new_item():
    title = request.json['title']
    comment = request.json['comment']

    item = Item(title, comment)
    db.session.add(item)
    db.session.commit()
    return item_schema.jsonify(item)


# api update item
@items.route('/api/item/<id>', methods=['PUT'])
def api_update_item(id):
    item = Item.query.get(id)
    title = request.json['title']
    comment = request.json['comment']

    item.title = title
    item.comment = comment
    db.session.commit()
    return item_schema.jsonify(item)


# api get items list
@items.route('/api/items-list', methods=['GET'])
def api_items_list():
    all_items = Item.query.all()
    result = items_schema.dump(all_items)
    print(result)
    return jsonify(result)


# api get single item
@items.route('/api/item/<id>', methods=['GET'])
def api_get_item(id):
    item = Item.query.get(id)
    return item_schema.jsonify(item)


# api delete single item
@items.route('/api/item/<id>', methods=['DELETE'])
def api_delete_item(id):
    item = Item.query.get(id)
    db.session.delete(item)
    db.session.commit()
    return item_schema.jsonify(item)


# Search endpoint
@items.route('/api/search-results', methods=['GET', 'POST'])
def api_search_results():
    #num_posts = min(request.args.get('limit', 10), 50)
    data = json.loads(request.data)
    search_value = "%{}%".format(data.get('text'))
    page = data.get('page')
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    print(page)
    results = Item.query.order_by(Item.updated_on.desc()).filter(Item.title.like(search_value)).paginate(per_page=50, page=page)
    result = items_schema.dump(results.items)

    item_l = {
        'page': results.per_page,
        'pages': list(results.iter_pages()),
        'items': result,
        'items_pp': results.per_page
    }

    response = jsonify(item_l)
    print(response)


    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

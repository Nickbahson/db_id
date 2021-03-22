import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getSearchResults, updateItemRq } from '../services/httpService'
import DataTable, { createTheme } from 'react-data-table-component';
import EditItem from "./EditItem";
import { format } from 'date-fns';
import CreateItemForm from "./CreateItemForm";

function SearchForm({addTerm, term}) {

    const handleSubmit = e => {
        e.preventDefault()

    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                   className="input"
                   value={term}
                   placeholder="Search by title"
                   onChange={e => addTerm(e.target.value) }/>
        </form>
    )
}

createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198',
    },
    background: {
        default: '#002b36',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const Pagination = ({edit_view, items, columns, pages, handlePaginate}) => {


    if(pages.length === 0 || edit_view) return null

    return (
        <React.Fragment>
            <DataTable
                className="item-table"
                theme="solarized"
                columns={columns}
                data={items}
                title='DB ID items...'
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                defaultSortField="id"
                defaultSortAsc={true}

            />

            <ul>
                {
                    pages.map(page => {

                        if (pages.length >= 1) return null
                        if(page) return <li className="btn btn-outline-info mb-4" onClick={(e) => handlePaginate(e.target.value)} key={page} value={page}>{page}</li>
                        return <li className="btn btn-outline-info mb-4" key={uuidv4()}>...</li>
                    })
                }
            </ul>
        </React.Fragment>
    )

}

const HomeSearch = () => {

    const [search_value, setSearchValue ] = useState('')
    const [search_results, setData ] = useState({items: [], items_pp: 50, page: 1, pages: []})
    const [edit_view, setEditView ] = useState(false)
    const [edit_item, setEditItem ] = useState({})
    const [page, setPage ] = useState(1)
        //

    useEffect(() => {
        getSearchResults(search_value, page)
            .then((results) => {
                setData(results)
            })
    },[search_value])


    // Updates search term and search results
    const addTerm = (text) => {
        getSearchResults(text, search_results.page)
            .then((results) => {
                setData(results)
            })

        setSearchValue(text)
    }

    //const data = search_results


    // Controls view of the edit form
    const handleUpdate = value => {
        if (edit_view) {
            setEditItem({})
            setEditView(false)
        } else {
            setEditItem(value)
            setEditView(true)
        }

    }

    // Handles the updated item from EditItem component form
    const handleUpdated = async (updated) => {

        if (updated === 'cancel_update' ||
            (edit_item.title === updated.title && edit_item.comment === updated.comment)) {
            // reset view and don't update item
            if (edit_view) {
                setEditItem({})
                setEditView(false)
            }


        } else {

            updateItemRq({id: edit_item.id, comment : updated.comment, title: updated.title})
                .then(() => {

                    setEditItem({})
                    setEditView(false)
                })




            let updated_items = [...search_results.items]

            updated_items.map(item => {

                if (item.id === edit_item.id) {

                    alert(updated.title)
                    item.title = updated.title
                    item.comment = updated.comment
                }
            })

            let new_items = {...search_results}
            new_items.items = updated_items
            setData(new_items)
        }



    }

    const handlePaginate = (page_no) => {
        //alert(page)
        getSearchResults(search_value, page_no)
            .then((results) => {
                setData(results)
            })


    }

    const FormatDate = ({ date }) => <span>  {format(new Date(date), 'yyyy-MM-dd')}  </span>


    const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
                cell: row => <div><div style={{ fontWeight: 700 }}>{row.title}</div>{row.summary}</div>,
            },
            {
                name: 'Created on',
                selector: 'created_on',
                sortable: true,
                cell: row => <div><div><FormatDate date={row.created_on}/></div>{row.summary}</div>,
            },
            {
                name: 'Updated on',
                selector: 'date_modified',
                sortable: true,
                cell: row => <div><div><FormatDate date={row.date_modified}/></div>{row.summary}</div>,
            },
            {
                name: 'Update',
                cell: (item) => <button className= "raised primary" onClick={() => handleUpdate(item) }>Edit</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },

        ]

    const { items } = search_results

    return (
        <div className="app content">
            <SearchForm
                addTerm={addTerm}
                term={search_value}
            />
            <EditItem
                item={edit_item}
                view={edit_view}
                handleUpdated={handleUpdated}
            />
            <Pagination
                pages={search_results.pages}
                handlePaginate={handlePaginate}
                items={items}
                columns={columns}
                edit_view={edit_view}
            />
        </div>
    );
};

export default HomeSearch;
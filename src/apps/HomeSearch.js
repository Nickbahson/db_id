import React, { useEffect, useState } from 'react';
import { getSearchResults, updateItemRq } from '../services/httpService'
import DataTable, { createTheme } from 'react-data-table-component';
import EditItem from "./EditItem";
import { format } from 'date-fns';
import CreateItemForm from "./CreateItemForm";
console.log('REACT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

function SearchForm({addTerm, term}) {
    //const [value, setValue] = useState('')

    //console.log(value)
    //addTerm(value)

    const handleSubmit = e => {
        e.preventDefault()
        /*if(!value) return
        addTerm(value)
        setValue('') */
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

const HomeSearch = () => {

    const [search_value, setSearchValue ] = useState('')
    const [search_results, setData ] = useState({})
    const [edit_view, setEditView ] = useState(false)
    const [edit_item, setEditItem ] = useState({})
    const [page, setPage ] = useState(1)
        //

    useEffect(() => {
        getSearchResults(search_value, page)
            .then((results) => {
                setData(results)
            })

        console.log(search_value)
        console.log('*********** SEARCH VALUE *************')
        console.log('*********** SEARCH DATA *************')
        console.log('*********** SEARCH DATA *************')
        console.log(search_results)
        console.log('*********** SEARCH DATA *************')
        console.log('*********** SEARCH DATA *************')
    },[search_value])


    // Updates search term and search results
    const addTerm = (text) => {
        getSearchResults(text, page)
            .then((results) => {
                setData(results)
            })

        const search_term = text;
        setSearchValue(search_term)
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

        console.log(edit_item)
        console.log('||||||||||||  UPDATED BELOW EDIT ITEM ABOVE |||||||||||||||')
        console.log(updated)

        if (updated === 'cancel_update' ||
            (edit_item.title === updated.title && edit_item.comment === updated.comment)) {
            // reset view and don't update item
            if (edit_view) {
                setEditItem({})
                setEditView(false)
            }

            alert('NOT UPDASTED')

            // TODO:: return
        } else {

            alert('Should be udated')


            let updated_items = [...search_results]

            updated_items.map(item => {

                if (item.id === edit_item.id) {
                    item.title = updated.title
                    item.comment = updated.comment
                }
            })

            setData(updated_items)
            console.log(updated_items)
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')
            console.log('|||||||||||||| THE UPDATED ||||||||||||||||||')


            const test = await updateItemRq({id: edit_item.id, comment : updated.comment, title: updated.title})

            console.log(test)
            console.log('***********************   TET ABOVBE ********************')
            console.log('***********************   TET ABOVBE ********************')
            console.log('***********************   TET ABOVBE ********************')
            console.log('***********************   TET ABOVBE ********************')
            console.log('***********************   TET ABOVBE ********************')

            setEditItem({})
            setEditView(false)



        }

        // else send item to be updated

        console.log(search_results)
        console.log('*********** UPDATED DATA SET AGAIN *******************')
        //const response = resetPassword(data);



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

    return (
        <div>
            <SearchForm
                addTerm={addTerm}
                term={search_value}
            />
            <CreateItemForm
            />
            <EditItem
                item={edit_item}
                view={edit_view}
                handleUpdated={handleUpdated}
            />
            <DataTable
                theme="solarized"
                columns={columns}
                data={search_results.items}
                title='DB ID items...'
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                defaultSortField="id"
                defaultSortAsc={true}

            />
        </div>
    );
};

export default HomeSearch;
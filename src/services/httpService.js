const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    timeout: 2500,
    headers: {'Content-Type': 'application/json'}
});

// TODO:: add token

function getSearchResults(term, page) {

    return instance.post('http://127.0.0.1:5000/api/search-results',{
            text: term,
            page: page,
            limit: 10})
        .then((res) => {
            const { data: results } = res
            return results
        })
        .catch((ex) => {
            console.log(ex)

            return {items: [], items_pp: 50, page: 1, pages: [], error: ex.message}
        })

}

async function updateItemRq(item){

    try {

        const updated = await instance.put(`/item/${item.id}`,
            {
                comment: item.comment,
                title: item.title
            }
            )

        if (updated.status === 200) {

            return updated.data
        }


    } catch (e) {

        console.log(e)
    }
}

async function createItemRq(item){

    try {

        const created = await instance.post(`/new-item`,
            {
                comment: item.comment,
                title: item.title
            }
        )

        if (created.status === 200) {

            return created.data
        }

    } catch (e) {

        console.log(e)
    }
}

module.exports = {
    getSearchResults,
    updateItemRq,
    createItemRq
}
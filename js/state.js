// state.js

export const state = {

    // Current page
    page: 1,

    // Records per page
    pageSize: 5,

    // Current sort settings
    sort: {

        column: null,

        direction: "none"

    },

    // Current filter settings
    filter: {

        search: "",

        businessUnit: "",

        status: ""

    }

};

//------------------------------
// Page
//------------------------------

export function setPage(page) {

    state.page = page;

}

export function getPage() {

    return state.page;

}

//------------------------------
// Sort
//------------------------------

export function setSort(column, direction) {

    state.sort.column = column;

    state.sort.direction = direction;

}

export function getSort() {

    return state.sort;

}

//------------------------------
// Filter
//------------------------------

export function setFilter(filter) {

    state.filter = {

        ...state.filter,

        ...filter

    };

}

export function getFilter() {

    return state.filter;

}

//------------------------------
// Reset page
//------------------------------

export function resetPage() {

    state.page = 1;

}
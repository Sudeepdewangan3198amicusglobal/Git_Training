import { state, resetPage } from "./state.js";
import { render } from "./list.js";

const searchInput =
    document.getElementById("search");

const businessUnit =
    document.getElementById("bu");

const status =
    document.getElementById("status");

let debounceTimer;

let controller = null;

function debounce(callback, delay = 300) {

    return (...args) => {

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

function updateURL() {

    const params =
        new URLSearchParams();

    if (state.filter.search) {

        params.set(
            "search",
            state.filter.search
        );

    }

    if (state.filter.businessUnit) {

        params.set(
            "bu",
            state.filter.businessUnit
        );

    }

    if (state.filter.status) {

        params.set(
            "status",
            state.filter.status
        );

    }

    history.replaceState(

        {},

        "",

        `${location.pathname}?${params.toString()}`

    );

}

export async function applyFilters() {

    if (controller) {

        controller.abort();

    }

    controller =
        new AbortController();

    const signal =
        controller.signal;

    state.filter.search =
        searchInput.value
            .trim()
            .toLowerCase();

    state.filter.businessUnit =
        businessUnit.value;

    state.filter.status =
        status.value;

    resetPage();

    updateURL();

    try {

        await searchAttributes(signal);

        render();

    }

    catch (error) {

        if (error.name === "AbortError") {

            return;

        }

        console.error(error);

        alert(
            "Something went wrong while searching."
        );

    }

}

function searchAttributes(signal) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (signal.aborted) {

                reject(

                    new DOMException(

                        "Request cancelled",

                        "AbortError"

                    )

                );

                return;

            }

            resolve();

        }, 0);

    });

}

export function loadFiltersFromURL() {

    const params =
        new URLSearchParams(
            location.search
        );

    state.filter.search =
        params.get("search") || "";

    state.filter.businessUnit =
        params.get("bu") || "";

    state.filter.status =
        params.get("status") || "";

    searchInput.value =
        state.filter.search;

    businessUnit.value =
        state.filter.businessUnit;

    status.value =
        state.filter.status;

}

export function initializeFilters() {

    loadFiltersFromURL();

    searchInput.addEventListener(

        "input",

        debounce(

            applyFilters,

            300

        )

    );

    businessUnit.addEventListener(

        "change",

        applyFilters

    );

    status.addEventListener(

        "change",

        applyFilters

    );

}
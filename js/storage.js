const KEYS = Object.freeze({

    ATTRIBUTES: "ams.attributes",
    BUSINESS_UNITS: "ams.businessUnits",
    LOCATIONS: "ams.locations",
    COMPANIES: "ams.companies",
    THEME: "ams.theme",
    SEED_VERSION: "ams.seedVersion"

});

const CURRENT_SEED_VERSION = "1.0.0";

const DATA_FILES = [

    {
        key: KEYS.ATTRIBUTES,
        path: "./data/attributes.json"
    },

    {
        key: KEYS.BUSINESS_UNITS,
        path: "./data/businessUnits.json"
    },

    {
        key: KEYS.LOCATIONS,
        path: "./data/locations.json"
    },

    {
        key: KEYS.COMPANIES,
        path: "./data/companies.json"
    }

];

function read(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {

            return fallback;

        }

        return JSON.parse(value);

    }

    catch (error) {

        console.error(

            `Unable to read "${key}"`,

            error

        );

        return fallback;

    }

}

function write(key, value) {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch (error) {

        console.error(

            `Unable to write "${key}"`,

            error

        );

        return false;

    }

}

function remove(key) {

    localStorage.removeItem(key);

}

function clearAll() {

    Object.values(KEYS).forEach(

        key => remove(key)

    );

}

async function loadSeedData() {

    const responses = await Promise.all(

        DATA_FILES.map(

            async file => {

                const response = await fetch(file.path);

                if (!response.ok) {

                    throw new Error(

                        `${file.path} (${response.status})`

                    );

                }

                return {

                    key: file.key,

                    data: await response.json()

                };

            }

        )

    );

    responses.forEach(

        item => {

            write(

                item.key,

                item.data

            );

        }

    );

    write(

        KEYS.SEED_VERSION,

        CURRENT_SEED_VERSION

    );

}

export async function initializeStorage() {

    const version = read(

        KEYS.SEED_VERSION

    );

    if (

        version === CURRENT_SEED_VERSION

    ) {

        return;

    }

    await loadSeedData();

}

export async function reset() {

    clearAll();

    await loadSeedData();

}

export function getAttributes() {

    return read(

        KEYS.ATTRIBUTES,

        []

    );

}

export function saveAttributes(data) {

    return write(

        KEYS.ATTRIBUTES,

        data

    );

}

export function getBusinessUnits() {

    return read(

        KEYS.BUSINESS_UNITS,

        []

    );

}

export function getLocations() {

    return read(

        KEYS.LOCATIONS,

        []

    );

}

export function getCompanies() {

    return read(

        KEYS.COMPANIES,

        []

    );

}

export function getTheme() {

    return read(

        KEYS.THEME,

        null

    );

}

export function saveTheme(theme) {

    return write(

        KEYS.THEME,

        theme

    );

}

export {

    KEYS,

    read,
    write,
    remove

};

export default {

    initializeStorage,
    reset,

    getAttributes,
    saveAttributes,

    getBusinessUnits,
    getLocations,
    getCompanies,

    getTheme,
    saveTheme,

    read,
    write,
    remove

};
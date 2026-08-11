import {

    getBusinessUnits,
    getLocations,
    getCompanies

} from "./storage.js";

export function loadBusinessUnits() {

    return getBusinessUnits();

}

export function loadLocations() {

    return getLocations();

}

export function loadCompanies() {

    return getCompanies();

}

export function getLocationsByBusinessUnit(

    businessUnitId

) {

    return getLocations().filter(

        location =>

            String(location.businessUnitId) ===

            String(businessUnitId)

    );

}

export function populateSelect(

    select,

    items,

    {

        valueKey = "id",

        textKey = "name",

        placeholder = "Select"

    } = {}

) {

    if (!select) {

        return;

    }

    select.replaceChildren();

    const placeholderOption =

        document.createElement("option");

    placeholderOption.value = "";

    placeholderOption.textContent = placeholder;

    select.append(placeholderOption);

    items.forEach(

        item => {

            const option =

                document.createElement("option");

            option.value = item[valueKey];

            option.textContent = item[textKey];

            select.append(option);

        }

    );

}

export function populateBusinessUnits(

    select

) {

    populateSelect(

        select,

        loadBusinessUnits(),

        {

            placeholder:

                "Select Business Unit"

        }

    );

}

export function populateCompanies(

    select

) {

    populateSelect(

        select,

        loadCompanies(),

        {

            placeholder:

                "Select Company"

        }

    );

}

export function populateLocations(

    select,

    businessUnitId

) {

    if (!select) {

        return;

    }

    if (!businessUnitId) {

        populateSelect(

            select,

            [],

            {

                placeholder:

                    "Select a Business Unit first"

            }

        );

        select.disabled = true;

        return;

    }

    const locations =

        getLocationsByBusinessUnit(

            businessUnitId

        );

    populateSelect(

        select,

        locations,

        {

            placeholder:

                "Select Location"

        }

    );

    select.disabled = false;

}

export function initializeLookups({

    businessUnitSelect,

    locationSelect,

    companySelect

}) {

    populateBusinessUnits(

        businessUnitSelect

    );

    populateCompanies(

        companySelect

    );

    populateLocations(

        locationSelect,

        ""

    );

    businessUnitSelect?.addEventListener(

        "change",

        event => {

            populateLocations(

                locationSelect,

                event.target.value

            );

        }

    );

}

export default {

    loadBusinessUnits,
    loadLocations,
    loadCompanies,
    getLocationsByBusinessUnit,
    populateSelect,
    populateBusinessUnits,
    populateCompanies,
    populateLocations,
    initializeLookups

};
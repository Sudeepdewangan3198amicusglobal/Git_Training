import {

    getAttributes,
    saveAttributes

} from "./storage.js";

const generateId = attributes => {

    if (attributes.length === 0) {

        return 1;

    }

    return Math.max(

        ...attributes.map(

            attribute => Number(attribute.id)

        )

    ) + 1;

};

export function getAll() {

    return getAttributes();

}

export function getById(id) {

    return getAttributes().find(

        attribute =>

            String(attribute.id) === String(id)

    ) || null;

}

export function save(attribute) {

    const attributes = getAttributes();

    if (attribute.id) {

        const index = attributes.findIndex(

            item =>

                String(item.id) ===

                String(attribute.id)

        );

        if (index !== -1) {

            attributes[index] = {

                ...attributes[index],

                ...attribute

            };

        }

        else {

            attributes.push(attribute);

        }

    }

    else {

        attribute.id = generateId(attributes);

        attributes.push(attribute);

    }

    saveAttributes(attributes);

    return attribute;

}

export function remove(id) {

    const attributes = getAttributes().filter(

        attribute =>

            String(attribute.id) !== String(id)

    );

    saveAttributes(attributes);

    return attributes;

}

export function reset(data = []) {

    saveAttributes(data);

}

export function search(attributes, query) {

    if (!query) {

        return [...attributes];

    }

    const keyword = query

        .trim()

        .toLowerCase();

    return attributes.filter(

        attribute =>

            attribute.attributeName

                .toLowerCase()

                .includes(keyword)

    );

}

export function filter(

    attributes,

    {

        businessUnitId = "",

        customerLocationId = "",

        companyId = "",

        isActive = ""

    } = {}

) {

    return attributes.filter(

        attribute => {

            if (

                businessUnitId &&

                String(attribute.businessUnitId) !==

                String(businessUnitId)

            ) {

                return false;

            }

            if (

                customerLocationId &&

                String(attribute.customerLocationId) !==

                String(customerLocationId)

            ) {

                return false;

            }

            if (

                companyId &&

                String(attribute.companyId) !==

                String(companyId)

            ) {

                return false;

            }

            if (

                isActive !== "" &&

                String(attribute.isActive) !==

                String(isActive)

            ) {

                return false;

            }

            return true;

        }

    );

}

export function sort(

    attributes,

    field,

    direction = "ascending"

) {

    const sorted = [...attributes];

    sorted.sort(

        (a, b) => {

            let valueA = a[field];

            let valueB = b[field];

            if (

                valueA === undefined ||

                valueB === undefined

            ) {

                return 0;

            }

            if (

                field.toLowerCase().includes("date") ||

                field.endsWith("On")

            ) {

                valueA = new Date(valueA);

                valueB = new Date(valueB);

                return direction === "ascending"

                    ? valueA - valueB

                    : valueB - valueA;

            }

            if (

                typeof valueA === "boolean"

            ) {

                return direction === "ascending"

                    ? Number(valueA) - Number(valueB)

                    : Number(valueB) - Number(valueA);

            }

            const result = String(valueA)

                .localeCompare(

                    String(valueB),

                    undefined,

                    {

                        numeric: true,

                        sensitivity: "base"

                    }

                );

            return direction === "ascending"

                ? result

                : -result;

        }

    );

    return sorted;

}

export function paginate(

    attributes,

    page = 1,

    pageSize = 5

) {

    const totalItems =

        attributes.length;

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                totalItems / pageSize

            )

        );

    const currentPage =

        Math.min(

            Math.max(page, 1),

            totalPages

        );

    const start =

        (currentPage - 1) *

        pageSize;

    return {

        items: attributes.slice(

            start,

            start + pageSize

        ),

        page: currentPage,

        pageSize,

        totalItems,

        totalPages

    };

}

export default {

    getAll,
    getById,
    save,
    remove,
    reset,
    search,
    filter,
    sort,
    paginate

};
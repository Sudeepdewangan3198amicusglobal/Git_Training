export function render(attributes, container) {

        if (!container) {
            return;
        }


        container.innerHTML = "";


        if (!attributes.length) {

            container.innerHTML = `
                <tr>
                    <td colspan="5">
                        No attributes found
                    </td>
                </tr>
            `;

            return;
        }


        attributes.forEach(attribute => {

            const row = document.createElement("tr");


            row.innerHTML = `
                <td>${attribute.id}</td>
                <td>${attribute.name}</td>
                <td>${attribute.type || "-"}</td>
                <td>${attribute.status}</td>
                <td>
                    <button 
                        type="button"
                        data-action="edit"
                        data-id="${attribute.id}">
                        Edit
                    </button>

                    <button
                        type="button"
                        data-action="delete"
                        data-id="${attribute.id}">
                        Delete
                    </button>
                </td>
            `;


            container.appendChild(row);

        });

    }

const AttributeList = (() => {

    


    function filter(attributes, keyword) {

        if (!keyword) {
            return attributes;
        }


        const value = keyword
            .toLowerCase()
            .trim();


        return attributes.filter(attribute =>
            attribute.name
                .toLowerCase()
                .includes(value)
        );

    }


    function sort(attributes, key, direction = "asc") {

        return [...attributes].sort((a, b) => {

            const first = String(a[key])
                .toLowerCase();

            const second = String(b[key])
                .toLowerCase();


            if (direction === "desc") {
                return second.localeCompare(first);
            }


            return first.localeCompare(second);

        });

    }


    function getSelectedId(event) {

        const target = event.target.closest(
            "[data-id]"
        );


        if (!target) {
            return null;
        }


        return target.dataset.id;

    }


    return {
        render,
        filter,
        sort,
        getSelectedId
    };

})();
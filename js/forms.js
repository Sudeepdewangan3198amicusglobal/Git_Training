const Forms = (() => {

    function getAttributeFormData(form) {

        const formData = new FormData(form);

        return {
            id: formData.get("id") || null,
            name: formData.get("attributeName").trim(),
            description: formData.get("description")
                ? formData.get("description").trim()
                : "",
            type: formData.get("type") || "",
            status: formData.get("status") || "active",
            createdAt: new Date().toISOString()
        };

    }


    function fillAttributeForm(form, attribute) {

        if (!form || !attribute) {
            return;
        }


        const idField = form.querySelector("#id");
        const nameField = form.querySelector("#attributeName");
        const descriptionField = form.querySelector("#description");
        const typeField = form.querySelector("#type");
        const statusField = form.querySelector("#status");


        if (idField) {
            idField.value = attribute.id;
        }


        if (nameField) {
            nameField.value = attribute.name;
        }


        if (descriptionField) {
            descriptionField.value = attribute.description || "";
        }


        if (typeField) {
            typeField.value = attribute.type || "";
        }


        if (statusField) {
            statusField.value = attribute.status || "active";
        }

    }


    function resetForm(form) {

        if (!form) {
            return;
        }


        form.reset();

        const idField = form.querySelector("#id");

        if (idField) {
            idField.value = "";
        }

    }


    function disableSubmit(form, state = true) {

        const button = form.querySelector(
            '[type="submit"]'
        );


        if (!button) {
            return;
        }


        button.disabled = state;

    }


    function getFormMode(form) {

        return form.dataset.mode || "create";

    }


    return {
        getAttributeFormData,
        fillAttributeForm,
        resetForm,
        disableSubmit,
        getFormMode
    };

})();
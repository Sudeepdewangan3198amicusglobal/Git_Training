const Validation = (() => {

    function required(value) {
        return value.trim().length > 0;
    }


    function attributeName(value) {

        if (!required(value)) {
            return "Attribute name is required";
        }

        if (value.trim().length < 3) {
            return "Attribute name must contain minimum 3 characters";
        }

        if (value.trim().length > 50) {
            return "Attribute name cannot exceed 50 characters";
        }

        return "";
    }


    function duplicateAttributeName(name, attributes, currentId = null) {

        return attributes.some(attribute =>
            attribute.name.toLowerCase() === name.toLowerCase()
            &&
            attribute.id !== currentId
        );

    }


    function validateAttributeForm(form, attributes = []) {

        const nameInput = form.querySelector("#attributeName");

        const errorBox = form.querySelector(
            '[data-error-for="attributeName"]'
        );


        if (!nameInput) {
            return false;
        }


        let error = attributeName(nameInput.value);


        if (
            !error &&
            duplicateAttributeName(
                nameInput.value.trim(),
                attributes,
                form.dataset.id
            )
        ) {
            error = "Attribute name already exists";
        }


        if (error) {

            nameInput.classList.add("is-invalid");

            nameInput.setAttribute(
                "aria-invalid",
                "true"
            );

            if (errorBox) {
                errorBox.textContent = error;
            }

            return false;
        }


        nameInput.classList.remove("is-invalid");

        nameInput.setAttribute(
            "aria-invalid",
            "false"
        );


        if (errorBox) {
            errorBox.textContent = "";
        }


        return true;
    }


    function clear(form) {

        form.querySelectorAll(".is-invalid")
            .forEach(field => {

                field.classList.remove("is-invalid");

                field.removeAttribute(
                    "aria-invalid"
                );

            });


        form.querySelectorAll("[data-error-for]")
            .forEach(error => {

                error.textContent = "";

            });

    }


    return {
        validateAttributeForm,
        clear
    };

})();
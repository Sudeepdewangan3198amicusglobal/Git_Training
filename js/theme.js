/* ==========================================================
   Theme Manager
   ========================================================== */

const Theme = (() => {

    /* ------------------------------------------------------
       Configuration
       ------------------------------------------------------ */

    const KEY = "attribute-theme";


    /* ------------------------------------------------------
       Apply Theme
       ------------------------------------------------------ */

    function apply(theme) {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            KEY,
            theme
        );

    }


    /* ------------------------------------------------------
       Update Theme Toggle Button
       ------------------------------------------------------ */

    function updateButton(theme) {

        const button = document.querySelector(
            "#theme-toggle"
        );

        if (button) {

            button.textContent =
                theme === "dark"
                    ? "☀️"
                    : "🌙";

            button.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        }

    }


    /* ------------------------------------------------------
       Get Saved Theme
       ------------------------------------------------------ */

    function getSavedTheme() {

        return (
            localStorage.getItem(KEY) ||
            "light"
        );

    }


    /* ------------------------------------------------------
       Toggle Theme
       ------------------------------------------------------ */

    function toggle() {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            ) || "light";


        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        apply(nextTheme);

        updateButton(nextTheme);

    }


    /* ------------------------------------------------------
       Initialize Theme
       ------------------------------------------------------ */

    function init() {

        const savedTheme =
            getSavedTheme();


        apply(savedTheme);

        updateButton(savedTheme);


        const button =
            document.querySelector(
                "#theme-toggle"
            );


        if (button) {

            button.addEventListener(
                "click",
                toggle
            );

        }

    }


    /* ------------------------------------------------------
       Public Methods
       ------------------------------------------------------ */

    return {

        init,

        toggle

    };

})();
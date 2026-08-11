// main.js
import { state } from "./state.js";
import { initializeStorage } from "./storage.js";
import { initializeFilters } from "./filter.js";
import { render } from "./list.js";

document.addEventListener("DOMContentLoaded", async () => {

    //----------------------------------
    // Navigation
    //----------------------------------

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    document.querySelectorAll("nav a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

    //----------------------------------
    // Skip Link
    //----------------------------------

    const skipLink = document.querySelector(".skip-link");

    if (skipLink) {

        skipLink.addEventListener("click", () => {

            const main = document.getElementById("main-content");

            if (main) {

                main.setAttribute("tabindex", "-1");
                main.focus();

            }

        });

    }
    

    //----------------------------------
    // Load Storage
    //----------------------------------

    await initializeStorage();

    //----------------------------------
    // Filters (Index Page Only)
    //----------------------------------

    if (document.getElementById("filterForm")) {

        initializeFilters();

    }

    //----------------------------------
    // Render Table (Index Page Only)
    //----------------------------------

    if (document.getElementById("attributeTableBody")) {

        render();

    }

    //----------------------------------
    // Success Toast
    //----------------------------------

    const params = new URLSearchParams(location.search);

    const message = params.get("msg");

    const toast = document.getElementById("toast");

    if (message && toast) {

        toast.hidden = false;

        toast.textContent =
            message === "created"
                ? "Attribute created successfully."
                : "Attribute updated successfully.";

        setTimeout(() => {

            toast.hidden = true;

        }, 3000);

        history.replaceState({}, "", location.pathname);

    }

    //----------------------------------
    // Retry Button
    //----------------------------------

    const retry = document.getElementById("retry-btn");

    if (retry) {

        retry.addEventListener("click", async () => {

            await initializeStorage();

            if (document.getElementById("attributeTableBody")) {

                render();

            }

        });

    }

});
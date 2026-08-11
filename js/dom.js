export const $ = (selector, scope = document) =>
    scope.querySelector(selector);

export const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];

export const on = (
    element,
    event,
    handler,
    options = {}
) => {

    if (!element) return;

    element.addEventListener(
        event,
        handler,
        options
    );

    return () =>
        element.removeEventListener(
            event,
            handler,
            options
        );

};

export const createEl = (
    tag,
    options = {}
) => {

    const element = document.createElement(tag);

    const {
        className,
        id,
        text,
        html,
        attrs = {},
        dataset = {}
    } = options;

    if (className) {

        element.className = className;

    }

    if (id) {

        element.id = id;

    }

    if (text !== undefined) {

        element.textContent = text;

    }

    if (html !== undefined) {

        element.innerHTML = html;

    }

    Object.entries(attrs).forEach(

        ([key, value]) => {

            if (
                value !== null &&
                value !== undefined
            ) {

                element.setAttribute(
                    key,
                    value
                );

            }

        }

    );

    Object.entries(dataset).forEach(

        ([key, value]) => {

            element.dataset[key] = value;

        }

    );

    return element;

};

export const fragment = () =>
    document.createDocumentFragment();

export const clear = element => {

    if (!element) return;

    element.replaceChildren();

};

export const append = (
    parent,
    ...children
) => {

    if (!parent) return;

    parent.append(...children);

};

export const show = element => {

    if (!element) return;

    element.hidden = false;

};

export const hide = element => {

    if (!element) return;

    element.hidden = true;

};

export const toggle = (
    element,
    state
) => {

    if (!element) return;

    element.hidden = !state;

};

export const setText = (
    element,
    text
) => {

    if (!element) return;

    element.textContent = text;

};

export const setHTML = (
    element,
    html
) => {

    if (!element) return;

    element.innerHTML = html;

};

export const setAttributes = (
    element,
    attributes
) => {

    if (!element) return;

    Object.entries(attributes).forEach(

        ([key, value]) => {

            if (
                value === null ||
                value === undefined
            ) {

                element.removeAttribute(key);

            } else {

                element.setAttribute(
                    key,
                    value
                );

            }

        }

    );

};

export const removeChildren = element => {

    if (!element) return;

    while (element.firstChild) {

        element.removeChild(
            element.firstChild
        );

    }

};

export const isElement = value =>
    value instanceof HTMLElement;

export default {

    $,
    $$,
    on,
    createEl,
    fragment,
    clear,
    append,
    show,
    hide,
    toggle,
    setText,
    setHTML,
    setAttributes,
    removeChildren,
    isElement

};


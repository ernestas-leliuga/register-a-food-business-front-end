import { css } from "emotion";

const AccessibleAutocompleteCSS = css`
    .autocomplete__option {
        span.searchTermResult {
            color: #6f777b;
        }
        &:hover {
            span.searchTermResult {
                color: #ffffff;
            }
        }
    }
    .autocomplete__wrapper {
        position: relative;
    }
    .autocomplete__hint,
    .autocomplete__input {
        -webkit-appearance: none;
        border: 2px solid;
        border-radius: 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin-bottom: 0;
        width: 100%;
    }
    .autocomplete__input {
        background-color: transparent;
        position: relative;
    }
    .autocomplete__hint {
        color: #bfc1c3;
        position: absolute;
    }
    .autocomplete__input--default {
        padding: 4px;
    }
    .autocomplete__input--focused {
        outline-offset: 0;
        outline: 3px solid #ffbf47;
    }
    .autocomplete__input--show-all-values {
        padding: 4px 34px 4px 4px;
        cursor: pointer;
    }
    .autocomplete__dropdown-arrow-down {
        z-index: -1;
        display: inline-block;
        position: absolute;
        right: 8px;
        width: 24px;
        height: 24px;
        top: 10px;
    }
    .autocomplete__menu {
        background-color: #fff;
        border: 2px solid #0b0c0c;
        border-top: 0;
        color: #34384b;
        margin: 0;
        max-height: 342px;
        overflow-x: hidden;
        padding: 0;
        width: 100%;
        width: calc(100% - 4px);
    }
    .autocomplete__menu--visible {
        display: block;
    }
    .autocomplete__menu--hidden {
        display: none;
    }
    .autocomplete__menu--overlay {
        box-shadow: rgba(0, 0, 0, 0.256863) 0 2px 6px;
        left: 0;
        position: absolute;
        top: 100%;
        z-index: 100;
    }
    .autocomplete__menu--inline {
        position: relative;
    }
    .autocomplete__option {
        border-bottom: solid #bfc1c3;
        border-width: 1px 0;
        cursor: pointer;
        display: block;
        position: relative;
    }
    .autocomplete__option > * {
        pointer-events: none;
    }
    .autocomplete__option:first-of-type {
        border-top-width: 0;
    }
    .autocomplete__option:last-of-type {
        border-bottom-width: 0;
    }
    .autocomplete__option--odd {
        background-color: #fafafa;
    }
    .autocomplete__option--focused,
    .autocomplete__option:hover {
        background-color: #005ea5;
        border-color: #005ea5;
        color: #fff;
        outline: 0;
    }
    .autocomplete__option--no-results {
        background-color: #fafafa;
        color: #646b6f;
        cursor: not-allowed;
    }
    .autocomplete__hint,
    .autocomplete__input,
    .autocomplete__option {
        font-size: 16px;
        line-height: 1.25;
    }
    .autocomplete__hint,
    .autocomplete__option {
        padding: 4px;
    }
    @media (min-width: 641px) {
        .autocomplete__hint,
        .autocomplete__input,
        .autocomplete__option {
            font-size: 19px;
            line-height: 1.31579;
        }
    }
`;

export default AccessibleAutocompleteCSS;

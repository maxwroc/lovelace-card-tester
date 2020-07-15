import { LitElement, html, css } from "https://unpkg.com/lit-element@2.0.0/lit-element.js?module";

customElements.define("home-assistant-main", class extends LitElement {
    render() {
        return html`<p>home-assistant-main</p>`;
    }
});

customElements.define("ha-card", class extends LitElement {
    static get styles() {
        return css`
        :host {
            display: block;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #434954;
            margin: 10px;
        }
        .card-header, :host ::slotted(.card-header) {
            color: var(--ha-card-header-color, --primary-text-color);
            font-family: var(--ha-card-header-font-family, inherit);
            font-size: var(--ha-card-header-font-size, 24px);
            letter-spacing: -0.012em;
            line-height: 32px;
            display: block;
            padding: 24px 16px 16px;
        }
        :host ::slotted(.card-content) {
            padding: 16px;
        }
        :host ::slotted(.card-content:not(:first-child)), slot:not(:first-child)::slotted(.card-content) {
            padding-top: 0px;
            margin-top: -8px;
        }
        `;
    }

    render() {
        return html`<slot></slot>`;
    }
});

customElements.define("ha-icon", class extends LitElement {
    static get styles() {
        return css`
        :host {
            display: block;
            align-items: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: currentcolor;
            width: var(--mdc-icon-size, 24px);
            height: var(--mdc-icon-size, 24px);
            margin: 13px;
        }
        `;
    }
    render() {
        return html`<svg preserveAspectRatio="xMidYMid meet" focusable="false" viewBox="0 0 24 24">
            <g>
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"></path>
            </g>
        </svg>`;
    }
});

LitElement.prototype.css = css;
LitElement.prototype.html = html;
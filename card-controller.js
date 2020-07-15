
class CardController {
    cardSource = "https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js";

    cardType = null;

    card = null;

    config = null;

    editor = {
        config: null,
        state: null
    }

    cardLoaded = false;

    constructor() {
        this.addCardSource();

        this.editor.config = new CodeFlask("#configEditor", { language: "yaml", lineNumbers: true });
        this.editor.config.addLanguage("yaml", CodeLangs.languages["yaml"]);
        // trigger re-rendering
        this.editor.config.updateCode(this.editor.config.getCode());

        this.editor.state = new CodeFlask("#haStateEditor", { language: "json", lineNumbers: true });
        this.editor.state.addLanguage("json", CodeLangs.languages["json"]);
        // trigger re-rendering
        this.editor.state.updateCode(this.editor.state.getCode());


        this.editor.config.onUpdate(() => this.updateConfig());
        this.editor.state.onUpdate(() => this.updateState());

        // start processing config
        this.updateConfig();
    }

    addCardSource() {
        const elem = document.createElement("script");
        elem.setAttribute("src", this.cardSource);
        elem.setAttribute("type", "text/javascript");
        $("head").append(elem);
    }

    loadCard() {
        this.cardLoaded = false;

        customElements.whenDefined(this.cardType).then(() => {
            this.card = document.createElement(this.cardType);
            this.card.setConfig(this.config);
            $("#cardContainer").html("").append(this.card);

            console.log("loaded");
            this.cardLoaded = true;

            // triggering config update
            this.updateConfig();
        });
    }

    updateConfig() {

        try {
            this.config = jsyaml.load(this.editor.config.getCode());

            if (!this.config.type) {
                throw new Error("Missing propery 'type' in card configuration");
            }

            if (this.config.type != this.cardType) {
                this.cardType = this.config.type;
                this.loadCard();
                return;
            }

            if (!this.cardLoaded) {
                return;
            }

            this.card.setConfig(this.config);

            this.updateState();
        }
        catch (e) {
            console.log(e);
        }
    }

    updateState() {
        if (!this.cardLoaded) {
            return;
        }

        try {
            const hass = {
                states: JSON.parse(this.editor.state.getCode()),
                localize: key => `[${key}]`
            }

            this.card.hass = hass;
        }
        catch (e) {
            console.log(e)
        }
    }
}

$(() => new CardController());
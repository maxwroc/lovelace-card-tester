
class CardController {
    cardSource = "cards/dist/battery-state-card.js" //"https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js";

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

        let errorLine = -1;
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
            if (e.mark) {
                errorLine = e.mark.line - 1;
            }
            else {
                console.log(e);
            }
        }

        setTimeout(() => {
            $("#configEditor .codeflask__lines__line").each((i, elem) => {
                $(elem).css("backgroundColor", i == errorLine ? "#ffacac" : "none");
            });
        });
    }

    updateState() {
        if (!this.cardLoaded) {
            return;
        }

        const jsonStr = this.editor.state.getCode();

        let errorLine = -1;

        try {
            const hass = {
                states: JSON.parse(jsonStr),
                localize: key => `[${key}]`
            }

            this.card.hass = hass;
        }
        catch (e) {
            const searchString = "in JSON at position ";
            const foundIndex = e.message.indexOf(searchString);
            if (foundIndex != -1) {
                const errorPos = Number(e.message.substr(foundIndex + searchString.length));
                errorLine = jsonStr.split("\n").length - jsonStr.substr(errorPos).split("\n").length;
            }
            else {
                console.log(e);
            }
        }

        setTimeout(() => {
            $("#haStateEditor .codeflask__lines__line").each((i, elem) => {
                $(elem).css("backgroundColor", i == errorLine ? "#ffacac" : "none");
            });
        });
    }
}

$(() => new CardController());
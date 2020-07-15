
class CardController {

    cardType = null;

    card = null;

    config = null;

    editor = {
        config: null,
        state: null
    }

    cardLoaded = false;

    constructor(data) {
        this.addCardSource(data.cardSource);

        this.editor.config = new CodeFlask("#configEditor", { language: "yaml", lineNumbers: true });
        this.editor.config.addLanguage("yaml", CodeLangs.languages["yaml"]);
        // trigger re-rendering
        this.editor.config.updateCode(data.config);

        this.editor.state = new CodeFlask("#haStateEditor", { language: "json", lineNumbers: true });
        this.editor.state.addLanguage("json", CodeLangs.languages["json"]);
        // trigger re-rendering
        this.editor.state.updateCode(JSON.stringify(data.hassState, null, 2));

        this.editor.config.onUpdate(() => this.updateConfig());
        this.editor.state.onUpdate(() => this.updateState());

        $("#save").click(() => this.save(data));

        // start processing config
        this.updateConfig();
    }

    addCardSource(source) {
        const elem = document.createElement("script");
        elem.setAttribute("src", source);
        elem.setAttribute("type", "text/javascript");
        $("head").append(elem);
    }

    loadCard() {
        this.cardLoaded = false;

        customElements.whenDefined(this.cardType).then(() => {
            this.card = document.createElement(this.cardType.replace("custom:"));
            this.card.setConfig(this.config);
            $("#cardContainer").html("").append(this.card);

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
                errorLine = e.mark.line;
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

    save(data) {
        // disabling button to avoid multiclick
        $("#save").prop("disabled", true);

        Storage.save({
            cardSource: data.cardSource,
            config: this.editor.config.getCode(),
            hassState: JSON.parse(this.editor.state.getCode())
        }).then(state => {
            $("#save").prop("disabled", false);

            let output = "Something went wrong";
            try {
                if (state.success) {
                    const url = new URL(location.href);
                    url.searchParams.set("key", state.id);
                    output = url.href;
                    document.title = this.cardType + " - Lovelace card tester";
                    window.history.replaceState(null, document.title, output);
                }
                else {
                    console.log(state);
                    output = "Failed to save the data";
                }
            }
            catch (e) {
                output = "Error: " + e.message;
            }

            $("#savedLink").val(output);
        }).catch(e => {
            $("#save").prop("disabled", false);
            console.error(e);
        })
    }
}

$(() => {
    Storage.load().then(data => new CardController(data))
});
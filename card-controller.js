
class CardController {
    cardSource = "https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js";

    cardType = null;

    card = null;

    config = null;

    constructor() {
        this.addCardSource();
        this.updateConfig();

        $("#cardConfig").on("input", () => this.updateConfig());
    }

    addCardSource() {
        const elem = document.createElement("script");
        elem.setAttribute("src", this.cardSource);
        elem.setAttribute("type", "text/javascript");
        $("head").append(elem);
    }

    loadCard() {
        customElements.whenDefined(this.cardType).then(() => {
            this.card = document.createElement(this.cardType);
            this.card.setConfig(this.config);
            $("#cardContainer").html("").append(this.card);
        });
    }

    updateConfig() {
        try {
            this.config = jsyaml.load($("#cardConfig").val());

            if (!this.config.type) {
                throw new Error("Missing propery 'type' in card configuration");
            }

            if (this.config.type != this.cardType) {
                this.cardType = this.config.type;
                this.loadCard();
                return;
            }

            this.card.setConfig(this.config);
        }
        catch (e) {
            console.log(e);
        }
    }
}

$(() => new CardController());
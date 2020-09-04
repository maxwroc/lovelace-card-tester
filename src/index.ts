import { CardController } from "./card-controller";
import { Storage } from "./storage";
import { HomeAssistantMain, HaCard, HaIcon } from "./ha-card-polyfill";
import { logger } from "./logger";

customElements.define("home-assistant-main", <any>HomeAssistantMain);
customElements.define("ha-card", <any>HaCard);
customElements.define("ha-icon", <any>HaIcon);

$(() => {
    Storage
        .getData()
        .then(data => new CardController(data))
        .catch(reason => {
            logger.log(typeof reason != "string" ? JSON.stringify(reason) : reason);
        });
});
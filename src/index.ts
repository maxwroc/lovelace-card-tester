import { CardController } from "./card-controller";
import { Storage } from "./storage";
import { HomeAssistantMain, HaCard, HaIcon } from "./ha-card-polyfill";

customElements.define("home-assistant-main", <any>HomeAssistantMain);
customElements.define("ha-card", <any>HaCard);
customElements.define("ha-icon", <any>HaIcon);

$(() => {
    Storage.load().then(data => new CardController(data));
});
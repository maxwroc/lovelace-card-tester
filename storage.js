
const example = {
    cardSource: "https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js",
    config: `type: "battery-state-card"
title: Filtersr
sort_by_level: "asc"
bulk_rename:
  - from: "Battery Level" # simple string replace (note: "to" is not required if you want to remove string)
    to: "sensor"
  - from: "/\\\\s(temperature|temp)\\\\s/" # regular expression
    to: " temp. "
entities:
    # entities requiring additional properties can be added explicitly
  - entity: sensor.temp_outside_battery_numeric
    multiplier: 10
    name: "Outside temp. sensor"
filter:
  include: # filters for auto-adding
    - name: entity_id # entities which id ends with "_battery_level"
      value: "*_battery_level"
    - name: attributes.device_class # and entities which device_class attribute equals "battery"
      value: "battery"
    - name: attributes.battery_level`,
    hassState: {
        "climate.dachboden": {
            "entity": "climate.dachboden",
            "state": "off",
            "attributes": {
                "temperature": 0,
                "battery_level": 22,
                "device_class": "battery",
                "friendly_name": "Dachboden"
            }
        }
    }
}

class Storage {

    static secret = "$2b$10$/FL2EcEvEoUO19I7bO5da.q0YYqAgmTANU2kvh.WBP8FYTdP.6UYa";

    static save(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://api.jsonbin.io/b`,
                method: "POST",
                contentType: "application/json",
                headers: {
                    "secret-key": Storage.secret
                },
                data: JSON.stringify(data)
            })
            .done(response => resolve(response))
            .fail(xhr => reject(xhr));
        });
    }

    static get(key) {
        //const key = "5f0f1d9ac58dc34bf5d3f44c";

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://api.jsonbin.io/b/${key}`,
                headers: {
                    "secret-key": Storage.secret
                }
            })
            .done(response => resolve(response))
            .fail(xhr => reject(xhr));
        });
    }

    static load() {
        const url = new URL(location.href);
        const key = url.searchParams.get("key");
        return new Promise((resolve, reject) => {
            if (key) {
                Storage.get(key)
                    .then(result => resolve(result))
                    .catch(xhr => {
                        console.error(xhr);
                        resolve(example);
                    });
                return ;
            }

            resolve(example);
        })
    }
}
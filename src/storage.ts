export interface IConfigData {
    cardSource: string;
    config: string;
    hassState: any;
}

interface ISaveResult {
    success: boolean;
    id: string;
}


const example: IConfigData = {
    cardSource: "https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js",
    config: `type: "battery-state-card"
title: Filters
sort_by_level: "asc"
bulk_rename:
  - from: "Battery Level" # simple string replace (note: "to" is not required if you want to remove string)
    to: "sensor"
  - from: "/\\\\s(temperature|temp)\\\\s/" # regular expression
    to: " temp. "
filter:
  include: # filters for auto-adding
    - name: entity_id # entities which id ends with "_battery_level"
      operator: matches
      value: "*_battery_level"
    - name: attributes.device_class # and entities which device_class attribute equals "battery"
      value: "battery"
    - name: attributes.battery_level
  exclude:
    - name: state
      value: 100`,
    hassState: {
        "switch.living_room": {
            "entity_id": "switch.living_room",
            "state": "off",
            "attributes": {
                "temperature": 0,
                "battery_level": 60,
                "device_class": "battery",
                "friendly_name": "Living room switch"
            }
        },
        "sensor.motion_sensor_battery_level": {
            "entity_id": "sensor.motion_sensor_battery_level",
            "state": 22,
            "attributes": {
                "friendly_name": "Motion sensor Battery Level"
            }
        },
        "sensor.living_room_temp": {
            "entity_id": "sensor.living_room_temp",
            "state": 40,
            "attributes": {
                "friendly_name": "Living room temperature Battery Level",
                "device_class": "battery"
            }
        },
        "switch.living_room2": {
            "entity_id": "switch.living_room2",
            "state": "off",
            "attributes": {
                "temperature": 0,
                "battery_level": 100,
                "device_class": "battery",
                "friendly_name": "Living room switch 2"
            }
        },
        "sensor.motion_sensor_battery_level2": {
            "entity_id": "sensor.motion_sensor_battery_level2",
            "state": 100,
            "attributes": {
                "friendly_name": "Motion sensor Battery Level 2"
            }
        },
        "sensor.living_room_temp2": {
            "entity_id": "sensor.living_room_temp2",
            "state": 100,
            "attributes": {
                "friendly_name": "Living room temperature Battery Level 2",
                "device_class": "battery"
            }
        }
    }
}

export class Storage {

    /**
     * Gets the data from various sources
     */
    static getData(): Promise<IConfigData> {

        const url = new URL(location.href);
        const key = url.searchParams.get("key");

        if (key) {
            return JsonBinData.get(key);
        }

        return new Promise((resolve, reject) => {
            const result = LocalStorageData.get();
            resolve(result || example);
        });
    }

    /**
     * Called when save button is hit
     * @param data Data to save
     */
    static onSave(data: IConfigData): Promise<ISaveResult> {
        return JsonBinData.save(data);
    }

    /**
     * Called whenever editor state changes
     * @param data Data to update
     */
    static onUpdate(data: IConfigData) {
        LocalStorageData.save(data);
    }
}

class LocalStorageData {

    static key = "config";

    static get(): IConfigData | null {
        const rawConfig = localStorage.getItem(LocalStorageData.key);
        if (rawConfig) {
            return JSON.parse(rawConfig) as IConfigData;
        }

        return null;
    }

    static save(data: IConfigData) {
        localStorage.setItem(LocalStorageData.key, JSON.stringify(data));
    }
}

class JsonBinData {

    static secret = "$2b$10$/FL2EcEvEoUO19I7bO5da.q0YYqAgmTANU2kvh.WBP8FYTdP.6UYa";

    static save(data: IConfigData): Promise<ISaveResult> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://api.jsonbin.io/b`,
                method: "POST",
                contentType: "application/json",
                headers: {
                    "secret-key": JsonBinData.secret
                },
                data: JSON.stringify(data)
            })
            .done(response => resolve(response))
            .fail(xhr => reject(xhr));
        });
    }

    static get(key: string): Promise<IConfigData> {
        //const key = "5f0f1d9ac58dc34bf5d3f44c";

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://api.jsonbin.io/b/${key}`,
                headers: {
                    "secret-key": JsonBinData.secret
                }
            })
            .done(response => resolve(response))
            .fail(xhr => reject(xhr));
        });
    }
}

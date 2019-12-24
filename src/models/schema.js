export const schema = {
    "models": {
        "Todo": {
            "syncable": true,
            "name": "Todo",
            "pluralName": "Todos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "task": {
                    "name": "task",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "TodoStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "enums": {
        "TodoStatus": {
            "name": "TodoStatus",
            "values": [
                "COMPLETED",
                "INPROGRESS"
            ]
        }
    },
    "version": "2efb24070e17f24b9e0be8d247b26518"
};
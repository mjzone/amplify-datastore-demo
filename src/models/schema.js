export const schema = {
    "models": {
        "Task": {
            "syncable": true,
            "name": "Task",
            "pluralName": "Tasks",
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
                }
            }
        }
    },
    "enums": {},
    "version": "f9e2a6e2e7a3f0284642c4f9d2864b89"
};
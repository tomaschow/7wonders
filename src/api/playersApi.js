const serviceEndPointBase = "http://192.168.50.5"

export const getHistory = () => fetch(`${serviceEndPointBase}:8080/gameHistory`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "GET"
}).then((res) => res.json()).catch(e => console.error(e));

export const getHistoryById = (id) => fetch(`${serviceEndPointBase}:8080/gameHistory/${id}`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "GET"
}).then((res) => res.json()).catch(e => console.error(e));

export const deleteHistoryById = (id) => fetch(`${serviceEndPointBase}:8080/gameHistory/${id}`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "DELETE"
}).then((res) => res.json()).catch(e => console.error(e));

export const postHistory = (history) => fetch(`${serviceEndPointBase}:8080/gameHistory`, {
    "body": JSON.stringify(history),
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "POST"
}).then((res) => res.json()).catch(e => console.error(e));
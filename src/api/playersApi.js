const serviceEndPointBase = "http://192.168.50.5:8080"

export const getHistory = () => fetch(`${serviceEndPointBase}/gameHistory`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "GET"
}).then((res) => res.json()).catch(e => console.error(e));

export const getHistoryById = (id) => fetch(`${serviceEndPointBase}/gameHistory/${id}`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "GET"
}).then((res) => res.json()).catch(e => console.error(e));

export const deleteHistoryById = (id) => fetch(`${serviceEndPointBase}/gameHistory/${id}`, {
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "DELETE"
}).then((res) => res.json()).catch(e => console.error(e));

export const postHistory = (history) => fetch(`${serviceEndPointBase}/gameHistory`, {
    "body": JSON.stringify(history),
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    "method": "POST"
}).then((res) => res.json()).catch(e => console.error(e));
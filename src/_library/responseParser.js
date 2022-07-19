export function toJson(response) {
    return new Promise((resolve, reject) => {
        response.json()
            .then(data =>
                resolve({
                    'status': response.status,
                    'statusText': response.statusText,
                    'ok': response.ok,
                    'data': data
                })
            )
            .catch(data =>
                reject(response)
            );
    });
}

export function parseStatus(response) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {

            if (!response.ok) {
                return reject(response.statusText);
            }

            return resolve(response.data)
        } else if (response.status === 400) {
            return reject(response.data)
        } else {
            return reject(new Error(response.statusText))
        }
    });
}

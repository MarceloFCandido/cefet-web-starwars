export default (url) => new Promise(
    async function (resolve, reject) {
        try {
            let json = JSON.parse(localStorage.getItem(url))

            if (!json) {
                json = await (await fetch(url)).json()
                localStorage.setItem(url, JSON.stringify(json))
            }

            resolve(json)
        } catch (error) {
            reject(error)
        }
    }
)
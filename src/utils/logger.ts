export const logger = (...params: any[]) => {
    params.forEach((p) => {
        console.log(p)
    })
}
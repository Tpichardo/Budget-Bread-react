export const apiURL = () => {
    return window.location.hostname === 'localhost' ?
        'http://localhost:8080' : 'https://budget-bread.fly.dev'
}

export default apiURL;
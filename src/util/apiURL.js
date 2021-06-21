export const apiURL = () => {
    return window.location.hostname === 'localhost' ?
        'http://localhost:8080' : 'https://thawing-woodland-27640.herokuapp.com/'
}

export default apiURL;
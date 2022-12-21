export default function getToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        return JSON.parse(tokenString)
    };

    return {
        token: getToken()
    }
}

export class CustomError extends Error {
    status = '400';
    // response?: Response;
    // data?: any;

    constructor(status, message) {
        super(message);

        this.status = status;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
}

export default async function fetcher(input, init) {
    try {
        const response = await fetch(input, init);

        // if the server replies, there's always some data in json
        // if there's a network error, it will throw at the previous line
        const data = await response.json()

        if (response.ok) {
            return data
        }

        const error = new CustomError(response.statusText, (response)?.message ?? 'Unknown error')
        
        error.response = response
        error.data = data
        throw error
    } catch (error) {
        if (!error.data) {
            error.data = { message: error.message }
        }
        throw error
    }
}

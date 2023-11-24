//services.js
export const baseUrl = "http://localhost:5002/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body,
    });

    const data = await response.json();
    
    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message //our custom message thats defined in server folder(Backend)
        } else {
            message = data;
        }

        return { error: true, message };
    }


    return data;
}
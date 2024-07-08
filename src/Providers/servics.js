const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 54,
};

export async function makeSub(code, language, stdin, callback) {
    console.log("Code:", code, "Language:", language, "Stdin:", stdin, "Callback:", callback);
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'ea30c3f358mshe0bc947e54e4207p1da52fjsnf2062016ddb0', // Replace with your actual API key
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            language_id: languageCodeMap[language],
            source_code: btoa(code),
            stdin: btoa(stdin || '') 
        }),
    };

    try {
        callback({ apiStatus: 'loading' });
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        const tokenId = result.token;
        console.log("Token ID:", tokenId);

        let statusCode = 1;
        let res;

        while (statusCode === 1 || statusCode === 2) {
            res = await getsub(tokenId, callback);
            statusCode = res.status.id;
        }

        if (res) {
            callback({
                apiStatus: 'success',
                data: res,
                message: 'Submission successful'
            });
        }
    } catch (error) {
        console.error("Error submitting code:", error);
        callback({ apiStatus: 'error', message: JSON.stringify(error) });
    }
}

async function getsub(tokenId, callback) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ea30c3f358mshe0bc947e54e4207p1da52fjsnf2062016ddb0', // Replace with your actual API key
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        },
    };

    try {
        console.log("Fetching submission for token ID:", tokenId);
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Submission result:", result);
        return result;
    } catch (error) {
        console.error("Error fetching submission:", error);
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error)
        });
    }
    return null;
}

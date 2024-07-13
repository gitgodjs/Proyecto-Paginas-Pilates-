function jsonResponse(status, body) {
    return {
        status,
        body,
    };
}

module.exports = { jsonResponse };
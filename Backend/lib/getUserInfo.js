function getUserInfo(name){
    return {
        name: name.name,
        email: name.email,
        imageUrl: name.imageUrl,
    };
};

module.exports = getUserInfo;
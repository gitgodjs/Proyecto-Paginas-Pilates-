export const AuthResponse = {
  body: {
    user: {
      _id: "",
      name: "",
      username: "",
      imageUrl: ""
    },
    accessToken: "",
    refreshToken: ""
  }
};

const AuthResponseError = {
  body: {
    error: ""
  }
};

export const User = {
  _id: "",
  name: "",
  username: "",
  imageUrl: ""
};

export const AccessTokenResponse = {
  statusCode: 0,
  body: {
    accessToken: ""
  },
  error: ""
};



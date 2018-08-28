export default {
  releaseVersion: false,
  secret: {
    username: "wisami_base_1522119499",
    password: "wisami_base_secret_1522119999"
  },
  app: {
    android: "market://details?id=com.maps1",
    ios: "itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8"
  },
  api: {
    host: {
      base: "https://aib.vn:289",
      upload: "https://aib.vn:296",
      map: "https://maps.googleapis.com"
    },
    path: {
      upload: {
        upFile: "/upload"
      },
      base: {
        loginG: "/auth/google",
        loginF: "/auth/facebook",
        histories: "/histories",
        favorites: "/favorites"
      }
    }
  },
  code: {
    success: 3,
    error: {
      tokenFail: 6,
      tokenExpire: 7
    }
  },
  asyncStorage: {
    accessToken: "ACESS_TOKEN",
    searchedValue: "SEARCHED_VALUE",
    savedLocation: "SAVED_LOCATION"
  }
};

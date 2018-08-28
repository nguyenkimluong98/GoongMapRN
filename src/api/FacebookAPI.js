import Promise from "bluebird";
import Alamofire from "../libs/Alamofire";
import FBSDK, { LoginManager, AccessToken } from "react-native-fbsdk";

export const getUserInfoById = accessToken => {
  return new Promise((resolve, reject) => {
    const url =
      "https://graph.facebook.com/v3.1/me?fields=id, email, picture, name&access_token=" +
      accessToken;

    return Alamofire.request(url, "GET", {})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

// LoginManager.logInWithReadPermissions(["public_profile, email"])
//           .then(
//             result => {
//               if (result.isCancelle) alert("Login was cancelled!");
//               else {
//                 AccessToken.getCurrentAccessToken()
//                   .then(data => {
//                     // return user infomation
//                     fetch(
//                       "https://graph.facebook.com/v3.1/me?fields=id, email, picture, name&access_token=" +
//                         data.accessToken
//                     )
//                       .then(response => response.json())
//                       .then(json => {
//                         //alert(JSON.stringify(json));
//                         this._changeLoginValue(json);
//                       });
//                   })
//                   .catch(() => {
//                     alert("ERROR GETTING DATA FROM FACEBOOK");
//                   });
//               }
//             },
//             function(error) {
//               alert("Login failed with error: " + error);
//             }
//           )
//           .catch(err => alert("ERROR: " + err));

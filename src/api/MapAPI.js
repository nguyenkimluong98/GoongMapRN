import Promise from "bluebird";
import Alamofire from "../libs/Alamofire";

export const address = (input, language = "vi") => {
  return new Promise((resolve, reject) => {
    const url =
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCYLQqvp2JWF9wofBJbQ_NfJLBZerNM3yA" +
      "&input=" +
      input +
      "&language=" +
      language;

    // alert(url);

    return Alamofire.request(url, "GET", {})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
export const getDetailPlace = placeId => {
  return new Promise((resolve, reject) => {
    const url =
      "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
      placeId +
      "&key=AIzaSyCYLQqvp2JWF9wofBJbQ_NfJLBZerNM3yA";

    // alert(url);

    return Alamofire.request(url, "GET", {})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
export const getDriect = (start, end, mode) => {
  return new Promise((resolve, reject) => {
    const url =
      "https://maps.googleapis.com/maps/api/directions/json?origin=" +
      start +
      "7&destination=" +
      end +
      "&mode=" +
      mode;

    // alert(url);
    return Alamofire.request(url, "GET", {})
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

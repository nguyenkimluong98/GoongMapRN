import Promise from "bluebird";
import Alamofire from "../libs/Alamofire";
import Config from "../config/env";

/**
 *Đăng nhập
 *
 * @param {*} path
 * @param {*} token
 * @returns
 */
export const login = (path, token) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${path}`;

    return Alamofire.request(
      url,
      "POST",
      {},

      { Authorization: `Bearer ${token}` }
    )
      .then(response => {
        console.log("res1111" + JSON.stringify(response));
        resolve(response);
      })
      .catch(err => reject(err));
  });
};
/**
 *Lấy danh sách các địa điểm theo fe_category xung quanh
 *
 * @param {*} distance
 * @param {*} curlat
 * @param {*} curlng
 * @param {*} fe_category
 * @returns
 */
export const getCategory = (distance, curlat, curlng, fe_category) => {
  return new Promise((resolve, reject) => {
    const url =
      Config.api.host.base +
      "/addresses/around?distance=" +
      distance +
      "&curlat=" +
      curlat +
      "&curlng=" +
      curlng +
      "&fe_category=" +
      fe_category;

    return Alamofire.request(url, "GET", {}, {})
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Tìm kiếm một địa điểm
 *
 * @param {*} input
 * @param {*} store
 * @returns
 */
export const search = input => {
  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + "/addresses/search?q=" + input;

    return Alamofire.request(url, "GET", {}, {})
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Lấy danh sách lịch sử
 *
 * @param {*} store
 * @returns
 */
export const getHistori = store => {
  const token = store.user.token;

  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + Config.api.path.base.histories;

    return Alamofire.request(
      url,
      "GET",
      {},
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Xóa một lịch sử
 *
 * @param {*} id
 * @param {*} store
 * @returns
 */
export const delHistori = (id, store) => {
  const token = store.user.token;

  return new Promise((resolve, reject) => {
    const url =
      Config.api.host.base + Config.api.path.base.histories + "/" + id;

    return Alamofire.request(
      url,
      "DELETE",
      {},
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Tạo một lịch sử
 *
 * @param {*} title
 * @param {*} click_url
 * @param {*} address
 * @param {*} region_id
 * @param {*} fe_category
 * @param {*} fe_category_name_en
 * @param {*} fe_category_name_vn
 * @param {*} img
 * @param {*} phone
 * @param {*} email
 * @param {*} facebook_url
 * @param {*} url
 * @param {*} lat
 * @param {*} lng
 * @param {*} store
 * @returns
 */
export const createHistori = (
  title,
  click_url,
  address,
  region_id,
  fe_category,
  fe_category_name_en,
  fe_category_name_vn,
  img,
  phone,
  email,
  facebook_url,
  url,
  lat,
  lng,
  address_id,
  store
) => {
  const token = store.user.token;
  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + Config.api.path.base.histories;

    return Alamofire.request(
      url,
      "POST",
      {
        title,
        click_url,
        address,
        region_id,
        fe_category,
        fe_category_name_en,
        fe_category_name_vn,
        img,
        phone,
        email,
        facebook_url,
        url,
        lat,
        lng,
        address_id
      },
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Lấy danh sách yêu thích
 *
 * @param {*} store
 * @returns
 */
export const getFavorite = store => {
  const token = store.user.token;

  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + Config.api.path.base.favorites;

    return Alamofire.request(
      url,
      "GET",
      {},
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Tạo một yêu thích
 *
 * @param {*} title
 * @param {*} click_url
 * @param {*} address
 * @param {*} region_id
 * @param {*} fe_category
 * @param {*} fe_category_name_en
 * @param {*} fe_category_name_vn
 * @param {*} img
 * @param {*} phone
 * @param {*} email
 * @param {*} facebook_url
 * @param {*} url
 * @param {*} lat
 * @param {*} lng
 * @param {*} store
 * @returns
 */
export const createFavorite = (
  title,
  click_url,
  address,
  region_id,
  fe_category,
  fe_category_name_en,
  fe_category_name_vn,
  img,
  phone,
  email,
  facebook_url,
  url,
  lat,
  lng,
  address_id,
  store
) => {
  const token = store.user.token;
  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + Config.api.path.base.favorites;

    return Alamofire.request(
      url,
      "POST",
      {
        title,
        click_url,
        address,
        region_id,
        fe_category,
        fe_category_name_en,
        fe_category_name_vn,
        img,
        phone,
        email,
        facebook_url,
        url,
        lat,
        lng,
        address_id
      },
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
/**
 *Xóa một yêu thích
 *
 * @param {*} id
 * @param {*} store
 * @returns
 */
export const delFavorite = (id, store) => {
  const token = store.user.token;

  return new Promise((resolve, reject) => {
    const url =
      Config.api.host.base + Config.api.path.base.favorites + "/" + id;

    return Alamofire.request(
      url,
      "DELETE",
      {},
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
        // alert(JSON.stringify(resolve));
      })
      .catch(err => reject(err));
  });
};
export const deletes = (path, ids, store) => {
  const token = store.user.token;

  return new Promise((resolve, reject) => {
    const url = Config.api.host.base + path;

    return Alamofire.request(
      url,
      "DELETE",
      { ids },
      {
        Authorization: "Bearer " + token
      }
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => reject(err));
  });
};

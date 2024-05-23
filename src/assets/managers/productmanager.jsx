export const getAllRTS = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/rtsproducts`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const fetchColors = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/colors`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const fetchEyes = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/eyes`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCus = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cusproducts`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCategories = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/category`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCart = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cart`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllOrders = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/orders`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "appliation/json",
    },
  }).then((res) => res.json())
}

export const getRTSbyId = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/rtsproducts/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const addRTSToOrder = (product) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cart`, {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(product),
  })
}

export const getCusById = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cusproducts/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const addCusToOrder = (request) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cart`, {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(request),
  })
}

export const deleteCart = () => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cart/clear-cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json,",
    },
  }).then((res) => {
    if (res.status === 204) {
      return
    } else {
      return res.json()
    }
  })
}

export const removeProductFromOrder = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cartitem/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  })
}

export const deleteRTSItem = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/rtsproducts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  })
}

export const deleteCusItem = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cusproducts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  })
}

export const getCustomerById = (id) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/customer/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
}

export const addNewRtsProd = (product) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/rtsproducts`, {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
}

export const addNewCusProd = (product) => {
  return fetch(`https://coral-app-da9ux.ondigitalocean.app/cusproducts`, {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
}

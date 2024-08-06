const API_URL =
  import.meta.env.VITE_API_URL || "https://coral-app-da9ux.ondigitalocean.app"

export const getAllRTS = () => {
  return fetch(`${API_URL}/rtsproducts`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const fetchColors = () => {
  return fetch(`${API_URL}/colors`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const fetchEyes = () => {
  return fetch(`${API_URL}/eyes`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCus = () => {
  return fetch(`${API_URL}/cusproducts`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCategories = () => {
  return fetch(`${API_URL}/category`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getRTSbyId = (id) => {
  return fetch(`${API_URL}/rtsproducts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getCusById = (id) => {
  return fetch(`${API_URL}/cusproducts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

//requires log in
export const getAllCart = () => {
  return fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const completeOrder = () => {
  const token = JSON.parse(localStorage.getItem("hookd_token")).token

  return fetch(`${API_URL}/cart/complete`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text || `HTTP error! status: ${response.status}`)
      })
    }
    return response.json()
  })
}

export const getAllOrders = () => {
  return fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "appliation/json",
    },
  }).then((res) => res.json())
}

export const addCusToOrder = (request) => {
  return fetch(`${API_URL}/cart`, {
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

export const addRTSToOrder = (product) => {
  return fetch(`${API_URL}/cart`, {
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

export const deleteCart = () => {
  return fetch(`${API_URL}/cart`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 204) {
      console.log("Cart cleared successfully (204 No Content)")
      return true
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
}

export const removeProductFromOrder = (id) => {
  return fetch(`${API_URL}/cartitem/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 204) {
      console.log("Product removed successfully (204 No Content)")
      return true
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
}

export const deleteRTSItem = (id) => {
  return fetch(`${API_URL}/rtsproducts/${id}`, {
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
  return fetch(`${API_URL}/cusproducts/${id}`, {
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
  return fetch(`${API_URL}/customer/${id}`, {
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

export const updateUser = (id, address) => {
  return fetch(`${API_URL}/customer/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  })
}

// admin stuff
export const addNewRtsProd = (product) => {
  return fetch(`${API_URL}/rtsproducts`, {
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
  return fetch(`${API_URL}/cusproducts`, {
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

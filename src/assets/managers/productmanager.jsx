export const getAllRTS = () => {
  return fetch(`http://localhost:8000/rtsproducts`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCus = () => {
  return fetch(`http://localhost:8000/cusproducts`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getAllCategories = () => {
  return fetch(`http://localhost:8000/category`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const getRTSbyId = (id) => {
  return fetch(`http://localhost:8000/rtsproducts/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const addRTSToOrder = (product) => {
  return fetch(`http://localhost:8000/cart`, {
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
  return fetch(`http://localhost:8000/cusproducts/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hookd_token")).token
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const addCusToOrder = (request) => {
  return fetch(`http://localhost:8000/cart`, {
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

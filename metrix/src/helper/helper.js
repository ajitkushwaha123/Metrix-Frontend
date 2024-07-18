// Api request
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { jwtDecode } from "jwt-decode";

// Authentication function
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist... !" };
  }
}

export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found"); // Throw an error with a descriptive message
  }
  const decoded = jwtDecode(token);
  console.log("decoded" , decoded);
  return decoded;
}

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match... !" };
  }
}

export async function registerUser(credential) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credential);

    let { username, email } = credential;

    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyPassword({ username, password }) {
  console.log({ username, password });
  try {
    const data = await axios.post("/api/login", { username, password });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match... !" });
  }
}

export async function addProduct(values) {
  try {
    const token = localStorage.getItem("token");
    console.log(values);

    const formData = new FormData();
    formData.append("productName", values.productName); // Ensure productName is a single value
    formData.append("discountPrice", values.discountPrice);
    formData.append("orderType", values.orderType);
    formData.append("longDescription", values.longDescription);
    formData.append("variant", values.variant);
    formData.append("shortDescription", values.shortDescription);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("photos", values.photos[0]); // Ensure photos is a single value
    console.log("Form Data:", values.photos[0]);

    // if (values.photos && values.photos.length > 0) {
    //   values.photos.forEach((photo, index) => {
    //     console.log("Photo:", photo);
    //     formData.append(`photos[${index}]`, photo);
    //   });
    // }



    console.log("Selected photos:", values.photos);
    // console.log("FormData photos:", formData.getAll("photos"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    };

    const { data } = await axios.post("/api/products", formData, config);

    console.log("Product added successfully:", data);

    return Promise.resolve({ product: data });
  } catch (error) {
    console.error("Error adding product:", error);
    return Promise.reject({ error: error.message });
  }
}

export async function updateUser(response) {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const { data } = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile." });
  }
}

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP IS ${code}, verify and recover your password`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}


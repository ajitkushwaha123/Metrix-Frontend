// Api request
import { user } from "@nextui-org/react";
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

export async function getOrders(url) {
  const { userId } = await getUsername();
  console.log("User ID:", userId);
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    throw new Error("Token not found"); // Throw an error with a descriptive message
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    },
  };


  try {
    console.log("URL:", url);
    const { data } = await axios.get(`${url}/${userId}`, config);
    console.log("Orders:", data);
    return  data  ;
  } catch (error) {
    return { error: "Couldn't fetch Orders" };
  }
}

export async function getCustomers(url) {
  const { userId } = await getUsername();
  console.log("User ID:", userId);
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    throw new Error("Token not found"); // Throw an error with a descriptive message
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("URL:", url);
    const { data } = await axios.get(`${url}`, config);
    console.log("CutiePie:", data);
    return data;
  } catch (error) {
    return { error: "Couldn't fetch Orders" };
  }
}

export async function getSingleOrders(url) {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    throw new Error("Token not found"); // Throw an error with a descriptive message
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("URL:", url);
    const { data } = await axios.get(`${url}`, config);
    console.log("Orders:", data);
    return data;
  } catch (error) {
    return { error: "Couldn't fetch Orders" };
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
    formData.append("status" , values.status);
    formData.append("photos", values.photos[0]); // Ensure photos is a single value
    if(values.photos[1]) formData.append("photos", values.photos[1]); 
    if (values.photos[2]) formData.append("photos", values.photos[2]); 
    if (values.photos[3]) formData.append("photos", values.photos[3]); 
    console.log("Form Data:", values.photos);

    console.log("Selected photos:", values.photos);

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

export async function updateProduct(values) {
  try {
    const token = localStorage.getItem("token");
    console.log("valueId", values._id);

    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("discountPrice", values.discountPrice);
    formData.append("orderType", values.orderType);
    formData.append("longDescription", values.longDescription);
    formData.append("variant", values.variant);
    formData.append("shortDescription", values.shortDescription);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("photos", values.photos[0]);
    if (values.photos[1]) formData.append("photos", values.photos[1]);
    if (values.photos[2]) formData.append("photos", values.photos[2]);
    if (values.photos[3]) formData.append("photos", values.photos[3]);

    console.log("Form Data:", values.photos);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(`/api/products/${values._id}`);

    const { data } = await axios.put(
      `/api/products/${values._id}`,
      formData,
      config
    );

    console.log("Product updated successfully:", data);

    return { product: data };
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: error.message };
  }
}

export async function handleCustomers(values , id)  {
  console.log("csnxv" , id);
  const token = localStorage.getItem("token");
  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  console.log("skfhlk", values);

  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/customer/${id}`,
      values,
      config
    );

    console.log("Customer Added", data);
    return Promise.resolve({ data });
  } catch (err) {
    console.error("Error adding customer :", err.message);
    return Promise.reject({ err });
  }
};


export async function addCustomers(values){
  const token = localStorage.getItem("token");
  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/customer",
      values,
      config
    );

    console.log("Customer Added", data);
    return Promise.resolve({ customer: data });
  } catch (err) {
    console.error("Error adding customer :", err.message);
    return Promise.reject({ err: err.message });
  }
};



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

export async function getSingleCustomer(id){
  try {
       const token = localStorage.getItem("token");
       if (!token) {
         console.log("Token not found");
         return;
       }

       const config = {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       };

       console.log("idm sm" , id);

       const {data} = await axios.get(
         `http://localhost:8000/api/customer/find/${id}`,
         config
       );

       console.log("diita" , data);
       return Promise.resolve({ data });
      
     } catch (err) {
       return Promise.reject({ error: "Error Fetching Customer..." });
     }
}

export async function getAllCustomers(){
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };


    const response = await axios.get(
      `http://localhost:8000/api/customer`,
      config
    );

    console.log("Customer", response.data);
    return Promise.resolve( response.data );
  } catch (err) {
    return Promise.reject({ error: "Error Fetching Customer..." });
  };
}

export async function getOrderByCustomer(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("idm sm", id);

    const { data } = await axios.get(
      `http://localhost:8000/api/orders/customer/${id}`,
      config
    );

    console.log("diita", `http://localhost:8000/api/orders/customer/${id}`);
    console.log("diita", data);
    return Promise.resolve({ data });
  } catch (err) {
    return Promise.reject({ error: "Error Fetching Customer..." });
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


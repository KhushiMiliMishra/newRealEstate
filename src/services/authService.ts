import api from "./api";

export const registerUser = async (userData: any) => {
  const response = await api.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {

  console.log("CALLING LOGIN API");

  const response = await api.post(
    "/api/auth/login",
    {
      email,
      password,
      portal: "CUSTOMER",
    }
  );

  console.log("LOGIN STATUS:", response.status);
  console.log("LOGIN DATA:", response.data);
  console.log("JWT TOKEN:", response.data.token);
  return response.data;
};

export const updateCustomerProfile = async (
  userId: number,
  profileData: any
) => {
  const response = await api.put(
    `/api/auth/profile/${userId}`,
    profileData
  );

  return response.data;
};
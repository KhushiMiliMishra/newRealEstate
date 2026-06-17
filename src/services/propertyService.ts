import api from "./api";

export const getAllProperties = async () => {
  const response = await api.get("/properties");
  return response.data;
};

export const deleteProperty = async (id: number) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};
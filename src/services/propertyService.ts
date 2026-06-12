import API from "./api";

export const createProperty = async (data: any) => {
  return API.post("/properties", data);
};

export const getPropertiesByAgent = async (agentId: number) => {
  return API.get(`/properties/agent/${agentId}`);
};
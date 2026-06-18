const API_URL =
  "http://localhost:8080/api/viewing-requests";

export const createViewingRequest = async (
  data: {
    propertyId: number;
    customerId: number;
    agentId: number;
    requestedDate: string;
    requestedTime: string;
    notes: string;
  }
) => {

  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create viewing request");
  }

  return response.json();
};
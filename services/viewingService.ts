const API_URL = "http://localhost:8080/api/viewings";

export const createViewingRequest =
  async (data: any) => {

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to create viewing"
      );
    }

    return response.json();
};
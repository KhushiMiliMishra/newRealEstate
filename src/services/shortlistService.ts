const API_URL = "http://localhost:8080/api/shortlist";

export const addToShortlist = async (
  customerId: number,
  propertyId: number
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
      propertyId,
    }),
  });

  return response.json();
};

export const getShortlistedProperties = async (
  customerId: number
) => {
  const response = await fetch(
    `${API_URL}/${customerId}`
  );

  console.log("SHORTLIST STATUS:", response.status);

  if (!response.ok) {
    throw new Error(
      `Shortlist API Error ${response.status}`
    );
  }

  return await response.json();
};

/*
 NEW FUNCTION
*/
export const getShortlistedPropertyDetails = async (
  customerId: number
) => {
  const response = await fetch(
    `http://localhost:8080/api/shortlist/properties/${customerId}`
  );

  if (!response.ok) {
    throw new Error(
      `Shortlist API Error ${response.status}`
    );
  }

  return await response.json();
};
export const removeFromShortlist = async (
  customerId: number,
  propertyId: number
) => {

  console.log(
    "CALLING DELETE:",
    customerId,
    propertyId
  );

  const response = await fetch(
    `${API_URL}/${customerId}/${propertyId}`,
    {
      method: "DELETE",
    }
  );

  console.log(
    "DELETE STATUS:",
    response.status
  );

  return response.text();
};
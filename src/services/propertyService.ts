const API_URL = "http://localhost:8080/api/properties";

export const getAllProperties = async () => {
  try {
    console.log("Fetching properties from:", API_URL);

    const response = await fetch(API_URL);

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.status}`);
    }

    const data = await response.json();

    console.log("Properties Loaded:", data);

    return data;
  } catch (error) {
    console.error("getAllProperties Error:", error);
    throw error;
  }
};

export const getPropertyById = async (id: number) => {
  try {
    console.log(`Fetching property ${id}`);

    const response = await fetch(`${API_URL}/${id}`);

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Property not found");
    }

    const property = await response.json();

    return {
  id: property.propertyId,
  title: property.title,
  price: `₹${Number(property.price).toLocaleString()}`,
  location:
    property.address ||
    property.city ||
    "Location Not Available",

  description: property.description,

  bhk: `${property.bhk} BHK`,
  area: `${property.areaSqft} sqft`,
  age: property.propertyAge ? `${property.propertyAge} Years` : "N/A",

  bathrooms: property.bathrooms,

  status:
    property.status ||
    property.propertyStatus ||
    property.listingStatus ||
    "Available",

  amenities: property.amenities || [],
  
      images: [
        property.image1,
        property.image2,
        property.image3,
        property.image4,
        property.image5,
      ]
        .filter((img) => img && img.trim() !== "")
        .length
        ? [
            property.image1,
            property.image2,
            property.image3,
            property.image4,
            property.image5,
          ].filter((img) => img && img.trim() !== "")
        : ["https://picsum.photos/800/500"],
    };
  } catch (error) {
    console.error("getPropertyById Error:", error);
    throw error;
  }

};



export const searchProperties = async (
  city?: string,
  bhk?: number,
  propertyType?: string,
  transactionType?: string
) => {
  let url = `${API_URL}/search?`;

  if (city) url += `city=${city}&`;
  if (bhk) url += `bhk=${bhk}&`;
  if (propertyType) url += `propertyType=${propertyType}&`;
  if (transactionType) url += `transactionType=${transactionType}&`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search properties");
  }

  return response.json();
};
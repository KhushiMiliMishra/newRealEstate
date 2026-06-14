const API_URL = "http://localhost:8080/api/properties";

export const getAllProperties = async () => {
  const response = await fetch("http://localhost:8080/api/properties");

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return await response.json();
};

export const getPropertyById = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Property not found");
  }

  const property = await response.json();

  return {
    id: property.propertyId,
    title: property.title,
    price: `₹${property.price?.toLocaleString()}`,
    location: property.address || property.city || "Location Not Available",
    description: property.description,
    bhk: `${property.bhk} BHK`,
    area: `${property.areaSqft} sqft`,
    age: `${property.propertyAge} Years`,
    status: "Available",

    images: [
      property.image1,
      property.image2,
      property.image3,
      property.image4,
      property.image5,
    ].filter((img) => img && img.trim() !== ""),
  };
};
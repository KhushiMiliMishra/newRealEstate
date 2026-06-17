import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getPropertyById } from "../../services/propertyService";

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    const data = await getPropertyById(Number(id));
    setProperty(data);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout role="agent" title="Property Details">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {property.title}
        </h1>

        <p>{property.description}</p>

        <p>
          <strong>Type:</strong> {property.propertyType}
        </p>

        <p>
          <strong>Price:</strong> ₹{property.price}
        </p>

        <p>
          <strong>City:</strong> {property.city}
        </p>

        <p>
          <strong>BHK:</strong> {property.bhk}
        </p>

        <p>
          <strong>Bathrooms:</strong> {property.bathrooms}
        </p>

        <p>
          <strong>Area:</strong> {property.areaSqft} sqft
        </p>

        <p>
          <strong>Status:</strong> {property.listingStatus}
        </p>
      </div>
    </MainLayout>
  );
}
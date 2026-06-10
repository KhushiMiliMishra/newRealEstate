import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function AddPropertyPage() {
  const navigate = useNavigate();
  
  return (
    <MainLayout
      role="agent"
      title="Add Property"
    >
      <div className="max-w-7xl mx-auto font-sans text-left">

        {/* Header */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Add New Property
          </h2>

          <p className="text-gray-500 mt-2">
            Create a new property listing and submit it for approval.
          </p>

        </div>

        {/* Progress Indicator */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <div className="grid grid-cols-5 gap-4">

            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-[#1D3557] text-white flex items-center justify-center">
                1
              </div>

              <p className="text-sm mt-2">
                Basic
              </p>
            </div>

            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
                2
              </div>

              <p className="text-sm mt-2">
                Location
              </p>
            </div>

            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
                3
              </div>

              <p className="text-sm mt-2">
                Specifications
              </p>
            </div>

            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
                4
              </div>

              <p className="text-sm mt-2">
                Amenities
              </p>
            </div>

            <div className="text-center">
              <div className="h-10 w-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
                5
              </div>

              <p className="text-sm mt-2">
                Media
              </p>
            </div>

          </div>

        </div>

        {/* Basic Information */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Property Title
              </label>

              <input
                type="text"
                placeholder="Luxury Villa in Chennai"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Property Type
              </label>

              <select className="w-full border rounded-xl px-4 py-3">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Independent House</option>
                <option>Plot / Land</option>
                <option>Commercial Property</option>
                <option>Office Space</option>
                <option>Shop</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Transaction Type
              </label>

              <select className="w-full border rounded-xl px-4 py-3">
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter Property Price"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

          </div>

          <div className="mt-6">

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Describe the property..."
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

        </div>

        {/* Location Information */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Location Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Address Line
              </label>

              <input
                type="text"
                placeholder="Enter complete address"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Locality
              </label>

              <input
                type="text"
                placeholder="OMR"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                placeholder="Chennai"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                State
              </label>

              <input
                type="text"
                placeholder="Tamil Nadu"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Country
              </label>

              <input
                type="text"
                placeholder="India"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Pincode
              </label>

              <input
                type="text"
                placeholder="600001"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Latitude
              </label>

              <input
                type="text"
                placeholder="13.0827"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Longitude
              </label>

              <input
                type="text"
                placeholder="80.2707"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

          </div>

        </div>

        {/* Property Specifications */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Property Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                BHK
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bathrooms
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Balconies
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Area (sq.ft)
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Floor No
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Total Floors
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Furnishing Status
              </label>

              <select className="w-full border rounded-xl px-4 py-3">
                <option>Unfurnished</option>
                <option>Semi Furnished</option>
                <option>Fully Furnished</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Property Age
              </label>

              <input
                type="number"
                placeholder="Years"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

          </div>

          <div className="mt-6">

            <label className="block mb-2 font-medium">
              Availability Status
            </label>

            <select className="w-full md:w-64 border rounded-xl px-4 py-3">
              <option>Available</option>
              <option>Sold</option>
              <option>Rented</option>
            </select>

          </div>

        </div>

      </div>
              {/* Amenities */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Amenities
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {[
              "Lift",
              "Gym",
              "Swimming Pool",
              "Parking",
              "Power Backup",
              "Security",
              "CCTV",
              "Garden",
              "Club House",
            ].map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                />

                <span>{amenity}</span>

              </label>
            ))}

          </div>

        </div>

        {/* Media & Virtual Assets */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Media & Virtual Assets
          </h3>

          {/* Image Upload */}

          <div className="mb-6">

            <label className="block mb-3 font-medium">
              Property Images
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col items-center justify-center text-gray-500">

              <p className="font-medium">
                Upload Property Images
              </p>

              <p className="text-sm mt-2">
                Supports up to 20 Images
              </p>

              <button className="mt-4 px-5 py-2 bg-[#1D3557] text-white rounded-xl">
                Select Images
              </button>

            </div>

          </div>

          {/* Image Preview Grid */}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">

            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl bg-slate-100 flex items-center justify-center text-gray-400"
              >
                Image {index + 1}
              </div>
            ))}

          </div>

          {/* Video URL */}

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Video URL
            </label>

            <input
              type="text"
              placeholder="https://youtube.com/..."
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          {/* Floor Plan */}

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Floor Plan URL
            </label>

            <input
              type="text"
              placeholder="https://..."
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          {/* Virtual Tour */}

          <div>

            <label className="block mb-2 font-medium">
              Virtual Tour URL
            </label>

            <input
              type="text"
              placeholder="https://..."
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

        </div>

        {/* Listing Information */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">

          <h3 className="text-xl font-semibold mb-6">
            Listing Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

              <h4 className="font-semibold text-yellow-800 mb-2">
                Approval Workflow
              </h4>

              <p className="text-sm text-yellow-700 leading-relaxed">
                All newly submitted properties will be reviewed by
                platform administrators before becoming publicly
                visible to customers.
              </p>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

              <h4 className="font-semibold text-blue-800 mb-2">
                Property Visibility
              </h4>

              <p className="text-sm text-blue-700 leading-relaxed">
                Draft properties remain private until submitted
                for approval.
              </p>

            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <h3 className="font-bold text-slate-800 text-sm">
                Ready to Publish?
              </h3>
              <p className="text-[11px] text-slate-400">
                Save as draft or submit for admin moderation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => navigate("/properties")}
                className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-semibold transition-all text-slate-600 active:scale-95"
              >
                Cancel
              </button>

              <button 
                onClick={() => navigate("/properties")}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-all text-slate-700 active:scale-95"
              >
                Save Draft
              </button>

              <button 
                onClick={() => navigate("/properties")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
              >
                Submit For Approval
              </button>
            </div>
          </div>
        </div>
    </MainLayout>
  );
}

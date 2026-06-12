// EditPropertyPage.tsx

import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function EditPropertyPage() {
  const navigate = useNavigate();
  return (
    <MainLayout role="agent" title="Edit Property">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

          <div>
            <h2 className="text-3xl font-bold">
              Edit Property
            </h2>

            <p className="text-gray-500 mt-2">
              Update property information and manage listing details.
            </p>
          </div>

          <div className="flex gap-3">

            <button className="px-5 py-3 border rounded-xl">
              Preview Listing
            </button>

            <button className="px-5 py-3 border rounded-xl">
              Duplicate
            </button>

            <button className="px-5 py-3 bg-red-600 text-white rounded-xl">
              Delete
            </button>

          </div>

        </div>

        {/* Property Overview */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">

            <h3 className="font-semibold text-lg mb-4">
              Property Information
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Property ID
                </span>

                <span className="font-medium">
                  PROP-2026-1025
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Listing Status
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Last Updated
                </span>

                <span>
                  08 Jun 2026
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">

            <h3 className="font-semibold text-lg mb-4">
              Listing Performance
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Views
                </p>

                <h4 className="text-2xl font-bold">
                  1,248
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Inquiries
                </p>

                <h4 className="text-2xl font-bold">
                  42
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Viewings
                </p>

                <h4 className="text-2xl font-bold">
                  17
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Shortlisted
                </p>

                <h4 className="text-2xl font-bold">
                  28
                </h4>
              </div>

            </div>

          </div>

        </div>

        {/* Review Warning */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-6">

          <h4 className="font-semibold text-yellow-800 mb-2">
            Admin Review Notice
          </h4>

          <p className="text-yellow-700 text-sm">
            Changes to an active property may require admin review
            before updates become visible to customers.
          </p>

        </div>

        {/* Property Form */}

        <div className="bg-white rounded-2xl border border-gray-100 p-10">

          <div className="text-center">

            <h3 className="text-xl font-semibold mb-3">
              Property Form Section
            </h3>

            <p className="text-gray-500">
              Reuse the exact AddPropertyPage form here with
              pre-filled values from the selected property.
            </p>

          </div>

        </div>

        {/* Actions */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 mt-6 shadow-premium-soft">
          <div className="flex justify-end gap-3">
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
              Update Property
            </button>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
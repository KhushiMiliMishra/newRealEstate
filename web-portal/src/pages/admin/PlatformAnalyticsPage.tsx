import MainLayout from "../../components/layout/MainLayout";
import {
  TrendingUp,
  Users,
  Building2,
  MessageSquare,
} from "lucide-react";

export default function PlatformAnalyticsPage() {
  return (
    <MainLayout
      role="admin"
      title="Platform Analytics"
    >
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h2 className="text-2xl font-bold">
            Platform Analytics
          </h2>

          <p className="text-gray-500">
            Monitor marketplace growth, engagement,
            listings and agent performance.
          </p>
        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <Building2 className="text-[#1D3557]" />
              <span className="text-green-600 text-sm">
                +14%
              </span>
            </div>

            <p className="text-gray-500 mt-4">
              Total Listings
            </p>

            <h3 className="text-3xl font-bold mt-2">
              12,584
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <Users className="text-[#2A9D8F]" />
              <span className="text-green-600 text-sm">
                +11%
              </span>
            </div>

            <p className="text-gray-500 mt-4">
              Active Agents
            </p>

            <h3 className="text-3xl font-bold mt-2">
              326
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <Users className="text-[#F4A261]" />
              <span className="text-green-600 text-sm">
                +22%
              </span>
            </div>

            <p className="text-gray-500 mt-4">
              Registered Customers
            </p>

            <h3 className="text-3xl font-bold mt-2">
              25,482
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <MessageSquare className="text-[#457B9D]" />
              <span className="text-green-600 text-sm">
                +18%
              </span>
            </div>

            <p className="text-gray-500 mt-4">
              Monthly Inquiries
            </p>

            <h3 className="text-3xl font-bold mt-2">
              8,421
            </h3>
          </div>

        </div>

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg">
                Property Growth
              </h3>

              <TrendingUp size={18} />
            </div>

            <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center text-gray-400">
              Property Growth Chart
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg">
                User Growth
              </h3>

              <TrendingUp size={18} />
            </div>

            <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center text-gray-400">
              Customer Growth Chart
            </div>
          </div>

        </div>

        {/* PERFORMANCE METRICS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-500">
              Approval Rate
            </p>

            <h3 className="text-3xl font-bold mt-2 text-green-600">
              92%
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-500">
              Inquiry Conversion
            </p>

            <h3 className="text-3xl font-bold mt-2 text-blue-600">
              38%
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-500">
              Avg Property Views
            </p>

            <h3 className="text-3xl font-bold mt-2">
              128
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-500">
              Scheduled Visits
            </p>

            <h3 className="text-3xl font-bold mt-2">
              1,842
            </h3>
          </div>

        </div>

        {/* TOP AGENTS */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <h3 className="font-semibold text-lg mb-5">
            Top Performing Agents
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Alex Realty</span>
              <span>68 Listings • 4.9 Rating</span>
            </div>

            <div className="flex justify-between">
              <span>Elite Realty</span>
              <span>61 Listings • 4.8 Rating</span>
            </div>

            <div className="flex justify-between">
              <span>Urban Homes</span>
              <span>54 Listings • 4.7 Rating</span>
            </div>

          </div>

        </div>

        {/* TOP LOCALITIES */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <h3 className="font-semibold text-lg mb-5">
            Top Localities
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Hitech City</span>
              <span>1,284 Listings</span>
            </div>

            <div className="flex justify-between">
              <span>Whitefield</span>
              <span>1,012 Listings</span>
            </div>

            <div className="flex justify-between">
              <span>OMR Chennai</span>
              <span>958 Listings</span>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
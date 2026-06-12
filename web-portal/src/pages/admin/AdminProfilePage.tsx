import MainLayout from "../../components/layout/MainLayout";
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  LogOut,
  Lock,
} from "lucide-react";

export default function AdminProfilePage() {
  return (
    <MainLayout
      role="admin"
      title="Admin Profile"
    >
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h2 className="text-2xl font-bold">
            Admin Profile
          </h2>

          <p className="text-gray-500">
            Manage your account information, security settings,
            and notification preferences.
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="h-28 w-28 rounded-full bg-[#1D3557] text-white flex items-center justify-center text-4xl font-bold">
              A
            </div>

            <div>
              <h3 className="text-2xl font-semibold">
                Admin User
              </h3>

              <p className="text-gray-500">
                Super Administrator
              </p>

              <button className="mt-3 px-5 py-2 rounded-xl bg-[#1D3557] text-white hover:opacity-90">
                Change Profile Photo
              </button>
            </div>

          </div>

        </div>

        {/* Personal Information */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <h3 className="text-lg font-semibold mb-5">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-medium mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  defaultValue="admin@propvault.com"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  defaultValue="+91 9876543210"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Employee ID
              </label>

              <input
                type="text"
                defaultValue="ADM001"
                className="w-full border border-gray-300 rounded-xl py-3 px-4"
              />
            </div>

          </div>

          <button className="mt-6 bg-[#1D3557] text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>

        </div>

        {/* Security Settings */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <h3 className="text-lg font-semibold mb-5">
            Security Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="text-sm font-medium mb-2 block">
                Current Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4"
                />
              </div>
            </div>

          </div>

          <button className="mt-6 bg-[#2A9D8F] text-white px-6 py-3 rounded-xl">
            Update Password
          </button>

        </div>

        {/* Notification Preferences */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex items-center gap-2 mb-5">
            <Bell size={20} />
            <h3 className="text-lg font-semibold">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Property Moderation Alerts
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              New Agent Registration Alerts
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Customer Inquiry Notifications
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Weekly Analytics Reports
            </label>

          </div>

          <button className="mt-6 bg-[#1D3557] text-white px-6 py-3 rounded-xl">
            Save Preferences
          </button>

        </div>

        {/* Account Information */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex items-center gap-2 mb-5">
            <Shield size={20} />
            <h3 className="text-lg font-semibold">
              Account Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 text-sm">
                Admin ID
              </p>

              <p className="font-semibold">
                ADM001
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Role
              </p>

              <p className="font-semibold">
                Super Administrator
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Last Login
              </p>

              <p className="font-semibold">
                10 Jun 2026 • 09:42 AM
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Account Created
              </p>

              <p className="font-semibold">
                15 Jan 2026
              </p>
            </div>

          </div>

        </div>

        {/* Danger Zone */}

        <div className="bg-white rounded-2xl border border-red-200 p-6">

          <h3 className="text-lg font-semibold text-red-600 mb-5">
            Danger Zone
          </h3>

          <div className="flex flex-wrap gap-4">

            <button className="px-5 py-3 rounded-xl bg-orange-100 text-orange-700 font-medium">
              Logout All Devices
            </button>

            <button className="px-5 py-3 rounded-xl bg-red-100 text-red-700 font-medium">
              Deactivate Account
            </button>

            <button className="px-5 py-3 rounded-xl bg-red-600 text-white font-medium flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
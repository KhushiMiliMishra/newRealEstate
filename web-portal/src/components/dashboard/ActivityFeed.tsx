const activities = [
  { text: "New inquiry received for Luxury Villa", time: "2 mins ago", type: "inquiry" },
  { text: "Property listing approved by moderator", time: "10 mins ago", type: "approval" },
  { text: "Viewing scheduled for tomorrow with Priya", time: "1 hr ago", type: "schedule" },
  { text: "Price updated for Downtown Apartment", time: "4 hrs ago", type: "price" },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-base text-slate-800 font-heading mb-5">
          Recent Activity
        </h3>

        <div className="relative pl-4 border-l border-slate-100 space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative flex flex-col text-left"
            >
              {/* Dot */}
              <span className={`absolute -left-[20.5px] top-1 h-2 w-2 rounded-full ring-4 ring-white ${
                activity.type === "inquiry"
                  ? "bg-blue-500"
                  : activity.type === "approval"
                  ? "bg-emerald-500"
                  : activity.type === "schedule"
                  ? "bg-violet-500"
                  : "bg-amber-500"
              }`} />

              <p className="text-xs font-medium text-slate-700">
                {activity.text}
              </p>
              
              <span className="text-[10px] text-slate-400 mt-1">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
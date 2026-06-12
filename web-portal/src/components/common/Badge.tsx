interface BadgeProps {
  status: string;
}

export default function Badge({ status }: BadgeProps) {
  const colors = {
    Available: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Sold: "bg-red-100 text-red-700",
    Rented: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status as keyof typeof colors] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
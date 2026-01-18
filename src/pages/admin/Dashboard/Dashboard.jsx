export default function Dashboard() {
  return (
    <>
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">
          Xin Chào, Minh Anh! 👋
        </h2>
        <p className="text-gray-500">
          Here's how your business is performing this Lunar New Year season.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          ["Spring Sales", "$45,280", "+12%"],
          ["New Orders", "1,240", "+5.4%"],
          ["Active Customers", "890", "+8%"],
        ].map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border">
            <div className="text-gray-500 text-sm mb-1">{c[0]}</div>
            <div className="text-3xl font-bold">{c[1]}</div>
            <div className="text-green-500 text-sm">{c[2]}</div>
          </div>
        ))}
      </div>

      {/* Revenue + Best Seller */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl border h-[320px]">
          <h3 className="font-bold mb-4">Revenue Overview</h3>
          <div className="h-full flex items-center justify-center text-gray-400">
            📈 Revenue Chart
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="font-bold mb-4">Best Sellers</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Lucky Red Envelopes</span>
              <b>$1,260</b>
            </li>
            <li className="flex justify-between">
              <span>Gourmet Tet Gift Basket</span>
              <b>$8,750</b>
            </li>
            <li className="flex justify-between">
              <span>Bánh Chưng</span>
              <b>$4,200</b>
            </li>
          </ul>

          <button className="mt-6 w-full border border-red-500 text-red-500 py-2 rounded-xl">
            View All Products
          </button>
        </div>
      </div>
    </>
  );
}

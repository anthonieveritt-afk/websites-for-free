export default function CostCalculator() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
            💰 Cost comparison
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            See How Much You Save
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare what you&apos;d pay elsewhere versus what you pay with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional agency */}
          <div className="rounded-2xl border-2 border-red-100 bg-red-50/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl">😬</div>
              <div>
                <div className="font-black text-gray-900 text-lg">Traditional Agency</div>
                <div className="text-sm text-red-600 font-medium">Expensive & slow</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Design Fee", value: "£1,500–£5,000" },
                { label: "Setup Fee", value: "£300–£500" },
                { label: "Monthly Hosting", value: "£30–£100/mo" },
                { label: "SEO Setup", value: "£500–£2,000" },
                { label: "Ongoing Changes", value: "£75–£150/hr" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-red-100">
                  <span className="text-gray-700 font-medium">{row.label}</span>
                  <span className="text-red-600 font-bold">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-red-200 flex justify-between items-center">
              <span className="font-black text-gray-900">Total First Year</span>
              <span className="font-black text-red-600 text-xl">£2,500–£8,000</span>
            </div>
          </div>

          {/* YourWebsiteNow */}
          <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-indigo-50 p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">🎉</div>
              <div>
                <div className="font-black text-gray-900 text-lg">YourWebsiteNow</div>
                <div className="text-sm text-emerald-600 font-medium">Free to try, affordable to keep</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Design Fee", value: "£0" },
                { label: "Setup Fee", value: "£0" },
                { label: "Monthly Hosting", value: "£29/mo" },
                { label: "SEO Setup", value: "£0" },
                { label: "Ongoing Support", value: "Included" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-emerald-100">
                  <span className="text-gray-700 font-medium">{row.label}</span>
                  <span className="text-emerald-600 font-bold">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-emerald-200 flex justify-between items-center">
              <span className="font-black text-gray-900">Total First Year</span>
              <span className="font-black text-emerald-600 text-xl">£348</span>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-center text-white">
          <div className="text-3xl font-black mb-1">Save up to £7,652</div>
          <div className="text-indigo-200">in your first year alone</div>
        </div>
      </div>
    </section>
  );
}

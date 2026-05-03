"use client";

export default function BillingPage() {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-3xl">
      <h2 className="text-h1 text-on-surface mb-8">Billing</h2>

      <div className="space-y-10">
        {/* Plan summary */}
        <div className="flex items-start justify-between border-b border-outline-variant pb-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface mb-1">
                Pro plan{" "}
                <span className="text-label-sm font-normal text-on-surface-variant ml-2 bg-surface-container px-2 py-0.5 rounded">Monthly</span>
              </h3>
              <p className="text-body-md text-on-surface-variant">Your subscription will auto renew on May 2, 2026.</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer">
            Adjust plan
          </button>
        </div>

        {/* Payment Method */}
        <div className="border-b border-outline-variant pb-8">
          <h3 className="text-h3 text-on-surface mb-4">Payment</h3>
          <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline">credit_card</span>
              <span className="text-body-md text-on-surface font-medium">Visa •••• 4242</span>
            </div>
            <button className="px-4 py-1.5 border border-outline-variant rounded-md text-label-md text-on-surface bg-white hover:bg-surface-container transition-colors cursor-pointer">
              Update
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div className="border-b border-outline-variant pb-8">
          <h3 className="text-h3 text-on-surface mb-4">Invoices</h3>
          <div className="w-full border border-outline-variant rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-4 text-label-sm text-on-surface-variant font-medium">Date</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-medium">Due</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-medium">Total</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-medium">Status</th>
                  <th className="p-4 text-label-sm text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Apr 2, 2026", due: "-", total: "$11.00", status: "Paid" },
                  { date: "Mar 2, 2026", due: "-", total: "$11.00", status: "Paid" },
                  { date: "Feb 2, 2026", due: "-", total: "$11.00", status: "Paid" },
                ].map((inv, i) => (
                  <tr key={i} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 text-body-md text-on-surface">{inv.date}</td>
                    <td className="p-4 text-body-md text-on-surface-variant">{inv.due}</td>
                    <td className="p-4 text-body-md text-on-surface">{inv.total}</td>
                    <td className="p-4 text-body-md text-on-surface">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-label-sm">Paid</span>
                    </td>
                    <td className="p-4 text-body-md text-right">
                      <button className="text-primary hover:underline cursor-pointer">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancellation */}
        <div>
          <h3 className="text-h3 text-on-surface mb-4">Cancellation</h3>
          <div className="flex items-center justify-between">
            <p className="text-body-md text-on-surface-variant">Cancel plan</p>
            <button className="px-4 py-2 bg-error text-white rounded-lg text-label-md hover:bg-error/90 transition-colors shadow-sm cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

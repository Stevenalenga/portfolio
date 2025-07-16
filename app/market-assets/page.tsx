import { MarketAssets } from "@/components/ui/MarketAssets"

export default function MarketAssetsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100">
      <main className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Market Assets</h2>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg space-y-6">
          <MarketAssets />
        </div>
      </main>
    </div>
  )
}

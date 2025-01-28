"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Asset {
  name: string
  symbol: string
  price: number
  change24h: number
}

interface CryptoApiResponse {
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

interface StockApiResponse {
  "Global Quote": {
    "01. symbol": string
    "05. price": string
    "10. change percent": string
  }
}

const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

export function MarketAssets() {
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([])
  const [stockAssets, setStockAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch crypto data")
        }
        const data: CryptoApiResponse[] = await response.json()
        setCryptoAssets(
          data.map((coin) => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
          })),
        )
      } catch (error) {
        console.error("Error fetching crypto data:", error)
        setError("Failed to fetch cryptocurrency data. Please try again later.")
      }
    }

    const fetchStockData = async () => {
      const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"]
      const stockData: Asset[] = []

      for (const symbol of stocks) {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
          )
          if (!response.ok) {
            throw new Error(`Failed to fetch stock data for ${symbol}`)
          }
          const data: StockApiResponse = await response.json()
          const quote = data["Global Quote"]

          if (!quote || !quote["01. symbol"]) {
            throw new Error(`Invalid data received for ${symbol}`)
          }

          stockData.push({
            name: quote["01. symbol"],
            symbol: quote["01. symbol"],
            price: Number.parseFloat(quote["05. price"]),
            change24h: Number.parseFloat(quote["10. change percent"].replace("%", "")),
          })

          // Add a delay to avoid hitting API rate limits
          await new Promise((resolve) => setTimeout(resolve, 1000))
        } catch (error) {
          console.error(`Error fetching stock data for ${symbol}:`, error)
        }
      }

      setStockAssets(stockData)
    }

    Promise.all([fetchCryptoData(), fetchStockData()])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError("An error occurred while fetching market data. Please try again later.")
        setLoading(false)
      })
  }, [])

  const renderAsset = (asset: Asset) => (
    <Card key={asset.symbol} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">
          {asset.name} ({asset.symbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${asset.price.toFixed(2)}</p>
        <p className={`text-sm ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
          {asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  )

  const renderSkeletons = (count: number) =>
    Array(count)
      .fill(0)
      .map((_, i) => (
        <Card key={i} className="bg-zinc-800">
          <CardHeader>
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[100px] mb-2" />
            <Skeleton className="h-4 w-[60px]" />
          </CardContent>
        </Card>
      ))

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Cryptocurrencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? renderSkeletons(5) : cryptoAssets.map(renderAsset)}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Stocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? renderSkeletons(5) : stockAssets.map(renderAsset)}
        </div>
      </div>
    </div>
  )
}


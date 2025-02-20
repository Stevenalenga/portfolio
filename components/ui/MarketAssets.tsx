"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Asset {
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap?: number
  volume?: number
}

interface CryptoApiResponse {
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

interface StockApiResponse {
  "Global Quote": {
    "05. price": string
    "10. change percent": string
    "08. previous close": string
    "06. volume": string
  }
}

interface ForexApiResponse {
  "Realtime Currency Exchange Rate": {
    "5. Exchange Rate": string
    "9. Ask Price": string
    "8. Bid Price": string
  }
}

export function MarketAssets() {
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([])
  const [stockAssets, setStockAssets] = useState<Asset[]>([])
  const [forexAssets, setForexAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [cryptoData, stockData, forexData] = await Promise.all([
        fetchCryptoData(),
        fetchStockData(),
        fetchForexData(),
      ])
      setCryptoAssets(cryptoData)
      setStockAssets(stockData)
      setForexAssets(forexData)
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch market data: ${err.message}`)
      } else {
        setError("An unexpected error occurred. Please try again later.")
      }
      console.error("Error fetching market data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchCryptoData = async (): Promise<Asset[]> => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false",
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch crypto data: ${response.statusText}`)
    }
    const data: CryptoApiResponse[] = await response.json()
    return data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
    }))
  }

  const fetchStockData = async (): Promise<Asset[]> => {
    const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"]
    const stockData = await Promise.all(
      stocks.map(async (symbol) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`,
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch stock data for ${symbol}: ${response.statusText}`)
        }
        const data: StockApiResponse = await response.json()
        const quote = data["Global Quote"]
        if (!quote) {
          console.error(`Invalid response for stock ${symbol}:`, data)
          throw new Error(`Invalid response for stock ${symbol}`)
        }
        return {
          name: symbol,
          symbol: symbol,
          price: Number.parseFloat(quote["05. price"]),
          change24h: Number.parseFloat(quote["10. change percent"].replace("%", "")),
          volume: Number.parseInt(quote["06. volume"]),
        }
      }),
    )
    return stockData
  }
  
  const fetchForexData = async (): Promise<Asset[]> => {
    const forexPairs = ["EURUSD", "EURGBP", "USDGBP"]
    const forexData = await Promise.all(
      forexPairs.map(async (pair) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.slice(0, 3)}&to_currency=${pair.slice(3)}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`,
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch forex data for ${pair}: ${response.statusText}`)
        }
        const data: ForexApiResponse = await response.json()
        const rate = data["Realtime Currency Exchange Rate"]
        if (!rate) {
          console.error(`Invalid response for forex pair ${pair}:`, data)
          throw new Error(`Invalid response for forex pair ${pair}`)
        }
        const price = Number.parseFloat(rate["5. Exchange Rate"])
        const prevPrice = (Number.parseFloat(rate["8. Bid Price"]) + Number.parseFloat(rate["9. Ask Price"])) / 2
        return {
          name: `${pair.slice(0, 3)}/${pair.slice(3)}`,
          symbol: pair,
          price: price,
          change24h: ((price - prevPrice) / prevPrice) * 100,
        }
      }),
    )
    return forexData
  }

  const renderAsset = (asset: Asset) => (
    <Card key={asset.symbol} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">
          {asset.name} ({asset.symbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${asset.price.toFixed(4)}</p>
        <p className={`text-sm ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
          {asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
        </p>
        {asset.marketCap && <p className="text-sm text-zinc-400">Market Cap: ${asset.marketCap.toLocaleString()}</p>}
        {asset.volume && <p className="text-sm text-zinc-400">Volume: {asset.volume.toLocaleString()}</p>}
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
            <Skeleton className="h-4 w-[60px] mb-2" />
            <Skeleton className="h-4 w-[120px] mb-2" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>
        </Card>
      ))

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Market Assets</h2>
        <Button onClick={fetchData} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
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
      <div>
        <h3 className="text-2xl font-bold mb-4">Forex</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? renderSkeletons(3) : forexAssets.map(renderAsset)}
        </div>
      </div>
    </div>
  )
}


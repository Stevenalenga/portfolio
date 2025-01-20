'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Asset = {
  name: string
  symbol: string
  price: number
  change24h: number
}

export function MarketAssets() {
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([])
  const [stockAssets, setStockAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false')
        const data = await response.json()
        setCryptoAssets(data.map((coin: any) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h
        })))
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      }
    }

    const fetchStockData = async () => {
      try {
        const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']
        const stockData = await Promise.all(stocks.map(async (symbol) => {
          const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`)
          const data = await response.json()
          const quote = data['Global Quote']
          return {
            name: symbol,
            symbol: symbol,
            price: parseFloat(quote['05. price']),
            change24h: parseFloat(quote['10. change percent'].replace('%', ''))
          }
        }))
        setStockAssets(stockData)
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    }

    Promise.all([fetchCryptoData(), fetchStockData()]).then(() => setLoading(false))
  }, [])

  const renderAsset = (asset: Asset) => (
    <Card key={asset.symbol} className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{asset.name} ({asset.symbol})</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${asset.price.toFixed(2)}</p>
        <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {asset.change24h >= 0 ? '▲' : '▼'} {Math.abs(asset.change24h).toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Cryptocurrencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(5).fill(0).map((_, i) => (
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
            : cryptoAssets.map(renderAsset)}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Stocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(5).fill(0).map((_, i) => (
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
            : stockAssets.map(renderAsset)}
        </div>
      </div>
    </div>
  )
}


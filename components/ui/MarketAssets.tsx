"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Asset {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

interface CryptoApiResponse {
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface StockApiResponse {
  "Global Quote": {
    "05. price": string;
    "10. change percent": string;
  };
}

export function MarketAssets() {
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([]);
  const [stockAssets, setStockAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const cryptoIds = [
          "adventure-gold",
          "constitutiondao",
          "bitcoin",
          "solana",
          "ripple",
          "binancecoin",
          "ethereum",
          "dogecoin",
        ];

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(
            ","
          )}&order=market_cap_desc&per_page=8&page=1&sparkline=false`
        );

        if (!response.ok) throw new Error("Failed to fetch crypto data");

        const data: CryptoApiResponse[] = await response.json();
        setCryptoAssets(
          data.map((coin) => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
          }))
        );
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setError("Failed to fetch cryptocurrency data.");
      }
    };

    const fetchStockData = async () => {
      const stocks = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "TSLA",
        "FB",
        "NVDA",
        "GMC",
        "NFLX",
        "INTC",
      ];
      const stockData: Asset[] = [];

      for (const symbol of stocks) {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch stock data for ${symbol}`);

          const data: StockApiResponse = await response.json();
          if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
            stockData.push({
              name: symbol,
              symbol: symbol,
              price: Number.parseFloat(
                data["Global Quote"]["05. price"]
              ),
              change24h: Number.parseFloat(
                data["Global Quote"]["10. change percent"].replace("%", "")
              ),
            });
          }
        } catch (error) {
          console.error(`Error fetching stock data for ${symbol}:`, error);
          setError("Failed to fetch stock data.");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setStockAssets(stockData);
    };

    const fetchData = async () => {
      await fetchCryptoData();
      await fetchStockData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderAsset = (asset: Asset) => (
    <Card
      key={asset.symbol}
      className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
    >
      <CardHeader>
        <CardTitle className="text-lg">
          {asset.name} ({asset.symbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${asset.price.toFixed(2)}</p>
        <p
          className={`text-sm ${
            asset.change24h >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {asset.change24h >= 0 ? "▲" : "▼"}{" "}
          {Math.abs(asset.change24h).toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  );

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <Card key={i} className="bg-zinc-800">
        <CardHeader>
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[100px] mb-2" />
          <Skeleton className="h-4 w-[60px]" />
        </CardContent>
      </Card>
    ));

  return (
    <div className="space-y-8">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <h3 className="text-2xl font-bold mb-4">Cryptocurrencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? renderSkeletons(8) : cryptoAssets.map(renderAsset)}
        </div>
        <div className="text-center mt-4">
          <Button
            asChild
            className="bg-yellow-300 text-zinc-900 hover:bg-yellow-400 transition-all duration-300"
          >
            <a
              href="https://www.binance.com/referral/earn-together/refertoearn2000usdc/claim?hl=en&ref=GRO_14352_EKCZY&utm_source=referralmode"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore More Cryptos
            </a>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Stocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? renderSkeletons(10) : stockAssets.map(renderAsset)}
        </div>
        <div className="text-center mt-4">
          <Button
            asChild
            className="bg-yellow-300 text-zinc-900 hover:bg-yellow-400 transition-all duration-300"
          >
            <a
              href="https://www.tradingview.com/pricing/?share_your_love=stephenx5am8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore More Stocks 
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

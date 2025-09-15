import React, { useState } from 'react';

const TradeChart = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [isLoading, setIsLoading] = useState(true);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // TradingView iframe URL
  const tradingViewUrl = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=NASDAQ:${symbol}&interval=D&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&hideideas=1&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${symbol}#%7B%22page-uri%22%3A%22localhost%22%7D`;

  return (
    <div className="px-6 bg-gray-900 shadow-md py-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4 text-white text-center">
          Trading Chart
        </h1>
        
        {/* Symbol Input */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-3">
            <label htmlFor="symbol" className="text-white font-medium">
              Symbol:
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={handleSymbolChange}
              placeholder="Enter symbol (e.g., AAPL, TSLA)"
              className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="w-full h-[600px] bg-gray-800 rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-white text-lg">Loading Chart for {symbol}...</div>
            </div>
          </div>
        )}
        
        <iframe
          src={tradingViewUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          allowFullScreen={true}
          onLoad={handleIframeLoad}
          className="w-full h-full"
          title={`${symbol} Trading Chart`}
        />
      </div>

      {/* Quick Symbol Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <div className="text-gray-400 text-sm mb-2 w-full text-center">
          Quick Access:
        </div>
        {['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX'].map((quickSymbol) => (
          <button
            key={quickSymbol}
            onClick={() => setSymbol(quickSymbol)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              symbol === quickSymbol
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {quickSymbol}
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        <p>📈 Real-time market data from TradingView</p>
        <p>💡 Enter any stock symbol in the search box above</p>
        <p>🔧 Use the chart tools for technical analysis</p>
      </div>
    </div>
  );
};

export default TradeChart;
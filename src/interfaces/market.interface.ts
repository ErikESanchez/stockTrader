export function formattingDatabaseData(
  stockPayload: StockDataSymbol
): FormattedDataReturn {
  const formattedStockData: StockDataFormat = {};
  const monthData: MonthData = {};
  let dataReturn: FormattedDataReturn;
  // ? Perhaps a for of loop
  function organize(): any {
    Object.keys(stockPayload).forEach((symbol: string, idx, arr) => {
      const lastTradingDay: string =
        stockPayload[symbol]["Meta Data"]["3. Last Refreshed"];
      const metaData: MetaData = stockPayload[symbol]["Meta Data"];
      const priceData: TimeSeriesData =
        stockPayload[symbol]["Time Series(Daily)"][lastTradingDay];
      const companyOverview: CompanyOverview =
        stockPayload[symbol]["Company Overview"];
      formattedStockData[symbol] = {
        name: companyOverview["Name"],
        country: companyOverview["Country"],
        description: companyOverview["Description"],
        exchange: companyOverview["Exchange"],
        sector: companyOverview["Sector"],
        symbol: companyOverview["Symbol"],
        open: Number(priceData["1. open"]),
        high: Number(priceData["2. high"]),
        low: Number(priceData["3. low"]),
        close: Number(priceData["4. close"]),
        volume: Number(priceData["5. volume"]),
        lastRefreshed: metaData["3. Last Refreshed"],
      };
      const timeSeries: TimeSeriesDailyData =
        stockPayload[symbol]["Time Series(Daily)"];
      monthData[symbol] = timeSeries;
      if (idx === arr.length - 1) {
        // console.log(monthData);
        dataReturn = {
          formattedStockData,
          monthData,
        };
        return dataReturn;
      } else {
        return undefined;
      }
    });
    return dataReturn;
  }
  return organize();
}

interface TimeSeriesDaily {
  "Meta Data(Daily)": MetaData;
  "Time Series(Daily)": TimeSeriesDailyData;
}

export interface MonthData {
  [symbol: string]: TimeSeriesDailyData;
}

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface TimeSeriesDailyData {
  [day: string]: TimeSeriesData;
}

interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface StockDataSymbol {
  [symbol: string]: StockData;
}

interface StockData {
  "Meta Data": MetaData;
  "Company Overview": CompanyOverview;
  "Time Series(Daily)": TimeSeriesDailyData;
}

interface TIME_SERIES {
  function: string;
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

export interface StockDataFormat {
  [symbol: string]: FormattedStock;
}

export interface FormattedDataReturn {
  formattedStockData: StockDataFormat;
  monthData: MonthData;
}

export interface FormattedStock {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  country: string;
  sector: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  lastRefreshed: string;
}

export interface CompanyInfo {
  "Company Overview": CompanyOverview;
  "Meta Data(Daily)": MetaData;
}

interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  SharesFloat: string;
  SharesShort: string;
  SharesShortPriorMonth: string;
  ShortRatio: string;
  ShortPercentOutstanding: string;
  ShortPercentFloat: string;
  PercentInsiders: string;
  PercentInstitutions: string;
  ForwardAnnualDividendRate: string;
  ForwardAnnualDividendYield: string;
  PayoutRatio: string;
  DividendDate: string;
  ExDividendDate: string;
  LastSplitFactor: string;
  LastSplitDate: string;
}

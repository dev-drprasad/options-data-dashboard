import { DateTimeString, Price } from "shared/types";
import { StockSymbol } from "./common";

interface IStockPrice {
  symbol: StockSymbol;
  quotedate: DateTimeString;
  openp: Price;
  highp: Price;
  lowp: Price;
  closep: Price;
  volume: number;
}

export default IStockPrice;

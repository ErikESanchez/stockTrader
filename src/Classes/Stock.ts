export class Stock {
  price: number;
  shares: number;
  name: string;
  symbol: string;
  constructor(currentPrice: number, numberOfShares: number, name: string, symbol: string) {
    this.price = currentPrice;
    this.shares = numberOfShares;
    this.name = name;
    this.symbol = symbol;
  }

  // Mutaters

  increaseAmountOfShares(amountToIncraeseBy: number) {
    this.shares += amountToIncraeseBy;
  }

  reduceAmountOfShares(amountToReduceBy: number) {
    this.shares -= amountToReduceBy;
  }

  // Getters

  public getStockName() {
    return this.name;
  }

  public getNumberOfShares() {
    return this.shares;
  }

  public getCurrentPrice() {
    return this.price;
  }

  public getTotalWorth() {
    return this.price * this.shares;
  }
  public getStockSymbol() {
    return this.symbol;
  }
}

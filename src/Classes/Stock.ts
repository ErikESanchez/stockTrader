export class Stock {
  price: number;
  shares: number;
  name: string;
  constructor(currentPrice: number, numberOfShares: number, name: string) {
    this.price = currentPrice;
    this.shares = numberOfShares;
    this.name = name;
  }

  getNumberOfShares() {
    return this.shares;
  }

  getCurrentPrice() {
    return this.price;
  }

  getTotalWorth() {
    return this.price * this.shares;
  }

  increaseAmountOfShares(amountToIncraeseBy: number) {
    this.shares += amountToIncraeseBy;
  }

  reduceAmountOfShares(amountToReduceBy: number) {
    this.shares -= amountToReduceBy;
  }
}

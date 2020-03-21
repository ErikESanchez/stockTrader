export class Stock {
  price: number;
  shares: number;
  constructor(currentPrice: number, numberOfShares: number) {
    this.price = currentPrice;
    this.shares = numberOfShares;
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

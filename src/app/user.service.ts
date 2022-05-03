import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly Local_Stocks: string = 'STOCKS';

  private stock: string[];

  constructor() {
      this.stock = UserService.getStockFromStorage();
  }

  private static getStockFromStorage(): string[] {
      return JSON.parse(localStorage.getItem(UserService.Local_Stocks)) || [];
  }

  private saveStock(): void {
      localStorage.setItem(UserService.Local_Stocks, JSON.stringify(this.stock));
  }

  public addStocks(stk: string): void {
      if (this.stock.includes(stk)) {
          return;
      }
      this.stock.push(stk);
      this.saveStock();
  }

  public removeStock(stk: string): void {
      this.stock = this.stock.filter((s: string) => s !== stk);
      this.saveStock();
  }

  public getStocks(): string[] {
      return this.stock;
  }
}

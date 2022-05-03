import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompanyName } from '@app/company-name';
import { DataService } from '@app/data.service';
import { UserService } from '@app/user.service';
import { Quotes } from '../quotes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private static readonly LocalStock: string = 'STOCKS';
  public stock: FormControl;
  public stocks=[]
  public stockData: Quotes[]=[]
  stockSymbol: CompanyName[]=[]
  public symbol=[];public k:number
  constructor(private userService: UserService, private dataService: DataService){}

  ngOnChanges(changes: SimpleChanges): void {
  }
  public ngOnInit(): void {
      this.stock = new FormControl('', { validators: [Validators.required, Validators.pattern(/^[A-Z]{1,5}$/)] });
      this.stocks = this.userService.getStocks();
      for(var i=0;i<this.stocks.length;i++)
      {
        this.getStockData(this.stocks[i],i)
      }
      this.k=i
  }

  getStockData(ele,i){
    this.dataService.getSymbols(ele).subscribe((response) => {
      var data1 = JSON.stringify(response)
      let data = JSON.parse(data1)
      this.stockSymbol.push(data);
      this.symbol.push(this.stockSymbol[i].result[0].description)
    })

    this.dataService.getData(ele).subscribe((response) => {
      var data1 = JSON.stringify(response)
      let data = JSON.parse(data1)
      this.stockData.push(data);
    })

  }

  public addStock(): void {
    this.stocks.forEach(element => {
      if(element===this.stock.value)
        return;
    });
      if (this.stock.valid) {
          this.userService.addStocks(this.stock.value)
          this.getStockData(this.stock.value,this.k)
          this.k=this.k+1
          this.stock.reset('');
      }
  }

  close(stk){
    this.userService.removeStock(stk)
    window.location.reload();
  }

  getArrow(s){
    if(s>0)
      return true;
    else
      return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { CompanyName } from './company-name';
import { Quotes } from './quotes';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url1="https://finnhub.io/api/v1/quote?symbol="
  public url2="https://finnhub.io/api/v1/search?q="
  public url3="https://finnhub.io/api/v1/stock/insider-sentiment?symbol="

  constructor(private http: HttpClient) { }

  getData(stk : string){
    return this.http.get<Quotes[]>(this.url1+stk+'&token=bu4f8kn48v6uehqi3cqg')
  }

  getSymbols(stk : string){
    return this.http.get<CompanyName[]>(this.url2+stk+'&token=bu4f8kn48v6uehqi3cqg')
  }

  getSentimentData(stk: string){
    let date1= new Date();
    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
     let date2 =  new Date(date1.setMonth(date1.getMonth() - 3));
     let date3 = formatDate(date2, 'yyyy-MM-dd', 'en');
    return this.http.get<Symbol[]>(this.url3+stk+"&from="+date3+"&to="+date+"&token=bu4f8kn48v6uehqi3cqg")
  }


}

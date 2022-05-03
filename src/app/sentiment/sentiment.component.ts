import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/data.service';
import { Symbol } from '@app/symbol';
@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  public sentimental$:string;
  public sentData: Symbol[]=[]
  public symbol:string
  public month:string
  public months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sentimental$ = params.get('stock')!;
    });
    this.getData();
  }

  getData(){
   // console.log(" shgcshgchsvh "+this.sentimental$)
    this.dataService.getSymbols(this.sentimental$).subscribe((response) => {
      var data1 = JSON.stringify(response)
      let data = JSON.parse(data1)
      this.symbol=data.result[0].description
    })

    this.dataService.getSentimentData(this.sentimental$).subscribe((response) => {
      var data1 = JSON.stringify(response)
      let data = JSON.parse(data1)
      this.sentData.push(data);
      //console.log(this.sentData[0].data)
    })
  }

  getMonth(mon){
    //console.log(" vvdjkvfjfk  "+this.month)
    return this.months[mon-1]
  }

  getArrow(s){
    if(s>0)
      return true;
    else
      return false;
  }

}

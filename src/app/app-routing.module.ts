import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SentimentComponent } from './sentiment/sentiment.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sentiment/:stock', component: SentimentComponent},
  {path:'**', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

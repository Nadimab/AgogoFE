import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface CombinationElement {
  breakfast: string;
  position: number;
  lunch: string;
  dinner: string;
}

const ELEMENT_DATA: CombinationElement[] = [
];


@Component({
    selector: 'app-mealprep',
    templateUrl: './mealprep.component.html',
    styleUrls: ['./mealprep.component.css'],
})
export class MealprepComponent{
  mealplanForm: FormGroup;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  mealPlanData: any;

  displayedColumns: string[] = ['select', 'position', 'breakfast', 'lunch', 'dinner'];
  dataSource = new MatTableDataSource<CombinationElement>(ELEMENT_DATA);
  selection = new SelectionModel<CombinationElement>(true, []);


  constructor(private observer: BreakpointObserver, private router: Router, private http:HttpClient, private fb: FormBuilder){
    this.mealplanForm = this.fb.group({
      protein: '',
      carbs: '',
      fat: '',
      daysnbr: ''
    });
  }
  generateMealPlan(){
    alert("protein = "+this.mealplanForm.get('protein')?.value+";carbs = "+this.mealplanForm.get('carbs')?.value+ ";fat = "+this.mealplanForm.get('fat')?.value)
    this.fetchMealPrep('1',this.mealplanForm.get('protein')?.value,this.mealplanForm.get('carbs')?.value,this.mealplanForm.get('fat')?.value,this.mealplanForm.get('daysnbr')?.value)
    console.log('Generate')
    console.log(this.mealplanForm.get('protein')?.value)
   }


   fetchMealPrep(dietitianId:String ,prot: number,crbs: number,ft: number,dn: number){
    // Define the query parameters
    const dietitian_ID = dietitianId;
    const protein_goal = prot;
    const carbs_goal = crbs;
    const fat_goal = ft;
    const nbr_days = dn;
    const params = {
      dietitian_ID,
      protein_goal,
      carbs_goal,
      fat_goal,
      nbr_days
    };

    console.log(params)
    const body = JSON.stringify(params);
    console.log(body)

    const transformedBody = {
      dietitian_ID,
      "protein_goal": parseInt(JSON.parse(body)["protein_goal"]),
      "carbs_goal": parseInt(JSON.parse(body)["carbs_goal"]),
      "fat_goal": parseInt(JSON.parse(body)["fat_goal"]),
      "nbr_days": parseInt(JSON.parse(body)["nbr_days"])
    };
    console.log(transformedBody)

     // Define the headers
     const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
    this.http.post('http://127.0.0.1:5000/MealPrep/generateMealPlan', JSON.stringify(transformedBody), { headers }).subscribe((data) => {
      // Handle the response data here
      const jsonData1 = JSON.stringify(data);
      const jsonData2 = jsonData1.replace(/"{\\/g, '{');
      const jsonData = jsonData2.replace(/\\/g,'').replace(/}"/g,'}');
      console.log(jsonData) ;
      this.mealPlanData = JSON.parse(jsonData);
      alert('yoww2 '+this.mealPlanData.best_combinations[0].score) ;
      alert(this.mealPlanData.best_combinations[0].breakfast.name) ;
      // Remove data from table
      ELEMENT_DATA.length = 0;
      // Fill the combination element
      for (var i = 0; i < this.mealPlanData.best_combinations.length; i++) {
        console.log(i);
        ELEMENT_DATA.push({position: i+1, breakfast: this.mealPlanData.best_combinations[i].breakfast.name, lunch: this.mealPlanData.best_combinations[i].lunch.name, dinner: this.mealPlanData.best_combinations[i].dinner.name});
        this.dataSource = new MatTableDataSource<CombinationElement>(ELEMENT_DATA);
      }

      alert('yoww3 '+ELEMENT_DATA[0].breakfast) ;
    }, (error) => {
      // Handle errors here
      console.error(error);
      alert(error);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CombinationElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
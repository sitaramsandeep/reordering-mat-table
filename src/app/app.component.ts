import { Component, ViewChild, ContentChildren, QueryList, forwardRef
 } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('table') table: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'reorder'];
  dataSource = ELEMENT_DATA;
  
  dropTable(element, operation) {
    let selectedElePosition = element.position;
    const prevIndex = this.dataSource.findIndex((d) => d === element);
    let newPosition;
    if (operation == 'INC' && !(prevIndex <= 0)) {
      newPosition = prevIndex - 1
    } else if (operation == 'DEC' && !(prevIndex+1 >= this.dataSource.length)) {
      newPosition = prevIndex +1
    }
    if (newPosition >= 0) {
      this.dataSource[prevIndex].position = this.dataSource[newPosition].position
      this.dataSource[newPosition].position = selectedElePosition;
      moveItemInArray(this.dataSource, prevIndex, newPosition);
    }
    this.table.renderRows();
  }
}

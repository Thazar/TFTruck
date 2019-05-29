import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface State {
  flag: string;
  name: string;
}
export interface typ {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Polska',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Poland.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg'
    },
    {
      name: 'Niemcy',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Germany.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg'
    },
    {
      name: 'Francja',
      // https://commons.wikimedia.org/wiki/File:Flag_of_France.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'
    },
    {
      name: 'Włochy',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Italy.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg'
    }
  ];
  value = '';
  adresValue= '';
  valueOd='';
  valueDo='';
  foods: typ[] = [
    {value: 'firanka-0', viewValue: 'Firanka'},
    {value: 'plandeka-1', viewValue: 'Plandeka'},
    {value: 'chłodnia-2', viewValue: 'Chłodnia'},
    {value: 'izoterma-3', viewValue: 'Izoterma'},
  ];
  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

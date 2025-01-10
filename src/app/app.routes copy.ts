import {Routes} from '@angular/router';
import {NewResultsComponentComponent} from './new-results-component/new-results-component.component';
import {ResultComponentComponent} from './result-component/result-component.component';
import {TableComponentComponent} from './table-component/table-component.component';

export const routes: Routes = [
  {path: 'result', component: ResultComponentComponent},
  {path: 'newResults', component: NewResultsComponentComponent},
  { path: 'table',component: TableComponentComponent },
  {path: '', redirectTo: 'result', pathMatch: 'full'}
];

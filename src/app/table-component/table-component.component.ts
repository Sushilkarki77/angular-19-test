import { Component, effect } from '@angular/core';
import { AppStateService, ResultObject, Team, TeamsMap } from '../app-state.service';
import { CommonModule, NgClass } from '@angular/common';
import { TableUtilsService } from '../table-utils.service';

@Component({
  selector: 'app-table-component',
  imports: [CommonModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {

  resultRawData: Array<ResultObject> = [];

  teamArray: Array<Team> = [];

  constructor(private appStateService: AppStateService, private tableUtilService: TableUtilsService) {
    effect(() => {
      this.resultRawData = this.appStateService.items();
      this.teamArray = this.tableUtilService.processTableData(this.resultRawData);
    });
  }

}

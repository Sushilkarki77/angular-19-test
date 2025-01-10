import { Component, effect } from '@angular/core';
import { AppStateService, ResultObject,  } from '../app-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-component',
  imports: [CommonModule],
  templateUrl: './result-component.component.html',
  styleUrl: './result-component.component.scss'
})
export class ResultComponentComponent {

  results: Array<ResultObject> = [];

  constructor(private appStateService: AppStateService) {
    effect(() => {
      this.results = this.appStateService.items();
     
    });

  }

  ngOnInit() {
    // console.log(this.appStateService.items());
  }

}

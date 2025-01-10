import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import { AppStateService } from '../app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-results-component',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-results-component.component.html',
  styleUrl: './new-results-component.component.scss'
})
export class NewResultsComponentComponent {

  myForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private router: Router) {
    this.myForm = this.fb.group({
        teamOne: ['', [Validators.required]],
        teamTwo: ['', [Validators.required]],
        score: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        score2: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        date: ['', Validators.required]
      }, {
        validator: [this.duplicateTeamValidation('teamOne', 'teamTwo'), this.dateValidator('date')]
      }
    );
  }


  duplicateTeamValidation(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['shouldNotMatch']) {
        return;
      }

      if (control.value === matchingControl.value) {
        matchingControl.setErrors({ shouldNotMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  dateValidator(controlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
       const currentDate = new Date().toISOString().slice(0, 10);
      if (control.errors && !control.errors['futureDate']) {
        return;
      }

      if(control.value > currentDate) { // future date is detected
        control.setErrors({ futureDate: true });
      } else {
        control.setErrors(null);
      }      
    }
  }


  ngOnInit() {}

  get f(): any { return this.myForm.controls; }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.myForm.invalid) { return; }

    const id = crypto.randomUUID();

    const resultObject = {...this.myForm.value, id};

    this.appStateService.addItems(resultObject);

    this.router.navigate(['result']);

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  passportForm: FormGroup;

  constructor(private _formBuilder: FormBuilder)  {
    this.passportForm = this._formBuilder.group({
      type: ['', [Validators.required, Validators.maxLength(1)]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      passportNumber: ['', [Validators.required, Validators.maxLength(9)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  submit(){}

}

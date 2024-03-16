import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOptionForm } from '../interfaces/option-form.interface';
import { IPassport } from '../interfaces/passport-validation.interface';
import { ZmlserviceService } from '../services/zmlservice.service';
import { IZml } from '../interfaces/zml.interface';
import { IApiExceptions } from '../interfaces/exceptions.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}

  private readonly pattern = "^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\\d|2[0-8])[- /.]02)[- /.]\\d{4}|29[- /.]02[- /.](\\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$";
  passportForm: FormGroup;
  options: IOptionForm[] = [
    {
      value: "M",
      option: "MALE"
    },
    {
      value: "F",
      option: "FEMALE"
    }
  ]
  private passportModel: IPassport = {};
  firstLine:string = ""
  secondLine:string = ""

  constructor(private _formBuilder: FormBuilder,
              private _zmlService: ZmlserviceService)  {
    this.passportForm = this._formBuilder.group({
      type: ['', [Validators.required, Validators.maxLength(1)]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      passportNumber: ['', [Validators.required, Validators.maxLength(9)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required,
                        Validators.pattern(this.pattern)]],
      sex: [null, [Validators.required]],
      dateIssue: ['', [Validators.required,
                        Validators.pattern(this.pattern)]],
      dateExpiry: ['', [Validators.required,
                        Validators.pattern(this.pattern)]],
      optionalData: ['', [Validators.maxLength(14)]]
    });
  }

  submit(){
    this.passportModel = this.passportForm.value;
    this.passportModel.country="";
    console.log(this.passportModel)

    this._zmlService.apiRequest(this.passportModel)
      .subscribe( (resp: IZml) => {
        this.firstLine = resp.firstLine;
        this.secondLine = resp.secondLine;
      },
      (error: IApiExceptions) => {
        console.error(error);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-buttonspage',
  templateUrl: './buttonspage.component.html',
  styleUrls: ['./buttonspage.component.scss']
})
export class ButtonspageComponent implements OnInit {
  //Single Button Toggle
  singleModel: string = '1';
  //Select All Button group Toggle
  checkModel: any = { left: false, middle: true, right: false };
  //Select Group Single toggle
  myForm: UntypedFormGroup;

  radioModel: string = 'Middle';
  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      radio: 'C'
    });
  }
}

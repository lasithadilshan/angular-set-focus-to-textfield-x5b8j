import { Component, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('aForm') aForm: ElementRef;
  @ViewChild('f') f: NgForm;

  @HostListener('keyup', ['$event'])
  keyevent(event) {

    if (event.keyCode === 38) {
      this.setPrevFocus(event.target.name);
    }
    if (event.keyCode === 40) {
      this.setValue(event);
      this.setNextFocus(event.target.name);

    }
  }

  constructor(private render: Renderer2, private interactivityChecker: InteractivityChecker) { }

  setFocus(name) {    
    const ele = this.aForm.nativeElement[name];    
    if (ele) {
      ele.focus();
    }
  }

  setPrevFocus(currentId) {
    const ctrls = Object.keys(this.f.controls);
    for (let key = ctrls.indexOf(currentId) - 1; key >= 0; key--) {
      const control = this.aForm.nativeElement[ctrls[key]];
      if (control && this.interactivityChecker.isFocusable(control)) {
        control.focus();
        control.select();
        break;
      }
    }
  }

  setNextFocus(currentId) {
    const ctrls = Object.keys(this.f.controls);
    for (let key = ctrls.indexOf(currentId) + 1; key < ctrls.length; key++) {
      const control = this.aForm.nativeElement[ctrls[key]];
      if (control && this.interactivityChecker.isFocusable(control)) {
        control.focus();
        control.select();        
        break;
      }
    }
  }

  setValue(evt) {
    const { name, value } = evt.target;
    this.f.form.get(name).setValue(value);
    this.render.setProperty(this.aForm.nativeElement[name], 'value', dateFormat(value));

  }
}


function dateFormat(dateStr) {
  if (dateStr.length === 8) {
    dateStr = String(dateStr).substring(0, 4) + '.' +
      String(dateStr).substring(4, 6) + '.' +
      String(dateStr).substring(6, 8);
  }
  else if (dateStr.length === 7) {
    dateStr = String(dateStr).substring(0, 3) + '.' +
      String(dateStr).substring(3, 5) + '.' +
      String(dateStr).substring(5, 7);
  }
  else if (dateStr.length === 6) {
    dateStr = String(dateStr).substring(0, 2) + '.' +
      String(dateStr).substring(2, 4) + '.' +
      String(dateStr).substring(4, 6);
  }
  return dateStr;
}
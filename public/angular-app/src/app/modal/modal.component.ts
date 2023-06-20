import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input()
  modelId:string = "";

  @Input()
  header: string= "";

  @Input()
  body: string= "";

  @Input()
  confimClass: string= "";

  @Input()
  confirmText: string= "";

  @Output()
  confirmClick: EventEmitter<any> = new EventEmitter();

  clickOnConfirm() {
    this.confirmClick.emit(null);
  }

}

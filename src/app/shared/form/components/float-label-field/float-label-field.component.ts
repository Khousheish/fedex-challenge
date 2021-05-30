import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fc-float-label-field',
  templateUrl: './float-label-field.component.html',
  styleUrls: ['./float-label-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatLabelFieldComponent {
  @Input() public translationPath: string = '';
  @Input() public isVisible: boolean = true;
  @Input() public fieldClass: string = 'form-input';
  @Input() public labelFor: string = '';
  @Input() public formGroup: FormGroup | null = null;
  @Input() public label: string = '';
  @Input() public isRequired: boolean = false;
}

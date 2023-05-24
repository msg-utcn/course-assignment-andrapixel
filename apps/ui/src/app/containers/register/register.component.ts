import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { RegisterModel } from '../../data-models/register.model';

@Component({
  selector: 'course-project-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements DoCheck {
  constructor(private registerService: RegisterService) {}

  public register(registerModel: RegisterModel): void {
    this.registerService.register(registerModel).subscribe();
  }

  ngDoCheck(): void {
    console.log('register check!');
  }
}

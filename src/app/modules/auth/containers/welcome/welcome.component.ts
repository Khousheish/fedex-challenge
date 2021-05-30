import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@Modules/auth/models/user.model';
import { AuthFacade } from '@Modules/auth/store/auth.facade';

@Component({
  selector: 'fc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private userSubscription: Subscription | null = null;

  public constructor(
    private readonly authFacade: AuthFacade,
  ) {
  }

  public ngOnInit(): void {
    this.userSubscription = this.authFacade.user$.subscribe((user: User): void => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}

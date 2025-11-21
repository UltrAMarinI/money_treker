import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BackendService } from '../../shared/services/backend';
import { SubjectService } from '../../shared/services/subject.service';

@Component({
  selector: 'app-authentication-component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDividerModule,
  ],
  templateUrl: './authentication-component.component.html',
  styleUrl: './authentication-component.component.scss',
  standalone: true,
})
export class AuthenticationComponentComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  isLogin = true;
  hide = signal(true);
  errorMessage = signal('');

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router,
    private sbjService: SubjectService
  ) {}

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // Проверяем, что Enter нажат и форма заполнена
    if (this.loginForm.valid) {
      event.preventDefault(); // Предотвращаем стандартное поведение
      this.submit();
    }
  }

  ngOnInit(): void {
    this.isLogin = this.route.snapshot.url[0]?.path === 'login';
    merge(
      this.loginForm.controls['email'].valueChanges,
      this.loginForm.controls['email'].statusChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.loginForm.controls['email'].hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  loginUser() {
    this.backendService.postLogin(this.loginForm.value).subscribe((jwt) => {
      this.sbjService.userName.next(this.loginForm.value.email);
      localStorage.setItem('token', jwt.token);
      this.router.navigate(['/main']);
    });
  }

  singupUser() {
    this.backendService.postAuth(this.loginForm.value).subscribe((jwt) => {
      localStorage.setItem('token', jwt.token);
      this.router.navigate(['/main']);
    });
  }

  submit() {
    if (this.loginForm.valid) {
      if (this.isLogin) {
        this.loginUser();
      } else {
        this.singupUser();
      }
    }
  }
}

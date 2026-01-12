import { Component, OnInit } from '@angular/core';
import { NameSubjectService } from '../../../shared/services/nameSubject.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translate.service';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-component',
  imports: [FormsModule, AsyncPipe, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss',
  standalone: true,
})
export class HeaderComponentComponent implements OnInit {
  //шапка с языками и именем пользователя и выходом
  constructor(
    private sbjService: NameSubjectService,
    private router: Router,
    public langService: TranslateService
  ) {}

  usrName = 'имя';
  // languageRus: boolean = true;
  // languageEng: boolean = false;

  ngOnInit(): void {
    this.sbjService.userName.subscribe(name => {
      this.usrName = name;
    });
  }

  changeLanguage(lang: string) {
    this.langService.setLanguage(lang);
  }

  logoutButton() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}

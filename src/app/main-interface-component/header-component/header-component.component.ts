import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../shared/services/subject.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translate.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss',
  standalone: true,
})
export class HeaderComponentComponent implements OnInit {
  //шапка с языками и именем пользователя и выходом
  constructor(
    private sbjService: SubjectService,
    private router: Router,
    public langService: TranslateService
  ) {}

  usrName = 'имя';
  languageRus: boolean = true;
  languageEng: boolean = false;

  ngOnInit(): void {
    console.log('this.sbjService.userName', this.sbjService.userName);

    this.sbjService.userName.subscribe((name) => {
      console.log(name);
      this.usrName = name;
      console.log(this.usrName);
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

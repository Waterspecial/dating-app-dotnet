import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {};
  protected selectedTheme = signal<string>(localStorage.getItem('theme' )|| 'light')
  protected themes =  themes;

  login() {
    console.log(this.creds);
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        console.log(response);
        this.creds = {};
      },
      error: (e) => {
        console.log(e);
        this.toast.error(e.error )
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  handleSelectedTheme (theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
}

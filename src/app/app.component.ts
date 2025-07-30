import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  template: `
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      min-height: 100vh;
    }
    
    .content-wrapper {
      padding-bottom: 80px; /* Altura do footer + um pouco extra */
      margin-bottom: 80px;
    }
    
    app-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 60px; /* Altura fixa do footer */
      z-index: 1000;
    }
  `]
})
export class AppComponent {
  title = 'pessoas-app';
}

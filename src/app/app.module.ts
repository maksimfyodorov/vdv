import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/ospo/header/header.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { initialize } from './shared/auth/initialize';
import { AuthService } from './shared/services/auth.service';
import { NotificationModule } from './shared/components/ospo/notification/notification.module';
import { MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgxNotifierModule, NgxNotifierService } from 'ngx-notifier';
import { DatabaseModeInterceptor } from './shared/interceptors/database-mode.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HeaderModule,
    HttpClientModule,
    NotificationModule,
    ScrollPanelModule,
    NgxNotifierModule,
    MatDialogModule,
    MatSnackBarModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [
    MessageService,
    NgxNotifierService,
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      multi: true,
      deps: [HttpClient, AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DatabaseModeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],


  bootstrap: [AppComponent],
})
export class AppModule {
}

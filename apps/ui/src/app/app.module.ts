import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule, authRoutes } from './authentication.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    RouterModule.forRoot([{ path: 'auth', children: authRoutes }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/Usuario.service';
import { DateTimeFormatPipe } from '../app/helpers/DateTimeFormat.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsuariosListaComponent } from './main/usuarios/usuarios-lista/usuarios-lista.component';
import { UsuariosComponent } from './main/usuarios/usuarios.component';
import { UsuariosDetalheComponent } from './main/usuarios/usuarios-detalhe/usuarios-detalhe.component';
import { EscolaridadePipe } from './helpers/Escolaridade.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosListaComponent,
    UsuariosDetalheComponent,
    UsuariosComponent,
    NavComponent,
    DateTimeFormatPipe,
    EscolaridadePipe,
    TituloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}

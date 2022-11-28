import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosDetalheComponent } from './main/usuarios/usuarios-detalhe/usuarios-detalhe.component';
import { UsuariosListaComponent } from './main/usuarios/usuarios-lista/usuarios-lista.component';
import { UsuariosComponent } from './main/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: [
      { path: 'detalhe/:id', component: UsuariosDetalheComponent },
      { path: 'detalhe', component: UsuariosDetalheComponent },
      { path: 'lista', component: UsuariosListaComponent }
    ],
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss'],
})
export class UsuariosListaComponent implements OnInit {
  modalRef?: BsModalRef;
  public usuarios: Usuario[] = [];
  public usuariosFiltrados: Usuario[] = [];
  public usuarioId: any;
  private _filtroLista: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.usuarioId = id;
  }

  confirm(): void {
    this.modalRef?.hide();
    this.usuarioService.delete(this.usuarioId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success(
            'O Evento foi deletado com Sucesso.',
            'Deletado!'
          );
          this.router.navigate([`usuarios/lista`]);
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar deletar o evento ${this.usuarioId}`,
          'Erro'
        );
      }
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  ngOnInit() {
    this.getUsuarios();
  }

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.usuariosFiltrados = this.filtroLista
      ? this.filtrarUsuarios(this.filtroLista)
      : this.usuarios;
  }

  filtrarUsuarios(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      (usuario: { nome: String , sobrenome: String}) =>
        usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        usuario.sobrenome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (_usuarios: Usuario[]) => {
        (this.usuarios = _usuarios), (this.usuariosFiltrados = _usuarios);
      },
      (error) => console.log(error)
    );
  }

  public detalheUsuario(id: number): void {
    this.router.navigate([`usuarios/detalhe/${id}`]);
  }
}

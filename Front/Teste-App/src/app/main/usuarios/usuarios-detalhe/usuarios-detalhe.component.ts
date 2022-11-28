import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-usuarios-detalhe',
  templateUrl: './usuarios-detalhe.component.html',
  styleUrls: ['./usuarios-detalhe.component.scss'],
  providers: [DatePipe],
})
export class UsuariosDetalheComponent implements OnInit {
  form!: FormGroup;
  usuarioId: any;
  estadoSalvar: string = 'post';
  usuario: any;
  constructor(
    private usuarioService: UsuarioService,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
  }

  public salvarUsuario(): void {
    if (this.form.valid) {
      this.usuario =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.usuario.id, ...this.form.value };

      if (this.estadoSalvar != 'put') {
        this.usuarioService.post(this.usuario).subscribe(
          (usuarioRetorno: Usuario) => {
            this.toastr.success('Usuario salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`usuarios/detalhe/${usuarioRetorno.id}`]);
          },
          (error: any) => {
            if(error.error.indexOf("nascimento") >= 0){
              this.toastr.error('Error ao salvar usuario, data de nascimento maior que a data atual.', 'Erro');
            }else{
              this.toastr.error('Error ao salvar usuario.', 'Erro');
            }
          }
        );
      } else {
        this.usuarioService.put(this.usuarioId, this.usuario).subscribe(
          (usuarioRetorno: Usuario) => {
            this.toastr.success('Usuario salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`usuarios/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.toastr.error('Error ao salvar usuario', 'Erro');
          }
        );
      }
    }
  }

  public carregarUsuario(): void {
    this.usuarioId = +this.activatedRouter.snapshot.paramMap.get('id')!;
    if (this.usuarioId !== null && this.usuarioId !== 0) {
      this.estadoSalvar = 'put';

      this.usuarioService.getUsuariosById(this.usuarioId).subscribe(
        (usuario: Usuario[]) => {
          this.usuario = { ...usuario };
          this.usuario.dataNascimento = this.datePipe.transform(
            this.usuario.dataNascimento,
            'yyyy-MM-dd'
          );
          this.form.patchValue(this.usuario);
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar usuario.', 'Erro!');
          console.error(error);
        }
      );
    }
  }

  public validation(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataNascimento: new FormControl('', [Validators.required]),
      escolaridade: new FormControl('', [Validators.required]),
    });
  }
}

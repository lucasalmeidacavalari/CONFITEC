using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teste.Application.Contract;
using Teste.Domain;
using Teste.Persistence.Contract;

namespace Teste.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IUsuarioPersist _UsuarioPersist;
        public UsuarioService(IGeralPersist geralPersist, IUsuarioPersist UsuarioPersist)
        {
            this._UsuarioPersist = UsuarioPersist;
            this._geralPersist = geralPersist;

        }

        public async Task<Usuario> AddUsuarios(Usuario model)
        {
            try
            {
                var dataHoje = DateTime.Now;
                if(model.DataNascimento > dataHoje) throw new Exception("Data de nascimento maior ou igual data atual");
                _geralPersist.Add<Usuario>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _UsuarioPersist.GetUsuariosByIdAsync(model.Id);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario> UpdateUsuario(int UsuarioId, Usuario model)
        {
            try
            {
                var usuario = await _UsuarioPersist.GetUsuariosByIdAsync(UsuarioId);
                if (usuario == null) return null;

                model.Id = usuario.Id;

                _geralPersist.Update<Usuario>(model);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var usuarioRetorno = await _UsuarioPersist.GetUsuariosByIdAsync(usuario.Id);
                    return model;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteUsuario(int UsuarioId)
        {
            try
            {
                var usuario = await _UsuarioPersist.GetUsuariosByIdAsync(UsuarioId);
                if (usuario == null) throw new Exception("usuario para delete não encontrado.");

                _geralPersist.Delete<Usuario>(usuario);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<Usuario[]> GetAllUsuariosByAsync()
        {
            try
            {
                var Usuarios = await _UsuarioPersist.GetAllUsuariosByAsync();
                if (Usuarios == null) return null;
                return Usuarios;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario[]> GetAllUsuariosByNomeAsync(string nome)
        {
            try
            {
                var Usuarios = await _UsuarioPersist.GetAllUsuariosByNomeAsync(nome);
                if (Usuarios == null) return null;
                return Usuarios;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario> GetUsuariosByIdAsync(int UsuarioId)
        {
            try
            {
                var Usuarios = await _UsuarioPersist.GetUsuariosByIdAsync(UsuarioId);
                if (Usuarios == null) return null;
                return Usuarios;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teste.Domain;

namespace Teste.Application.Contract
{
    public interface IUsuarioService
    {
        Task<Usuario> AddUsuarios(Usuario model);
        Task<Usuario> UpdateUsuario(int UsuarioId, Usuario model);
        Task<bool> DeleteUsuario(int UsuarioId);
        Task<Usuario[]> GetAllUsuariosByNomeAsync(string nome);
        Task<Usuario[]> GetAllUsuariosByAsync();
        Task<Usuario> GetUsuariosByIdAsync(int UsuarioId);
    }
}
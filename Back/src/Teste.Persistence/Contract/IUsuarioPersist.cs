using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teste.Domain;

namespace Teste.Persistence.Contract
{
    public interface IUsuarioPersist
    {
        //Usuario
        Task<Usuario[]> GetAllUsuariosByNomeAsync(string nome);
        Task<Usuario[]> GetAllUsuariosByAsync();
        Task<Usuario> GetUsuariosByIdAsync(int UsuarioId);
    }
}
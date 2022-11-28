using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Teste.Domain;
using Teste.Persistence.Context;
using Teste.Persistence.Contract;

namespace Teste.Persistence
{
    public class UsuariosPersist : IUsuarioPersist
    {
        private readonly TesteContext _context;
        public UsuariosPersist(TesteContext _context)
        {
            this._context = _context;

        }
        public async Task<Usuario[]> GetAllUsuariosByAsync()
        {
            IQueryable<Usuario> query = _context.Usuarios;

            query = query.OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Usuario[]> GetAllUsuariosByNomeAsync(string nome)
        {
            IQueryable<Usuario> query = _context.Usuarios;

            query = query.OrderBy(e => e.Id).Where(e => e.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Usuario> GetUsuariosByIdAsync(int UsuarioId)
        {
            IQueryable<Usuario> query = _context.Usuarios.AsNoTracking();

            query = query.OrderBy(e => e.Id).Where(e => e.Id == UsuarioId);

            return await query.FirstAsync();
        }
    }
}
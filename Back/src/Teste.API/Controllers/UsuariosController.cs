using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Teste.Persistence;
using Teste.Domain;
using Teste.Persistence.Context;
using Teste.Application.Contract;
using Microsoft.AspNetCore.Http;

namespace Teste.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _UsuarioService;
        public UsuariosController(IUsuarioService UsuarioService)
        {
            this._UsuarioService = UsuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Usuarios = await _UsuarioService.GetAllUsuariosByAsync();
                if (Usuarios == null) return NotFound("Nenhum Usuario encontrado!");

                return Ok(Usuarios);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error ao tentar recuperar Usuarios. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            try
            {
                var Usuario = await _UsuarioService.GetUsuariosByIdAsync(Id);
                if (Usuario == null) return NotFound("Nenhum Usuario por Id encontrado!");

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error ao tentar recuperar Usuarios. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var Usuario = await _UsuarioService.GetAllUsuariosByNomeAsync(nome);
                if (Usuario == null) return NotFound("Nenhum Usuario por nome encontrado!");

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error ao tentar recuperar Usuarios. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Usuario model)
        {
            try
            {
                var Usuario = await _UsuarioService.AddUsuarios(model);
                if (Usuario == null) return BadRequest("Erro ao tentar adicionar o Usuario.");

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error ao tentar adicionar Usuario. Erro: {ex.Message}");
            }
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, Usuario model)
        {
            try
            {
                var usuario = await _UsuarioService.UpdateUsuario(Id, model);
                if (usuario == null) return NoContent();

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar usuarios. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var usuario = await _UsuarioService.GetUsuariosByIdAsync(Id);
                if (usuario == null) return NoContent();

                if (await _UsuarioService.DeleteUsuario(Id))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar usuario.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar usuarios. Erro: {ex.Message}");
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Teste.Application.Dtos;
using Teste.Domain;

namespace Teste.Application.Helpers
{
    public class TesteProfile : Profile
    {
        public TesteProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnet_server.Models;
using dotnet_server.Database;

namespace dotnet_server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class OwnersController : ControllerBase
  {

    private readonly ILogger<OwnersController> _logger;
    private readonly IOwnersRepository _ownersRepository;
    public OwnersController(ILogger<OwnersController> logger, IOwnersRepository ownersRepository)
    {
      _logger = logger;
      _ownersRepository = ownersRepository;
    }

    [HttpGet]
    [Route("")]
    public IEnumerable<Owner> GetOwners()
    {
      var owners = _ownersRepository.GetOwners();
      return owners;
    }

    [HttpGet]
    [Route("{id}")]
    public Owner GetOwner(int id)
    {
      var owner = _ownersRepository.GetOwner(id);
      return owner;
    }


    [HttpPost]
    public Owner CreateOwner([FromBody] Owner owner)
    {
      return _ownersRepository.CreateOwner(owner);
    }
  }
}
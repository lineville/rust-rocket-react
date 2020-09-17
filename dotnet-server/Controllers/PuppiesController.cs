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
  public class PuppiesController : ControllerBase
  {

    private readonly ILogger<PuppiesController> _logger;
    private readonly IPuppiesRepository _puppiesRepository;
    public PuppiesController(ILogger<PuppiesController> logger, IPuppiesRepository puppiesRepository)
    {
      _logger = logger;
      _puppiesRepository = puppiesRepository;
    }

    [HttpGet]
    [Route("")]
    public IEnumerable<Puppy> GetPuppies([FromQuery] int skip = 0, [FromQuery] int take = Int32.MaxValue)
    {
      var puppies = _puppiesRepository.GetPuppies(skip, take);
      return puppies;
    }

    [HttpGet]
    [Route("{id}")]
    public Puppy GetPuppy(int id)
    {
      var pup = _puppiesRepository.GetPuppy(id);
      return pup;
    }

    [HttpPost]
    [Route("")]
    public Puppy CreatePuppy([FromBody] Puppy puppy)
    {
      var pup = _puppiesRepository.CreatePuppy(puppy);
      return pup;
    }

    [HttpPut]
    [Route("")]
    public Puppy UpdatePuppy([FromBody] Puppy puppy)
    {
      var pup = _puppiesRepository.UpdatePuppy(puppy);
      return pup;
    }

    [HttpDelete]
    [Route("{id}")]
    public Puppy DeletePuppy(int id)
    {
      var pup = _puppiesRepository.DeletePuppy(id);
      return pup;
    }
  }
}

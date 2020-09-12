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
    public IActionResult GetPuppies([FromQuery] int? skip, [FromQuery] int? take)
    {
      var puppies = _puppiesRepository.GetPuppies(skip, take);
      return Ok(puppies);
    }

    [HttpGet]
    [Route("{id}")]
    public Puppy GetPuppy(int id)
    {
      var pup = _puppiesRepository.GetPuppy(id);
      return pup;
    }
  }
}

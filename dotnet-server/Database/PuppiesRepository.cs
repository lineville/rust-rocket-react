using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dotnet_server.Models;

namespace dotnet_server.Database
{
  public class PuppiesRepository : IPuppiesRepository
  {
    private readonly PuppiesContext _context;

    public PuppiesRepository(PuppiesContext context)
    {
      _context = context;
    }

    public IEnumerable<Puppy> GetPuppies(int? skip, int? take)
    {
      var puppies = _context.Puppies.Include(p => p.Owner).OrderBy(p => p.Id).Skip(skip ?? 0).Take(take ?? Int32.MaxValue).ToList();
      return puppies;
    }

    public Puppy GetPuppy(int id)
    {
      var puppy = _context.Puppies.Find(id);
      return puppy;
    }

  }
}
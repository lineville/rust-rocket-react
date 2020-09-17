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

    public IEnumerable<Puppy> GetPuppies(int skip, int take)
    {
      var puppies = _context.Puppies.Include(p => p.Owner)
                                    .OrderBy(p => p.Id)
                                    .Skip(skip * take)
                                    .Take(take)
                                    .ToList();
      return puppies;
    }

    public Puppy GetPuppy(int id)
    {
      Puppy puppy = _context.Puppies.Find(id);
      return puppy;
    }

    public Puppy CreatePuppy(Puppy puppy)
    {
      var pup = new Puppy()
      {
        Id = puppy.Id,
        Name = puppy.Name,
        Breed = puppy.Breed,
        Age = puppy.Age,
        OwnerId = puppy.OwnerId,
        Owner = puppy.Owner,
      };
      _context.Puppies.Add(pup);
      _context.SaveChanges();
      return pup;
    }

    public Puppy UpdatePuppy(Puppy puppy)
    {
      var pup = _context.Puppies.Update(puppy);
      var owner = _context.Owners.FirstOrDefault(o => o.Id == puppy.OwnerId);
      _context.SaveChanges();
      return new Puppy()
      {
        Id = puppy.Id,
        Name = puppy.Name,
        Breed = puppy.Breed,
        Age = puppy.Age,
        OwnerId = puppy.OwnerId,
        Owner = owner,
      };
    }

    public Puppy DeletePuppy(int id)
    {
      var pup = _context.Puppies.Find(id);
      _context.Puppies.Remove(pup);
      _context.SaveChanges();
      return pup;
    }

  }
}
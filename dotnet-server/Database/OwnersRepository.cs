using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dotnet_server.Models;

namespace dotnet_server.Database
{
  public class OwnersRepository : IOwnersRepository
  {
    private readonly PuppiesContext _context;

    public OwnersRepository(PuppiesContext context)
    {
      _context = context;
    }

    public Owner CreateOwner(Owner owner)
    {
      var newOwner = new Owner()
      {
        Id = owner.Id,
        FirstName = owner.FirstName,
        LastName = owner.LastName,
      };
      _context.Owners.Add(newOwner);
      _context.SaveChanges();
      return newOwner;
    }

    public Owner GetOwner(int id)
    {
      var owner = _context.Owners.Find(id);
      return owner;
    }

    public Owner GetOwnerByPuppyId(int idPuppy)
    {
      var owner = _context.Owners.FirstOrDefault(o => o.Puppies.Any(p => p.Id == idPuppy));
      return owner;

    }

    public IEnumerable<Owner> GetOwners()
    {
      var pups = _context.Owners.Include(o => o.Puppies)
                                .OrderBy(o => o.Id)
                                .ToList();
      return pups;
    }
  }
}
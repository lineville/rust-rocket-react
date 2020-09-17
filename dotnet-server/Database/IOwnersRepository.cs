using System;
using System.Collections.Generic;
using dotnet_server.Models;

namespace dotnet_server.Database
{
  public interface IOwnersRepository
  {
    public IEnumerable<Owner> GetOwners();
    public Owner GetOwner(int id);
    public Owner GetOwnerByPuppyId(int idPuppy);
    public Owner CreateOwner(Owner owner);
  }
}
using System;
using System.Collections.Generic;
using dotnet_server.Models;

namespace dotnet_server.Database
{
  public interface IPuppiesRepository
  {
    public IEnumerable<Puppy> GetPuppies(int? skip, int? take);
    public Puppy GetPuppy(int id);
  }
}
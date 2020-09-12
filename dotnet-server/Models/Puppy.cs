using System;
using System.Collections.Generic;

namespace dotnet_server.Models
{
  public partial class Puppy
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Breed { get; set; }
    public int Age { get; set; }
    public int? OwnerId { get; set; }

    public virtual Owner Owner { get; set; }
  }
}

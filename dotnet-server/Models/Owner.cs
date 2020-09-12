using System;
using System.Collections.Generic;

namespace dotnet_server.Models
{
  public partial class Owner
  {
    public Owner()
    {
      Puppies = new HashSet<Puppy>();
    }

    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public virtual ICollection<Puppy> Puppies { get; set; }
  }
}

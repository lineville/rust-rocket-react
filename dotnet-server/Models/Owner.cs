using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace dotnet_server.Models
{
  public partial class Owner
  {
    public Owner()
    {
      Puppies = new HashSet<Puppy>();
    }

    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("first_name")]
    public string FirstName { get; set; }

    [JsonProperty("last_name")]
    public string LastName { get; set; }

    public virtual ICollection<Puppy> Puppies { get; set; }
  }
}

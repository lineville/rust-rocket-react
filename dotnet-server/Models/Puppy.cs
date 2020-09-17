using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace dotnet_server.Models
{
  public partial class Puppy
  {
    [JsonProperty("id")]
    public int Id { get; set; } = 0;

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("breed")]
    public string Breed { get; set; }

    [JsonProperty("age")]
    public int Age { get; set; }

    [JsonProperty("owner_id")]
    public int? OwnerId { get; set; }

    public virtual Owner Owner { get; set; }
  }
}

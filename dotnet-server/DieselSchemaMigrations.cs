using System;
using System.Collections.Generic;

namespace dotnet_server
{
    public partial class DieselSchemaMigrations
    {
        public string Version { get; set; }
        public DateTime RunOn { get; set; }
    }
}

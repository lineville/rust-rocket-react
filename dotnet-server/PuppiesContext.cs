using System;
using dotnet_server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace dotnet_server
{
  public partial class PuppiesContext : DbContext
  {
    public PuppiesContext()
    {
    }

    public PuppiesContext(DbContextOptions<PuppiesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Owner> Owners { get; set; }
    public virtual DbSet<Puppy> Puppies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        optionsBuilder.UseNpgsql("Host=localhost;Database=puppies;Username=lineville;Password=Bazel2()");
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Owner>(entity =>
      {
        entity.ToTable("owners");

        entity.Property(e => e.Id).HasColumnName("id");

        entity.Property(e => e.FirstName)
                  .IsRequired()
                  .HasColumnName("first_name")
                  .HasColumnType("character varying");

        entity.Property(e => e.LastName)
                  .IsRequired()
                  .HasColumnName("last_name")
                  .HasColumnType("character varying");
      });

      modelBuilder.Entity<Puppy>(entity =>
      {
        entity.ToTable("puppies");

        entity.Property(e => e.Id).HasColumnName("id");

        entity.Property(e => e.Age).HasColumnName("age");

        entity.Property(e => e.Breed)
                  .IsRequired()
                  .HasColumnName("breed")
                  .HasColumnType("character varying");

        entity.Property(e => e.Name)
                  .IsRequired()
                  .HasColumnName("name")
                  .HasColumnType("character varying");

        entity.Property(e => e.OwnerId).HasColumnName("owner_id");

        entity.HasOne(d => d.Owner)
                  .WithMany(p => p.Puppies)
                  .HasForeignKey(d => d.OwnerId)
                  .HasConstraintName("fk_owner");
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}

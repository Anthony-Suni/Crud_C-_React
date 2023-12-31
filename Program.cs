using Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;

// Configuración para UserContext
builder.Services.AddDbContext<UserContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// Configuración para MovieContext
builder.Services.AddDbContext<MovieContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// Configuración para RatingContext
builder.Services.AddDbContext<RatingContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));


// Configuración CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilitar CORS
app.UseCors("ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();





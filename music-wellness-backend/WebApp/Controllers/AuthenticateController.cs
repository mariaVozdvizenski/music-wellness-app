using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]  
    [ApiController]  
    public class AuthenticateController : ControllerBase  
    {
        private readonly UserManager<User> userManager;  
        private readonly RoleManager<Role> roleManager;  
        private readonly SignInManager<User> signInManager;

        private readonly IConfiguration _configuration;  
  
        public AuthenticateController(UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager, IConfiguration configuration)  
        {  
            this.userManager = userManager;  
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            _configuration = configuration;  
        }  
        
        [HttpPost]  
        [Route("login")]  
        public async Task<IActionResult> Login([FromBody] LoginModel model)  
        {  
            var user = await userManager.FindByNameAsync(model.Username);  
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var authClaims = await signInManager.CreateUserPrincipalAsync(user);
  
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));  
  
                var token = new JwtSecurityToken(  
                    issuer: _configuration["JWT:Issuer"],  
                    audience: _configuration["JWT:Issuer"], 
                    notBefore: null,
                    expires: DateTime.Today.AddDays(double.Parse(_configuration["JWT:ExpirationInDays"])),  
                    claims: authClaims.Claims.Append(new Claim(ClaimTypes.GivenName, user.UserName)),  
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)  
                );  
  
                return Ok(new  
                {  
                    id = user.Id,
                    userName = user.UserName,
                    isAdmin = await userManager.IsInRoleAsync(user, UserRoles.Admin),
                    token = new JwtSecurityTokenHandler().WriteToken(token),  
                    expiration = token.ValidTo  
                });  
            }  
            return Unauthorized();  
        }  
        
        [HttpPost]  
        [Route("register")]  
        public async Task<IActionResult> Register([FromBody] RegisterModel model)  
        {  
            var userExists = await userManager.FindByNameAsync(model.Username);  
            if (userExists != null)  
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });  
  
            User user = new User()  
            {  
                SecurityStamp = Guid.NewGuid().ToString(),  
                UserName = model.Username  
            };  
            var result = await userManager.CreateAsync(user, model.Password);  
            if (!result.Succeeded)  
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });  
        }  
        
        [HttpPost]  
        [Route("register-admin")]  
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)  
        {  
            var userExists = await userManager.FindByNameAsync(model.Username);  
            if (userExists != null)  
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });  
  
            User user = new User()  
            {  
                SecurityStamp = Guid.NewGuid().ToString(),  
                UserName = model.Username  
            };  
            var result = await userManager.CreateAsync(user, model.Password);  
            if (!result.Succeeded)  
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });  
  
            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))  
                await roleManager.CreateAsync(new Role{Name = UserRoles.Admin});  
            if (!await roleManager.RoleExistsAsync(UserRoles.User))  
                await roleManager.CreateAsync(new Role{Name = UserRoles.User});  
  
            if (await roleManager.RoleExistsAsync(UserRoles.Admin) & await roleManager.RoleExistsAsync(UserRoles.User))  
            {  
                await userManager.AddToRoleAsync(user, UserRoles.User); 
                await userManager.AddToRoleAsync(user, UserRoles.Admin);  
            }  
  
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });  
        }  
    }
}
using Microsoft.AspNetCore.Mvc;

using bounty_board.controllers;
using bounty_board.repos;
using Newtonsoft.Json;

namespace bounty_board.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BountyController : ControllerBase, IBountyController
    {
        private readonly IBountyRepo _repo;
        public BountyController(IBountyRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public string GetBounties()
        {
            return JsonConvert.SerializeObject(_repo.GetBounties());
        }

        [HttpGet]
        public string IsEmployeeIDValid(int id)
        {
            return JsonConvert.SerializeObject(_repo.IsEmployeeIDValid(id));
        }
    }
}
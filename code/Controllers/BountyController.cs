using Microsoft.AspNetCore.Mvc;

using bounty_board.controllers;
using bounty_board.repos;
using bounty_board.models;

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
        public string GetUsers(int? id)
        {
            return JsonConvert.SerializeObject(_repo.GetUsers(id));
        }

        [HttpGet]
        public string IsEmployeeIDValid(int id)
        {
            return JsonConvert.SerializeObject(_repo.IsEmployeeIDValid(id));
        }

        [HttpPost]
        public void AssignBounty([FromBody]BountyAssignment model)
        {
            _repo.AssignBounty(model);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using bounty_board.controllers;
using bounty_board.repos;

namespace bounty_board.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BountyController : ControllerBase, IBountyController
    {
        private readonly IBountyRepo _repo;
        public BountyController(IBountyRepo repo)
        {
            _repo = repo;
        }

        public string GetBounties()
        {
            return string.Empty;
        }
    }
}
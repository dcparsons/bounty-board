﻿using Microsoft.AspNetCore.Mvc;

using bounty_board.controllers;
using bounty_board.repos;
using Newtonsoft.Json;

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

        [HttpGet]
        public string GetBounties()
        {
            return JsonConvert.SerializeObject(_repo.GetBounties());
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

using bounty_board.models;

using Dapper;
namespace bounty_board.repos
{
    public class BountyRepo : IBountyRepo
    {
        public IEnumerable<IBounty> GetBounties()
        {
            using (var cnx = new SqlConnection(""))
            {
                return cnx.Query<IBounty>("exec usp_Bounties_Select").ToList();
            }
        }
    }
}

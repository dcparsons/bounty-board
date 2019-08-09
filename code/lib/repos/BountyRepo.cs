using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

using bounty_board.models;

using Dapper;
using Microsoft.Extensions.Configuration;

namespace bounty_board.repos
{
    public class BountyRepo : IBountyRepo
    {
        private readonly string _cnxString;
        public BountyRepo(IConfiguration configuration)
        {
            _cnxString = configuration.GetConnectionString("bounty-connection");
        }
        public IEnumerable<IBounty> GetBounties()
        {
            IEnumerable<IBounty> bounties;

            using (var cnx = new SqlConnection(_cnxString))
            {
                var lst = cnx.Query<Bounty>("exec usp_Bounties_Select").ToList();
                var parents = lst.Where(x => x.PID == 0).ToList();
                parents.ForEach(x => { x.Children = BuildHierarchy(x, lst); });
                bounties = parents;
            }

            return bounties;

        }

        public bool IsEmployeeIDValid(int id)
        {
            var retval = false;
            using (var cnx = new SqlConnection(_cnxString))
            {
                retval = ((SqlDataReader)cnx.ExecuteReader("exec usp_Users_Select @id", new { id = id }, commandType:CommandType.StoredProcedure)).HasRows;
            }

            return retval;
        }

        private IEnumerable<IBounty> BuildHierarchy(IBounty currentBounty, IEnumerable<IBounty> bounties)
        {
            var currentList = bounties.Where(x => x.PID == currentBounty.ID).ToList();
            currentList.ForEach(x =>
            {
                x.Children = BuildHierarchy(x, bounties);
            });
            return currentList;
        }
    }
}

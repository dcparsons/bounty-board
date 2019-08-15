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
                //This is pretty messy but Dapper doesn't expose an IDataReader or a HasRows property
                var rdr = (SqlDataReader) ((IWrappedDataReader) cnx.ExecuteReader(
                    string.Format("exec usp_Users_Select @id={0}", id))).Reader;
                retval = rdr.HasRows;
            }

            return retval;
        }

        public void AssignBounty(IBountyAssignment bountyAssignment)
        {
            using (var cnx = new SqlConnection(_cnxString))
            {
                cnx.Execute(
                    string.Format("exec usp_Bounties_Assign @userID={0}, @bountyID={1}", bountyAssignment.UserID, bountyAssignment.BountyID));
            }
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

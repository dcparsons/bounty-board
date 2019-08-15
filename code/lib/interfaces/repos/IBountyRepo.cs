using System.Collections.Generic;

using bounty_board.models;

namespace bounty_board.repos
{
    public interface IBountyRepo
    {
        IEnumerable<IBounty> GetBounties();
        bool IsEmployeeIDValid(int id);
        IEnumerable<IUser> GetUsers(int? id);
        void AssignBounty(IBountyAssignment bountyAssignment);
    }
}

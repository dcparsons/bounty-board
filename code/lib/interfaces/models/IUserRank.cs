using System.Collections.Generic;

namespace bounty_board.models
{
    public interface IUserRank
    {
        string Name { get; set; }
        int Score { get; set; }
        IEnumerable<IBounty> CompletedBounties { get; set; }
    }
}

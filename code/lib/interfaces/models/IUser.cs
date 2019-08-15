using System.Collections.Generic;

namespace bounty_board.models
{
    public interface IUser
    {
        string Name { get; set; }
        int Points { get; set; }
        IEnumerable<IBounty> CompletedBounties { get; set; }
    }
}

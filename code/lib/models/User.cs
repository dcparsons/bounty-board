using System.Collections.Generic;

namespace bounty_board.models
{
    public class User : IUser
    {
        public string Name { get; set; }
        public int Points { get; set; }
        public IEnumerable<IBounty> CompletedBounties { get; set; }
    }
}

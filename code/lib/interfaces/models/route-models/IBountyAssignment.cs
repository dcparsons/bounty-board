using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bounty_board.models
{
    public interface IBountyAssignment
    {
        int UserID { get; set; }
        int BountyID { get; set; }
    }
}

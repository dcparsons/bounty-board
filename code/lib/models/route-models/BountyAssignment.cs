using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bounty_board.models
{
    public class BountyAssignment : IBountyAssignment
    {
        public int UserID { get; set; }
        public int BountyID { get; set; }
    }
}

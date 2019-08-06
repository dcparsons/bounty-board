using System;
using System.Collections.Generic;

namespace bounty_board.models
{
    public class Bounty : IBounty
    {
        public int ID { get; set; }
        public int PID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Points { get; set; }
        public DateTime CreatedDtm { get; set; }
        public bool Repeatable { get; set; }
        public IEnumerable<IBounty> Children { get; set; }
    }
}

using System;

namespace bounty_board.models
{
    public interface IBounty
    {
        int ID { get; set; }
        int PID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        int Points { get; set; }
        DateTime CreatedDtm { get; set; }
        bool Repeatable { get; set; }
    }
}

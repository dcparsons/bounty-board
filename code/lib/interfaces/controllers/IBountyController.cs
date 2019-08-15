using bounty_board.models;

namespace bounty_board.controllers
{
    public interface IBountyController
    {
        string GetBounties();
        string IsEmployeeIDValid(int id);
        void AssignBounty(BountyAssignment model);
    }
}

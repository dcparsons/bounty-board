CREATE ROLE [db_executor] AUTHORIZATION [dbo]
GRANT EXECUTE TO [db_executor]
CREATE USER svc_bountyboard FROM LOGIN svc_bountyboard;
ALTER ROLE db_datareader ADD MEMBER svc_bountyboard;
ALTER ROLE db_datawriter ADD MEMBER svc_bountyboard;
ALTER ROLE db_executor ADD MEMBER svc_bountyboard;




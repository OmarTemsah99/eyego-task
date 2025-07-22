import { prisma } from "@/prisma/client";
import IssuesTable from "./IssuesTable";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <main className="p-8">
      <IssuesTable initialIssues={issues} />
    </main>
  );
};

export default IssuesPage;

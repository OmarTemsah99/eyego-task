import { prisma } from "@/prisma/client";
import IssuesTable from "./IssuesTable";

const IssuesPage = async () => {
  const issuesFromDb = await prisma.issue.findMany();

  const issues = issuesFromDb.map((issue) => ({
    ...issue,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
  }));

  return (
    <main className="p-8">
      <IssuesTable initialIssues={issues} />
    </main>
  );
};

export default IssuesPage;

import { Issue } from "@/prisma/app/generated/prisma/client";
import { prisma } from "@/prisma/client";

export default async function Home() {
  const issues = await prisma.issue.findMany();

  return (
    <main className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Issues</h1>
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
              ID
            </th>
            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
              Title
            </th>
            <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue: Issue) => (
            <tr key={issue.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                {issue.id}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                {issue.title}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                {issue.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

<h1 align="center">🐛 Issue Tracker <br /> <em>(EyeGo-Task)</em></h1>

<p align="center">
  A modern, full-featured issue tracking application built with <strong>Next.js 15</strong>, <strong>Prisma</strong>, <strong>Redux Toolkit</strong>, and <strong>Tailwind CSS 4</strong>. Visualize, manage, and track issues seamlessly.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.4.2-blue.svg" />
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB.svg" />
  <img src="https://img.shields.io/badge/Prisma-6.12.0-3982CE.svg" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0.0-38BDF8.svg" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.8.2-764ABC.svg" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg" />
</p>

<hr />

<h2>✨ Features</h2>

<ul>
  <li>📊 <strong>Dashboard</strong>: Stats cards, Pie Chart (issue distribution), Bar Chart (monthly issue count), and recent activity</li>
  <li>📋 <strong>Issues Page</strong>: Dynamic listing with sorting, filtering, and pagination</li>
  <li>🔐 <strong>Authentication</strong>: Google OAuth via NextAuth.js, profile image support</li>
  <li>⚙️ <strong>Prisma ORM</strong>: Typed PostgreSQL/MySQL database interaction</li>
  <li>📦 <strong>State Management</strong>: Redux Toolkit with client-side filtering & pagination</li>
  <li>🎨 <strong>Tailwind CSS 4</strong>: Fully responsive and mobile-friendly UI</li>
</ul>

<hr />

<h2>🚀 Getting Started</h2>

<ol>
  <li>📦 Clone the repository</li>

  <pre><code>git clone https://github.com/your-username/eyego-task.git
cd eyego-task
npm install
</code></pre>

  <li>⚙️ Create a <code>.env</code> file at the root:</li>

  <pre><code>DATABASE_URL=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
</code></pre>

  <li>🧬 <strong>Prisma Setup</strong></li>

  <pre><code>npx prisma init           # initializes prisma folder
npx prisma db push        # creates the DB schema
npx prisma generate       # generates client
</code></pre>

  <li>🛂 <strong>NextAuth Setup (Google OAuth)</strong></li>

  <ul>
    <li>Create a Google OAuth Client at <a href="https://console.cloud.google.com/apis/credentials">Google Cloud Console</a></li>
    <li>Set <code>http://localhost:3000</code> as Authorized redirect URI</li>
    <li>Paste the credentials in the <code>.env</code> file</li>
  </ul>

  <li>🌐 <strong>Run the dev server</strong></li>

  <pre><code>npm run dev
</code></pre>
</ol>

<hr />

<h2>🧱 Tech Stack</h2>

<ul>
  <li><strong>Next.js 15</strong> – Full-stack React framework</li>
  <li><strong>React 19</strong> – Declarative UI library</li>
  <li><strong>Redux Toolkit</strong> – Scalable client state management</li>
  <li><strong>Prisma ORM</strong> – Type-safe database client</li>
  <li><strong>NextAuth.js</strong> – Authentication (OAuth & Email)</li>
  <li><strong>Tailwind CSS 4</strong> – Utility-first styling</li>
  <li><strong>Recharts</strong> – Customizable charts</li>
  <li><strong>Zod</strong> – Schema validation</li>
</ul>

<hr />

<h2>📁 Folder Structure</h2>

<pre>
/app
  /api            - Auth & CRUD API routes
  /dashboard      - Dashboard page and components
  /issues         - Issue listing, detail, and table components
  /components     - Shared UI components
  /store          - Redux Toolkit slices
  /lib            - Helpers and utilities
  /prisma         - Prisma schema and client
</pre>

<hr />

<h2>📸 Demo</h2>

<p>
  <a href="https://drive.google.com/file/d/1F17xpgBD-Bjkaq8Fnu58LWPyeWR0LkLk/view?usp=sharing" target="_blank">
    ▶️ View Project Demo (Google Drive)
  </a>
</p>

<hr />

<h2>🤝 Contributing</h2>

<p>Feel free to fork this repository and submit pull requests. To contribute:</p>
<ol>
  <li>Fork the project</li>
  <li>Create your feature branch (<code>git checkout -b feature/awesome-feature</code>)</li>
  <li>Commit your changes (<code>git commit -m 'Add awesome feature'</code>)</li>
  <li>Push to the branch (<code>git push origin feature/awesome-feature</code>)</li>
  <li>Open a Pull Request</li>
</ol>

<hr />

<h2>📝 License</h2>

<p>This project is licensed under the <code>MIT License</code> – feel free to use, modify, and share.</p>

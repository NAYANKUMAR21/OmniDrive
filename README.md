# 📁 OmniDrive — Your Personal Cloud File Manager

**OmniDrive**, a sleek and powerful cloud storage application where users can upload, organize, and share ANY type of file with ease. This is a full-stack solution built using **Next.js**, with a focus on performance, usability, and collaboration — all in one beautiful dashboard.

## 1. Auth Page

![DriveX Screenshot 2](./public/assets/images/ReadMe2.png)

## 2. Dash-Board

![DriveX Screenshot 1](./public/assets/images/ReadMe1.png)

---

## 🚀 Features

- 🔄 **Upload Any File Type** — From documents to videos, upload and store any file format.
- ✏️ **Rename Files** — Easily rename files for better organization.
- 👥 **Share with Multiple Users** — Collaborate by sharing files with any number of users.
- 🗑️ **Delete Files** — Remove files with a single click when no longer needed.
- 🧠 **Smart UI** — Visually segregated file types with a categorized layout.
- 📊 **Dashboard Overview** — Intuitive usage stats showing storage consumption.
- 🔒 **OAuth Authentication** — Secure login via Google OAuth.
- ⚡ **Server-Side Rendering & API Routes** — Blazing-fast interactions using Next.js capabilities.

---

## 🧱 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Actions, SSR)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [MariaDB](https://mariadb.org/)
- **Authentication:** Built-in OAuth (Google) without Passport.js

---

## 📂 Folder Structure

<pre lang="markdown">
    <code> 
app
├── (auth)
│   ├── sign-in
│   │   └── page.tsx
│   ├── sign-up
│   │   ├── page.tsx
│   │   └── layout.tsx
├── (root)
│   └── [type]
│       ├── page.tsx
│       ├── layout.tsx
│       └── page.tsx
├── api
├── fonts
├── favicon.ico
├── globals.css
└── layout.tsx


     
     </code>
     </pre>

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nayankumar21/OnmiDrive.git

cd OnmiDrive

npm install

```

### 2. Create .env.local to store credentails

```
DATABASE_URL=mysql://user:password@host:port/dbname
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret

```

### 3. Run the server

```
npm run dev
```

After starting the Server Visit URL - http://localhost:3000

# Docker ..

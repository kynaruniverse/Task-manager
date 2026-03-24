# ⚡ Omni Task Manager

Minimal, fast, persistent task manager. Zero dependencies, runs anywhere.

## 🚀 Setup (Spck Editor)
1. Create a new folder named `task-manager`.
2. Copy the files into the folder.
3. Open `index.html` – it just works.

## 🔗 GitHub Push & Pages
1. Create a new GitHub repository (no README, no .gitignore).
2. Upload all files (or push via terminal).
3. Go to **Settings > Pages** → Source: `GitHub Actions`.
4. The included workflow will automatically deploy on every push.

## 📁 File Structure
task-manager/
├── index.html
├── style.css
├── script.js
├── README.md
└── .github/workflows/deploy.yml


## 💡 Features
- Add / delete tasks
- Mark tasks complete (click text)
- Persists tasks in localStorage
- Responsive, glassmorphic UI
- Zero external dependencies

## ⚙️ GitHub Actions Workflow
The `.github/workflows/deploy.yml` file deploys to GitHub Pages automatically using `actions/upload-pages-artifact` and `actions/deploy-pages`.
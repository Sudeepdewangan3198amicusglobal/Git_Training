1. Project Overview
This repository demonstrates practical Git and GitHub version control workflows.
It is part of the Amicus Fresher Development Program 2026.
The project is a simple HTML, CSS, and JavaScript application.
It is used to practice real-world Git operations such as:
Branching
Merging
Rebasing
Conflict resolution
Cherry-picking
Stashing
Bisecting
Git hooks
History inspection


2. Training Details
Name: Sudeep Dewangan
Training Batch: Amicus Fresher Development Program 2026
Project Type: HTML / CSS / JavaScript
Repository: git-training-Sudeep
Initial Date: 10 August 2026

3. Project Structure
Repository structure:
git-training-Sudeep/
│
├── .git/
├── .gitignore
├── README.md
├── RECOVERY.md
├── BRANCHING-STRATEGY.md
├── COMMIT-CONVENTIONS.md
│
├── index.html
├── style.css
└── app.js

4. Git Workflow Summary

This project includes the following Git operations:

Repository initialization and configuration
Feature branching workflow
Fast-forward merge
3-way merge
Merge conflict resolution
Rebase workflow
Cherry-pick (selective commits)
Git stash (temporary work storage)
Interactive rebase (commit cleanup)
Git bisect (bug tracking)
Git hooks (commit validation)
Git blame (history tracking)
Git tags (version releases)


5. .gitignore
Ignored Files
.vs/
.vscode/
.idea/
bin/
obj/
node_modules/
dist/
.DS_Store
Thumbs.db
Importance of .gitignore
Prevents unnecessary system files from being tracked
Avoids IDE and build files in repository
Keeps repository clean and lightweight


6. Initial Commits
index.html → base structure
style.css → styling setup
app.js → JavaScript functionality


7. Branching Strategy
Feature Branches
Format:
feature/<feature-name>
Examples:
feature/add-navigation
feature/add-footer
feature/add-sidebar
Hotfix Branches
Format:
hotfix/<issue-name>
Example:
hotfix/urgent-fix


8. Merge Strategy
Fast-forward merge:
Used when no branch divergence exists
3-way merge:
Used when branches diverge
Conflict resolution:
Done manually when same file is modified in multiple branches


9. Rebase Strategy
Used to:
Maintain linear commit history
Clean commit structure
Sync feature branch with latest main
Important rule:
Do NOT rebase shared/public branches


10. Commit Convention
Format
type: message
Types
feat → new feature
fix → bug fix
style → formatting changes
docs → documentation updates
chore → maintenance tasks
Examples
feat: add navigation component
fix: resolve footer alignment issue
docs: update README


11. Git Tags
Versions
v0.1
v0.2
v1.0
Commands
git tag v1.0
git push origin v1.0


12. Key Git Commands
Status & History
git status
git log --oneline --graph
Branching
git switch -c feature/example
git switch main
Merging
git merge feature/example
Rebase
git rebase main
Cherry-pick
git cherry-pick <commit-hash>
Stash
git stash push -m "WIP"
git stash apply
Recovery
git revert <commit-hash>
git reset --hard <commit-hash>
git reflog
Debugging
git bisect start
git blame <file>


13. Git Hooks
Pre-commit hook is used
Blocks commits containing:
TODO
FIXME
Purpose
Ensures clean and production-ready commits


14. Recovery Strategy
Git Revert
Safest way to undo changes
Creates a new commit
Git Reset
Rewrites history
Dangerous on shared branches
Git Reflog
Used to recover lost commits


15. Key Learnings
Branching improves collaboration
Rebase keeps history clean
Merge conflicts are normal
Stash helps manage incomplete work
Bisect helps find bugs quickly
Hooks enforce code quality
Blame helps track code history


16. Conclusion
This project demonstrates a complete Git workflow.
It covers real-world software development practices.
It includes version control, collaboration, debugging, and release management.
import subprocess
import sys

commits = [
    ("04de8af", "feat: add HPP calculator tool"),
    ("12b1c5f", "style: add responsive design to HPP calculator"),
    ("6be0439", "fix: resolve responsive layout issues in HPP calculator"),
    ("61f90ff", "feat: add website price calculator tool"),
    ("c3fe941", "style: update theme for website price calculator"),
    ("1aef3eb", "feat: create tools page and add navigation links"),
    ("461f515", "feat: update tools page layout and content"),
    ("647b150", "fix: remove unnecessary elements from tools page"),
    ("61c804e", "refactor: optimize logic in main.js"),
    ("3f62f78", "fix: resolve broken link in index.html"),
    ("3280f10", "fix: update tools page layout"),
    ("51298f4", "style: adjust color theme in website price calculator"),
    ("597b710", "refactor: extract inline CSS and JS into separate files for maintainability"),
    ("eabc24b", "fix: add IntersectionObserver to tools.js to animate elements in"),
    ("9473859", "feat: add favicon to all pages"),
    ("a098f2a", "docs: update README.md with project details")
]

# Get the base commit
base_commit = "85389fe"

# Ensure we are on main and clean
subprocess.run(["git", "checkout", "main"])
subprocess.run(["git", "branch", "-D", "rewrite-history"], stderr=subprocess.DEVNULL)
subprocess.run(["git", "checkout", "-b", "rewrite-history", base_commit])

success = True
for commit_hash, message in commits:
    print(f"Cherry picking {commit_hash}...")
    res = subprocess.run(["git", "cherry-pick", commit_hash])
    if res.returncode != 0:
        print(f"Conflict on {commit_hash}! Aborting.")
        success = False
        break
    subprocess.run(["git", "commit", "--amend", "-m", message])

if success:
    print("Success! Replacing main branch...")
    subprocess.run(["git", "checkout", "main"])
    subprocess.run(["git", "reset", "--hard", "rewrite-history"])
    subprocess.run(["git", "branch", "-D", "rewrite-history"])
    print("History rewritten successfully on local main branch.")
else:
    print("Failed to rewrite history.")
    subprocess.run(["git", "cherry-pick", "--abort"])
    subprocess.run(["git", "checkout", "main"])

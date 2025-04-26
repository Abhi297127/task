import os

# Define the full folder structure
folders = [
    "FullStackInternChallenge/backend/src/middleware",
    "FullStackInternChallenge/backend/src/routes",
    "FullStackInternChallenge/backend/src/utils",
    "FullStackInternChallenge/frontend/public",
    "FullStackInternChallenge/frontend/src/components",
    "FullStackInternChallenge/frontend/src/context",
]

# Define the files to create inside folders
files = {
    "FullStackInternChallenge/backend/src/middleware/auth.js": "",
    "FullStackInternChallenge/backend/src/routes/admin.js": "",
    "FullStackInternChallenge/backend/src/routes/user.js": "",
    "FullStackInternChallenge/backend/src/routes/store.js": "",
    "FullStackInternChallenge/backend/src/utils/validation.js": "",
    "FullStackInternChallenge/backend/src/db.js": "",
    "FullStackInternChallenge/backend/.env": "",
    "FullStackInternChallenge/backend/package.json": "",
    "FullStackInternChallenge/backend/server.js": "",
    "FullStackInternChallenge/frontend/public/index.html": "",
    "FullStackInternChallenge/frontend/public/favicon.ico": "",
    "FullStackInternChallenge/frontend/src/components/Login.js": "",
    "FullStackInternChallenge/frontend/src/components/Signup.js": "",
    "FullStackInternChallenge/frontend/src/components/AdminDashboard.js": "",
    "FullStackInternChallenge/frontend/src/components/UserDashboard.js": "",
    "FullStackInternChallenge/frontend/src/components/StoreOwnerDashboard.js": "",
    "FullStackInternChallenge/frontend/src/components/ProtectedRoute.js": "",
    "FullStackInternChallenge/frontend/src/context/AuthContext.js": "",
    "FullStackInternChallenge/frontend/src/App.js": "",
    "FullStackInternChallenge/frontend/src/index.js": "",
    "FullStackInternChallenge/frontend/src/styles.css": "",
    "FullStackInternChallenge/frontend/.env": "",
    "FullStackInternChallenge/frontend/package.json": "",
    "FullStackInternChallenge/database.sql": "",
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)
    print(f"Created folder: {folder}")

# Create files
for filepath, content in files.items():
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created file: {filepath}")

print("\nProject structure created successfully!")
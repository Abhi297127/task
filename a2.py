
import os

# List of all folders and files to create for frontend
frontend_paths = [
    "frontend/public/index.html",
    "frontend/src/api/auth.js",
    "frontend/src/api/store.js",
    "frontend/src/api/user.js",
    "frontend/src/api/rating.js",
    "frontend/src/components/LoginForm.jsx",
    "frontend/src/components/RegisterForm.jsx",
    "frontend/src/components/Dashboard.jsx",
    "frontend/src/components/StoreList.jsx",
    "frontend/src/components/RatingForm.jsx",
    "frontend/src/components/Navbar.jsx",
    "frontend/src/pages/AdminDashboard.jsx",
    "frontend/src/pages/UserDashboard.jsx",
    "frontend/src/pages/StoreOwnerDashboard.jsx",
    "frontend/src/routes/AppRouter.jsx",
    "frontend/src/utils/auth.js",
    "frontend/src/utils/validation.js",
    "frontend/src/App.jsx",
    "frontend/src/index.js",
    "frontend/package.json",
    "frontend/.env",
]

for path in frontend_paths:
    folder = os.path.dirname(path)
    os.makedirs(folder, exist_ok=True)  # Create the folder if it doesn't exist
    with open(path, 'w') as f:
        pass  # Create an empty file

print("Frontend folder and file structure created successfully.")

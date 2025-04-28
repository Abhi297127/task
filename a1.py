import os

# Updated backend folder and file paths
backend_paths = [
    "backend/src/app.module.ts",
    "backend/src/main.ts",
    "backend/src/auth/auth.module.ts",
    "backend/src/auth/auth.service.ts",
    "backend/src/auth/auth.controller.ts",
    "backend/src/auth/jwt.strategy.ts",
    "backend/src/users/users.module.ts",
    "backend/src/users/users.service.ts",
    "backend/src/users/users.controller.ts",
    "backend/src/users/entities/user.entity.ts",
    "backend/src/users/dto/create-user.dto.ts",
    "backend/src/users/dto/update-password.dto.ts",
    "backend/src/stores/stores.module.ts",
    "backend/src/stores/stores.service.ts",
    "backend/src/stores/stores.controller.ts",
    "backend/src/stores/entities/store.entity.ts",
    "backend/src/ratings/ratings.module.ts",
    "backend/src/ratings/ratings.service.ts",
    "backend/src/ratings/ratings.controller.ts",
    "backend/src/ratings/entities/rating.entity.ts",
    "backend/src/common/guards/roles.guard.ts",
    "backend/src/common/decorators/roles.decorator.ts",
    "backend/src/common/enums/role.enum.ts",
    "backend/src/common/constants/index.ts",
    "backend/ormconfig.ts",
    "backend/package.json",
    "backend/tsconfig.json",
]

for path in backend_paths:
    folder = os.path.dirname(path)
    os.makedirs(folder, exist_ok=True)  # Create folders if not exist
    with open(path, 'w') as f:
        pass  # Create empty file

print("Updated backend folder and file structure created successfully.")

git checkout main
git pull origin main
git fetch origin

$branch = "bernabe-inche"
$allowedPath = "pages/$branch"

Write-Host ""
Write-Host "Procesando rama: $branch"

git checkout $branch
git pull origin $branch

# Merge dando prioridad a main en conflictos
git merge main -X theirs --no-edit

# Traer desde main todo EXCEPTO pages y git
git restore --source=main --staged --worktree -- . ":(exclude)pages" ":(exclude)git"

# Quitar git si existe como carpeta versionada
git rm -r --ignore-unmatch git

# Quitar todas las pages actuales de la rama
git rm -r --ignore-unmatch pages

# Traer SOLO pages/$branch desde main, con prioridad a main
git restore --source=main --staged --worktree -- $allowedPath

git add -A

$changes = git status --porcelain

if ($changes) {
    git commit -m "Sincronizar main hacia $branch con prioridad a main"
    git push origin $branch
    Write-Host "✔ $branch actualizado correctamente"
} else {
    git push origin $branch
    Write-Host "⏭ No hubo cambios para sincronizar"
}

git checkout main
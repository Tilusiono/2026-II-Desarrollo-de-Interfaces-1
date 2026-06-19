git checkout main
git pull origin main

$branch = "bernabe-inche"

Write-Host ""
Write-Host "Procesando rama: $branch"

git checkout $branch
git pull origin $branch

$tempPath = ".tmp_pages_$branch"
$tempGitPath = ".tmp_git_$branch"

if (Test-Path $tempPath) {
    Remove-Item $tempPath -Recurse -Force
}

if (Test-Path $tempGitPath) {
    Remove-Item $tempGitPath -Recurse -Force
}

# Guardar SOLO pages/$branch
if (Test-Path "pages/$branch") {
    Copy-Item "pages/$branch" $tempPath -Recurse -Force
}

# Guardar carpeta git
if (Test-Path "git") {
    Copy-Item "git" $tempGitPath -Recurse -Force
}

# Reemplazar toda la rama con main
git reset --hard main

# Eliminar pages completa
if (Test-Path "pages") {
    Remove-Item "pages" -Recurse -Force
}

# Eliminar git que vino desde main
if (Test-Path "git") {
    Remove-Item "git" -Recurse -Force
}

# Restaurar SOLO pages/$branch
if (Test-Path $tempPath) {
    New-Item -ItemType Directory -Force -Path "pages" | Out-Null
    Copy-Item $tempPath "pages/$branch" -Recurse -Force
    Remove-Item $tempPath -Recurse -Force
}

# Restaurar carpeta git original de la rama
if (Test-Path $tempGitPath) {
    Copy-Item $tempGitPath "git" -Recurse -Force
    Remove-Item $tempGitPath -Recurse -Force
}

git add -A

$changes = git status --porcelain

if ($changes) {
    git commit -m "Sincronizar main conservando pages/$branch y carpeta git"
    git push origin $branch --force-with-lease
    Write-Host "✔ $branch actualizada"
} else {
    Write-Host "⏭ $branch no tiene cambios"
}

git checkout main
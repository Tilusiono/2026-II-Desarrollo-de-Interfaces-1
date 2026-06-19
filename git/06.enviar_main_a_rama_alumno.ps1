git checkout main
git pull origin main

$branch = "bernabe-inche"
$allowedPath = "pages/$branch"

Write-Host ""
Write-Host "Sincronizando main hacia: $branch"

git checkout $branch
git pull origin $branch

# Guardar pages/$branch del alumno
$tempPages = ".tmp_pages_$branch"

if (Test-Path $tempPages) {
    Remove-Item $tempPages -Recurse -Force
}

if (Test-Path $allowedPath) {
    Copy-Item $allowedPath $tempPages -Recurse -Force
}

# Traer todo desde main
git checkout main -- .

# No traer carpeta git desde main
if (Test-Path "git") {
    Remove-Item "git" -Recurse -Force
    git restore --source=HEAD --worktree --staged git 2>$null
}

# No traer pages de otros alumnos
if (Test-Path "pages") {
    Remove-Item "pages" -Recurse -Force
}

# Restaurar solo pages/$branch del alumno
if (Test-Path $tempPages) {
    New-Item -ItemType Directory -Force -Path "pages" | Out-Null
    Copy-Item $tempPages $allowedPath -Recurse -Force
    Remove-Item $tempPages -Recurse -Force
}

git add -A

$changes = git status --porcelain

if ($changes) {
    git commit -m "Sincronizar main conservando solo $allowedPath"
    git push origin $branch
    Write-Host "✔ Rama $branch actualizada desde main"
}
else {
    Write-Host "⏭ No hay cambios para sincronizar"
}

git checkout main
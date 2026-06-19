git checkout main
git pull origin main

$branch = "bernabe-inche"
$allowedPath = "pages/$branch"

Write-Host ""
Write-Host "Sincronizando main hacia: $branch"

git checkout $branch
git pull origin $branch

# Traer todo desde main
git checkout main -- .

# Eliminar carpeta git si vino desde main
if (Test-Path "git") {
    Remove-Item "git" -Recurse -Force
}

# Eliminar todas las carpetas pages
if (Test-Path "pages") {
    Remove-Item "pages" -Recurse -Force
}

# Traer SOLO pages/$branch desde main
git checkout main -- $allowedPath

git add -A

$changes = git status --porcelain

if ($changes) {
    git commit -m "Sincronizar main hacia $branch incluyendo solo $allowedPath"
    git push origin $branch
    Write-Host "✔ Rama $branch actualizada desde main"
}
else {
    Write-Host "⏭ No hay cambios para sincronizar"
}

git checkout main
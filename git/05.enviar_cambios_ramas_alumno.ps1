git checkout main
git pull origin main

$branch = "bernabe-inche"

Write-Host ""
Write-Host "Procesando rama: $branch"

git checkout $branch
git pull origin $branch

$tempPath = ".tmp_pages_$branch"

if (Test-Path $tempPath) {
    Remove-Item $tempPath -Recurse -Force
}

if (Test-Path "pages/$branch") {
    Copy-Item "pages/$branch" $tempPath -Recurse -Force
}

git reset --hard main

if (Test-Path "pages") {
    Remove-Item "pages" -Recurse -Force
}

if (Test-Path $tempPath) {
    New-Item -ItemType Directory -Force -Path "pages" | Out-Null
    Copy-Item $tempPath "pages/$branch" -Recurse -Force
    Remove-Item $tempPath -Recurse -Force
}

git add -A

$changes = git status --porcelain

if ($changes) {
    git commit -m "Sincronizar main conservando solo pages/$branch"
    git push origin $branch --force-with-lease
    Write-Host "✔ $branch actualizada"
} else {
    Write-Host "⏭ $branch no tiene cambios"
}

git checkout main
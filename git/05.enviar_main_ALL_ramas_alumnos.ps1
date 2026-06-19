git checkout main
git pull origin main

$branches = git branch --format="%(refname:short)" | Where-Object { $_ -ne "main" }

foreach ($branch in $branches) {

    Write-Host ""
    Write-Host "Procesando rama: $branch"

    git checkout $branch
    git pull origin $branch

    $tempPath = ".tmp_pages_$branch"

    if (Test-Path $tempPath) {
        Remove-Item $tempPath -Recurse -Force
    }

    # 1. Guardar SOLO la carpeta del alumno
    if (Test-Path "pages/$branch") {
        Copy-Item "pages/$branch" $tempPath -Recurse -Force
    }

    # 2. Reemplazar toda la rama con main
    git reset --hard main

    # 3. Eliminar pages completa para no traer carpetas de otros alumnos
    if (Test-Path "pages") {
        Remove-Item "pages" -Recurse -Force
    }

    # 4. Restaurar SOLO pages/$branch
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
}

git checkout main


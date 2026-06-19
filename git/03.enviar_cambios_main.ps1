
git checkout main
git pull origin main

git branch --format="%(refname:short)" |
Where-Object { $_ -ne "main" } |
ForEach-Object {

    $branch = $_
    $allowedPath = "pages/$branch/"

    $commits = git rev-list --count main..$branch

    if ([int]$commits -eq 0) {
        Write-Host "⏭ $branch no tiene commits nuevos. Se omite."
        return
    }

    $changedFiles = git diff --name-only main...$branch

    $invalidFiles = $changedFiles | Where-Object {
        $_ -notlike "$allowedPath*"
    }

    if ($invalidFiles.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠ La rama '$branch' modifica archivos fuera de su carpeta permitida:"
        $invalidFiles | ForEach-Object {
            Write-Host "   - $_"
        }
        Write-Host "❌ Merge omitido para '$branch'."
        Write-Host ""
        return
    }

    Write-Host ""
    Write-Host "✅ La rama '$branch' solo modifica archivos dentro de $allowedPath"
    $respuesta = Read-Host "¿Deseas hacer merge de '$branch' en main? (s/n)"

    if ($respuesta.ToLower() -eq "s") {

        git merge -X theirs --no-edit $branch

        if ($LASTEXITCODE -eq 0) {
            git push origin main
            Write-Host "✔ Merge de $branch completado."
        }
        else {
            Write-Host "❌ Error en merge de $branch. Abortando..."
            git merge --abort
        }
    }
}

git checkout main
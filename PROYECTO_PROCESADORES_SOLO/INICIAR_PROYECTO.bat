@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Servidor local

echo ================================================
echo          Servidor local

echo ================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js no esta instalado.
  echo Instala Node.js 22.13 o superior y vuelve a intentarlo.
  pause
  exit /b 1
)

if not exist "node_modules\express" (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

if not exist "src\data\sqlite\procesadores.sqlite" (
  echo Creando datos iniciales...
  call npm run seed
)

echo.
echo Interfaz: http://localhost:4214/procesadores
echo API:      http://localhost:4214/api
echo Clave local de escritura: API_KEY
echo.
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:4214/procesadores"
node app.js
pause

@echo off
cd /d "%~dp0"

if not exist node_modules (
  call npm install
)

start "Servidor Tarjetas Gráficas Express" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul
start "" http://localhost:4214/tarjetas-graficas

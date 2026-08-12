@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Se eliminara la base SQLite local y se volveran a cargar los datos iniciales.
set /p confirmar=Escribe SI para continuar: 
if /I not "%confirmar%"=="SI" exit /b 0

if exist "src\data\sqlite\procesadores.sqlite" del /q "src\data\sqlite\procesadores.sqlite"
if exist "src\data\sqlite\procesadores.sqlite-shm" del /q "src\data\sqlite\procesadores.sqlite-shm"
if exist "src\data\sqlite\procesadores.sqlite-wal" del /q "src\data\sqlite\procesadores.sqlite-wal"
call npm run seed

echo Base de datos reiniciada correctamente.
pause

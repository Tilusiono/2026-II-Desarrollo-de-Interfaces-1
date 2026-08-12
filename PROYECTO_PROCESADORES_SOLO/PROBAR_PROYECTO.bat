@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Ejecutar pruebas
if not exist "node_modules\express" call npm install
call npm run test:coverage
pause

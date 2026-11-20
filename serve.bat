@echo off
title HRA // FullStack Developer Portfolio Server
where node >nul 2>nul
if %errorlevel% equ 0 (
  node "%~dp0serve.js"
) else (
  powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
)
pause

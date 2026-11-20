@echo off
title Launch Portfolio on NVIDIA GeForce RTX
echo ============================================================
echo   PELUNCUR PORTOFOLIO DENGAN GPU DISKRIT NVIDIA GEFORCE RTX
echo ============================================================
echo.

:: 1. Periksa apakah server lokal port 3000 sudah berjalan
netstat -ano | findstr /R ":3000.*LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
  echo [*] Server belum aktif. Memulai server lokal port 3000...
  where node >nul 2>&1
  if %errorlevel% equ 0 (
    start "HRA Portfolio Server" cmd /k "node \"%~dp0serve.js\""
  ) else (
    start "HRA Portfolio Server" powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
  )
  echo [*] Menunggu server siap...
  timeout /t 2 /nobreak >nul
) else (
  echo [OK] Server lokal port 3000 sudah aktif.
)

echo.
echo [*] Meluncurkan peramban dengan parameter akselerasi GPU RTX...

set "FLAGS=--force-high-performance-gpu --gpu-preference=2 --enable-gpu-rasterization --ignore-gpu-blocklist"
set "PORTAL_URL=http://localhost:3000"

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Google Chrome terdeteksi. Membuka dengan GPU RTX...
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Google Chrome (x86) terdeteksi. Membuka dengan GPU RTX...
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Google Chrome (Local) terdeteksi. Membuka dengan GPU RTX...
  start "" "%LocalAppData%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  echo [OK] Microsoft Edge terdeteksi. Membuka dengan GPU RTX...
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  echo [OK] Microsoft Edge (x64) terdeteksi. Membuka dengan GPU RTX...
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" (
  echo [OK] Brave Browser terdeteksi. Membuka dengan GPU RTX...
  start "" "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

echo [INFO] Membuka URL di peramban default...
start "" "%PORTAL_URL%"

:end
echo.
echo ============================================================
echo [SUKSES] Portofolio berjalan di: %PORTAL_URL%
echo ============================================================

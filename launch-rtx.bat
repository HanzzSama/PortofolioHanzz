@echo off
title Launch Portfolio on NVIDIA GeForce RTX
echo ============================================================
echo   PELUNCUR PORTOFOLIO DENGAN GPU DISKRIT NVIDIA GEFORCE RTX
echo ============================================================
echo.

set "FLAGS=--force-high-performance-gpu --gpu-preference=2 --enable-gpu-rasterization --ignore-gpu-blocklist"
set "PORTAL_URL=http://localhost:3000"

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Menjalankan Google Chrome dengan akselerasi GPU RTX...
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Menjalankan Google Chrome (x86) dengan akselerasi GPU RTX...
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
  echo [OK] Menjalankan Google Chrome (Local) dengan akselerasi GPU RTX...
  start "" "%LocalAppData%\Google\Chrome\Application\chrome.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  echo [OK] Menjalankan Microsoft Edge dengan akselerasi GPU RTX...
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  echo [OK] Menjalankan Microsoft Edge dengan akselerasi GPU RTX...
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

if exist "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" (
  echo [OK] Menjalankan Brave Browser dengan akselerasi GPU RTX...
  start "" "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" %FLAGS% "%PORTAL_URL%"
  goto end
)

start "" "%PORTAL_URL%"

:end
echo Peramban telah diluncurkan pada mode GPU performa tinggi.


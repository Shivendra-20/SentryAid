# One-time laptop setup (Windows)
$ErrorActionPreference = "Stop"

if (-not (Test-Path "backend\.env")) {
  Copy-Item "backend\.env.example" "backend\.env"
  Write-Host "Created backend\.env"
}

if (-not (Test-Path "frontend\.env")) {
  Copy-Item "frontend\.env.example" "frontend\.env"
  Write-Host "Created frontend\.env"
}

npm install
npm run install:all

Write-Host ""
Write-Host "Setup done. Start with:  npm run dev" -ForegroundColor Green
Write-Host "Open: http://localhost:5173/" -ForegroundColor Green
Write-Host "Need MongoDB running on your laptop (localhost:27017)" -ForegroundColor Yellow

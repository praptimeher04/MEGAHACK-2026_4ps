Write-Host "========================================" -ForegroundColor Green
Write-Host "  STARTING BACKEND SERVER" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Port: 8090" -ForegroundColor Yellow
Write-Host "Database: hackathonproject db" -ForegroundColor Yellow
Write-Host ""
Write-Host "KEEP THIS WINDOW OPEN!" -ForegroundColor Red
Write-Host ""

Set-Location -Path "$PSScriptRoot\backend"

& .\mvnw.cmd spring-boot:run

Write-Host ""
Write-Host "Server stopped. Press any key to exit..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

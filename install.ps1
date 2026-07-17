# TopoGun 3 Chinese Localization - Installer
# Safe: backup first, then MERGE copy (preserves your license.json and other personal files).
# Run: right-click -> "Run with PowerShell", or: powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = "Stop"

$src = Join-Path $PSScriptRoot "TopoGun3"
$dst = Join-Path $env:APPDATA "TopoGun3"

if (-not (Test-Path $src)) {
    Write-Error "Source folder 'TopoGun3' not found next to this script. Please keep install.ps1 inside the repo folder."
    exit 1
}

# Ensure target exists
if (-not (Test-Path $dst)) {
    Write-Host "Target folder does not exist, creating: $dst"
    New-Item -ItemType Directory -Path $dst | Out-Null
}

# Backup existing config
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$bak = Join-Path $env:APPDATA ("TopoGun3_backup_" + $stamp)
Write-Host "Backing up existing config to: $bak"
Copy-Item -Path $dst -Destination $bak -Recurse

# Merge copy: copy each item from source into target (overwrites UI files, keeps files not present in source)
Write-Host "Merging Chinese UI files into: $dst"
Get-ChildItem -Path $src | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dst -Recurse -Force
}

Write-Host ""
Write-Host "Done. Fully quit and restart TopoGun 3 to see the Chinese interface."
Write-Host "To revert: delete '$dst' and rename '$bak' back to TopoGun3."

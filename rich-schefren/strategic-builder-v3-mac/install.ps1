# Strategic Builder Methodology v3 - Installer for Windows (PowerShell)
# Complete project lifecycle methodology with full source documentation,
# delivery operations phases, Three Questions Protocol, and all templates.

$SkillName = "strategic-builder"
$SkillDir = "$env:USERPROFILE\.claude\skills\$SkillName"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=================================="
Write-Host "Strategic Builder Methodology v3"
Write-Host "Installer"
Write-Host "=================================="
Write-Host ""

# Check if Claude Code skills directory exists
if (-not (Test-Path "$env:USERPROFILE\.claude\skills")) {
    Write-Host "Creating skills directory..."
    New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills" | Out-Null
}

# Check if skill already exists
if (Test-Path $SkillDir) {
    Write-Host ""
    Write-Host "Warning: $SkillDir already exists"
    $overwrite = Read-Host "Overwrite? (y/N)"
    if ($overwrite -notmatch "^[Yy]$") {
        Write-Host "Installation cancelled"
        exit 1
    }
    Remove-Item -Recurse -Force $SkillDir
}

# Create skill directory
Write-Host "Creating skill directory..."
New-Item -ItemType Directory -Force -Path "$SkillDir\references" | Out-Null

# Copy skill files
Write-Host "Copying skill files..."
Copy-Item "$ScriptDir\SKILL.md" "$SkillDir\"
Copy-Item "$ScriptDir\references\*.md" "$SkillDir\references\"

Write-Host ""
Write-Host "=================================="
Write-Host "Installation Complete!"
Write-Host "=================================="
Write-Host ""
Write-Host "Skill installed to: $SkillDir"
Write-Host ""
Write-Host "Files installed:"
Write-Host "  SKILL.md                                  - Core methodology (agents follow this)"
Write-Host "  references/prd-template.md                - PRD template (8 required sections)"
Write-Host "  references/tdd-template.md                - Technical Design Document template"
Write-Host "  references/architecture-template.md       - Architecture Map template"
Write-Host "  references/capability-map-template.md     - Capability Map template"
Write-Host "  references/three-questions-protocol.md    - Q1/Q2/Q3 framework with examples"
Write-Host "  references/delivery-gap-and-prevention.md - Client-facing delivery failure patterns"
Write-Host "  references/operations-protocol-missing-layer.md - 7 protocol distinctions"
Write-Host "  references/skill-architecture-patterns.md - 10-layer skill quality model"
Write-Host "  references/agentic-operations-principles.md"
Write-Host "  references/runbooks.md"
Write-Host "  references/technical-design-documents.md"
Write-Host "  references/strategic-builder-source.md    - Full source methodology (50K)"
Write-Host ""
Write-Host "WHAT'S NEW IN V3:"
Write-Host "  - Client-Facing Projects: Delivery Operations + End-to-End Testing phases"
Write-Host "  - Ready to Ship checklist (mandatory before marking client projects complete)"
Write-Host "  - Architecture template with Delivery Architecture section"
Write-Host "  - Capability Map template with Delivery & Support Capabilities section"
Write-Host "  - Three Questions Protocol (Q1: system? Q2: what must it do? Q3: how exactly?)"
Write-Host "  - Full reference library: source docs, patterns, lessons from real failures"
Write-Host ""
Write-Host "HOW IT WORKS:"
Write-Host "  When you start a new project in Claude Code, say:"
Write-Host "    'New project: [describe what you want to build]'"
Write-Host ""
Write-Host "  The methodology covers the COMPLETE lifecycle:"
Write-Host "    Setup > Build > Test > Audit > Optimize > Finish > Deploy > Archive"
Write-Host ""
Write-Host "  For client-facing projects, two additional phases are enforced:"
Write-Host "    Delivery Operations > End-to-End Test > Ready to Ship"
Write-Host ""
Write-Host "=================================="

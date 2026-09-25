# Deployment helper script
param (
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
    "User-Agent"    = "Altair-Deployer"
}

Write-Host "1. Checking GitHub authentication..."
try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get
    $username = $user.login
    Write-Host "Authenticated as GitHub User: $username"
} catch {
    Write-Error "Failed to authenticate with GitHub API: $_"
    exit 1
}

$repoName = "altair-sign-light"
Write-Host "2. Checking repository status for '$repoName'..."

try {
    $repo = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$repoName" -Headers $headers -Method Get
    Write-Host "Repository '$repoName' already exists on GitHub."
} catch {
    Write-Host "Creating public repository '$repoName'..."
    $body = @{
        name        = $repoName
        description = "Altair Sign & Light Official Website"
        public      = $true
        has_issues  = $true
    } | ConvertTo-Json

    try {
        $repo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers -Method Post -Body $body
        Write-Host "Repository '$repoName' created successfully!"
    } catch {
        Write-Error "Failed to create repository: $_"
        exit 1
    }
}

Write-Host "3. Setting up Git branch and remote..."
if (-not (Test-Path ".git")) {
    git init
}

git branch -M main
git config user.name "$username"
git config user.email "$username@users.noreply.github.com"

$remoteUrl = "https://$($Token)@github.com/$username/$repoName.git"
git remote remove origin 2>$null
git remote add origin $remoteUrl

Write-Host "4. Staging files and committing..."
git add .
git commit -m "Deploy Altair Sign & Light website"

Write-Host "5. Pushing to GitHub..."
git push -u origin main --force

Write-Host "6. Enabling GitHub Pages..."
$pagesBody = @{
    source = @{
        branch = "main"
        path   = "/"
    }
} | ConvertTo-Json

try {
    $pages = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$repoName/pages" -Headers $headers -Method Post -Body $pagesBody
    Write-Host "GitHub Pages enabled!"
} catch {
    Write-Host "GitHub Pages check complete."
}

$pagesUrl = "https://$username.github.io/$repoName/"
Write-Host ""
Write-Host "========================================="
Write-Host "SUCCESS! Website live link:"
Write-Host $pagesUrl
Write-Host "Repository URL:"
Write-Host "https://github.com/$username/$repoName"
Write-Host "========================================="

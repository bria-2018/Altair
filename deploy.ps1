# Automated deployment script for GitHub Pages
param (
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [string]$RepoName = "Altair"
)

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
    "User-Agent"    = "Altair-Deployer"
}

Write-Host "1. Authenticating with GitHub..."
try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get
    $username = $user.login
    Write-Host "SUCCESS: Authenticated as GitHub user '$username'"
} catch {
    Write-Error "Authentication failed. Please check your token: $_"
    exit 1
}

Write-Host "2. Checking repository status for '$username/$RepoName'..."
try {
    $repo = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName" -Headers $headers -Method Get
    Write-Host "Repository '$username/$RepoName' already exists on GitHub."
} catch {
    Write-Host "Repository does not exist yet. Creating public repository '$RepoName'..."
    $body = @{
        name        = $RepoName
        description = "Altair Sign & Light Official Commercial Signage Website"
        public      = $true
        has_issues  = $true
    } | ConvertTo-Json

    try {
        $repo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers -Method Post -Body $body
        Write-Host "Repository '$RepoName' created successfully!"
    } catch {
        Write-Error "Failed to create repository '$RepoName': $_"
        exit 1
    }
}

Write-Host "3. Configuring local Git repository..."
if (-not (Test-Path ".git")) {
    git init
}

git branch -M main
git config user.name "$username"
git config user.email "$username@users.noreply.github.com"

$remoteUrl = "https://$($Token)@github.com/$username/$RepoName.git"
git remote remove origin 2>$null
git remote add origin $remoteUrl

Write-Host "4. Staging files and committing..."
git add .
git commit -m "Deploy Altair Sign & Light website"

Write-Host "5. Pushing files to GitHub repository ($username/$RepoName)..."
git push -u origin main --force

Write-Host "6. Enabling GitHub Pages..."
$pagesBody = @{
    source = @{
        branch = "main"
        path   = "/"
    }
} | ConvertTo-Json

try {
    $pages = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName/pages" -Headers $headers -Method Post -Body $pagesBody
    Write-Host "GitHub Pages enabled successfully!"
} catch {
    Write-Host "GitHub Pages build initiated."
}

$pagesUrl = "https://$username.github.io/$RepoName/"
Write-Host ""
Write-Host "=================================================================="
Write-Host "🎉 SUCCESS! Your website is live and ready for public review:"
Write-Host $pagesUrl
Write-Host ""
Write-Host "Repository Link:"
Write-Host "https://github.com/$username/$RepoName"
Write-Host "=================================================================="

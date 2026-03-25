$pdfPath = "C:\Users\rajiv\Documents\EduManagerPro\App\EduManagerPro_PRD_FINAL.pdf"
$outPath = "C:\Users\rajiv\Documents\EduManagerPro\App\prd_extracted.txt"

# Read raw bytes and decode as ASCII to find readable strings
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
Write-Host "Read $($bytes.Length) bytes"

# Extract printable ASCII strings (like 'strings' command)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# PDF text is often in parentheses in streams - try to extract that
$lines = @()
$i = 0
$current = ""
foreach ($b in $bytes) {
    $c = [char]$b
    if ($b -ge 32 -and $b -le 126) {
        $current += $c
    } else {
        if ($current.Length -gt 4) {
            $lines += $current
        }
        $current = ""
    }
}

$lines | Out-File -FilePath $outPath -Encoding UTF8
Write-Host "Extracted $($lines.Count) strings to $outPath"

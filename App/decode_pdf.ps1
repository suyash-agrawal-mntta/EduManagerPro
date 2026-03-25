Add-Type -AssemblyName System.IO.Compression

$pdfPath = "C:\Users\rajiv\Documents\EduManagerPro\App\EduManagerPro_PRD_FINAL.pdf"
$outPath = "C:\Users\rajiv\Documents\EduManagerPro\App\prd_text_decoded.txt"

$raw = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::Latin1.GetString($raw)

# Find all FlateDecode streams
$results = @()
$pattern = [regex]'(?s)<<[^>]*?FlateDecode[^>]*?>>\s*stream\r?\n(.*?)\r?\nendstream'
$matches_ = $pattern.Matches($text)

Write-Host "Found $($matches_.Count) FlateDecode streams"

foreach ($m in $matches_) {
    $streamContent = $m.Groups[1].Value
    $bytes = [System.Text.Encoding]::Latin1.GetBytes($streamContent)
    
    try {
        # zlib streams start with 0x78 byte; strip zlib header (first 2 bytes)
        if ($bytes.Length -gt 2 -and $bytes[0] -eq 0x78) {
            $deflateBytes = $bytes[2..($bytes.Length - 1)]
        } else {
            $deflateBytes = $bytes
        }
        
        $memIn = New-Object System.IO.MemoryStream(,$deflateBytes)
        $memOut = New-Object System.IO.MemoryStream
        $deflate = New-Object System.IO.Compression.DeflateStream($memIn, [System.IO.Compression.CompressionMode]::Decompress)
        $deflate.CopyTo($memOut)
        $deflate.Close()
        
        $decompressed = [System.Text.Encoding]::Latin1.GetString($memOut.ToArray())
        
        # Extract text from PDF operators: text in parentheses after Tj/TJ operators
        $textParts = @()
        
        # Extract parenthetical strings
        $paren = [regex]'\(([^)\\]*(?:\\.[^)\\]*)*)\)'
        $pMatches = $paren.Matches($decompressed)
        foreach ($pm in $pMatches) {
            $t = $pm.Groups[1].Value
            $t = $t -replace '\\n',"`n" -replace '\\r',"`r" -replace '\\t',"`t"
            $t = $t -replace '\\\(','(' -replace '\\\)',')'
            $t = $t -replace '\\\\','\'
            if ($t.Trim().Length -gt 1) {
                $textParts += $t
            }
        }
        
        if ($textParts.Count -gt 0) {
            $results += ($textParts -join ' ')
        }
    } catch {
        # skip non-decompressible streams
    }
}

$fullText = $results -join "`n"
[System.IO.File]::WriteAllText($outPath, $fullText, [System.Text.Encoding]::UTF8)
Write-Host "Total extracted chars: $($fullText.Length)"
Write-Host "--- FIRST 5000 CHARS ---"
Write-Host $fullText.Substring(0, [Math]::Min(5000, $fullText.Length))

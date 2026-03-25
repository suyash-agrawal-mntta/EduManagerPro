Add-Type -AssemblyName System.IO.Compression

$pdfPath = "C:\Users\rajiv\Documents\EduManagerPro\App\EduManagerPro_PRD_FINAL.pdf"
$outPath = "C:\Users\rajiv\Documents\EduManagerPro\App\prd_text_decoded.txt"

# Read as bytes
$allBytes = [System.IO.File]::ReadAllBytes($pdfPath)
Write-Host "File size: $($allBytes.Length) bytes"

# Convert to find stream markers
$streamMarker = [System.Text.Encoding]::ASCII.GetBytes("stream")
$endstreamMarker = [System.Text.Encoding]::ASCII.GetBytes("endstream")

# Find positions of "stream\r\n" or "stream\n"
function Find-Bytes {
    param($haystack, $needle, $start = 0)
    $positions = @()
    for ($i = $start; $i -le $haystack.Length - $needle.Length; $i++) {
        $found = $true
        for ($j = 0; $j -lt $needle.Length; $j++) {
            if ($haystack[$i + $j] -ne $needle[$j]) { $found = $false; break }
        }
        if ($found) { $positions += $i }
    }
    return $positions
}

$results = @()
$streamPositions = Find-Bytes $allBytes $streamMarker
Write-Host "Found $($streamPositions.Count) stream markers"

foreach ($pos in $streamPositions) {
    # Check the bytes before "stream" to see if it's FlateDecode
    # Look backward for the dictionary start
    $contextStart = [Math]::Max(0, $pos - 300)
    $contextBytes = $allBytes[$contextStart..($pos - 1)]
    $context = [System.Text.Encoding]::ASCII.GetString($contextBytes)
    
    if ($context -notmatch 'FlateDecode') { continue }
    
    # Find start of actual stream data (after stream + \r\n or \n)
    $dataStart = $pos + $streamMarker.Length
    if ($dataStart -lt $allBytes.Length -and $allBytes[$dataStart] -eq 0x0D) { $dataStart++ } # \r
    if ($dataStart -lt $allBytes.Length -and $allBytes[$dataStart] -eq 0x0A) { $dataStart++ } # \n
    
    # Find endstream
    $endPositions = Find-Bytes $allBytes $endstreamMarker $dataStart
    if ($endPositions.Count -eq 0) { continue }
    $dataEnd = $endPositions[0]
    
    # Trim trailing \r\n from stream data
    while ($dataEnd -gt $dataStart -and ($allBytes[$dataEnd - 1] -eq 0x0A -or $allBytes[$dataEnd - 1] -eq 0x0D)) {
        $dataEnd--
    }
    
    $streamData = $allBytes[$dataStart..($dataEnd - 1)]
    
    try {
        $memIn = New-Object System.IO.MemoryStream(,$streamData)
        $memOut = New-Object System.IO.MemoryStream
        $deflate = New-Object System.IO.Compression.DeflateStream($memIn, [System.IO.Compression.CompressionMode]::Decompress)
        $deflate.CopyTo($memOut)
        $deflate.Close()
        $decompressed = [System.Text.Encoding]::Latin1.GetString($memOut.ToArray())
        
        # Extract text in parentheses (PDF text content)
        $textParts = @()
        $i = 0
        while ($i -lt $decompressed.Length) {
            if ($decompressed[$i] -eq '(') {
                $start = $i + 1
                $depth = 1
                $i++
                while ($i -lt $decompressed.Length -and $depth -gt 0) {
                    if ($decompressed[$i] -eq '\' ) { $i++ } # skip escaped char
                    elseif ($decompressed[$i] -eq '(') { $depth++ }
                    elseif ($decompressed[$i] -eq ')') { $depth-- }
                    $i++
                }
                $fragment = $decompressed.Substring($start, $i - $start - 1)
                $fragment = $fragment -replace '\\n',' ' -replace '\\r',' '
                $fragment = $fragment -replace '\\\(','(' -replace '\\\)',')'
                if ($fragment.Trim().Length -gt 0) {
                    $textParts += $fragment
                }
            } else { $i++ }
        }
        
        if ($textParts.Count -gt 0) {
            $results += ($textParts -join '')
        }
    } catch {
        # Not a valid deflate stream, skip
    }
}

$fullText = $results -join "`n"
[System.IO.File]::WriteAllText($outPath, $fullText, [System.Text.Encoding]::UTF8)
Write-Host "Total extracted chars: $($fullText.Length)"
if ($fullText.Length -gt 0) {
    Write-Host "--- FIRST 5000 CHARS ---"
    Write-Host $fullText.Substring(0, [Math]::Min(5000, $fullText.Length))
}

import zlib, re, sys

pdfPath = r'C:\Users\rajiv\Documents\EduManagerPro\App\EduManagerPro_PRD_FINAL.pdf'
outPath = r'C:\Users\rajiv\Documents\EduManagerPro\App\prd_text.txt'

with open(pdfPath, 'rb') as f:
    data = f.read()

# Find all FlateDecode streams and decompress them
results = []
pattern = re.compile(rb'stream\r?\n(.*?)\r?\nendstream', re.DOTALL)
for m in pattern.finditer(data):
    chunk = m.group(1)
    try:
        decompressed = zlib.decompress(chunk)
        text = decompressed.decode('latin-1', errors='replace')
        # Extract text between parentheses (PDF text operators)
        texts = re.findall(r'\(([^)\\]*(?:\\.[^)\\]*)*)\)', text)
        clean_texts = []
        for t in texts:
            # Unescape common PDF escape sequences
            t = t.replace('\\(', '(').replace('\\)', ')').replace('\\\\', '\\')
            t = t.replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t')
            if len(t.strip()) > 1:
                clean_texts.append(t)
        if clean_texts:
            results.append(' '.join(clean_texts))
    except Exception:
        pass

full_text = '\n'.join(results)
with open(outPath, 'w', encoding='utf-8') as f:
    f.write(full_text)

print(f'Extracted {len(full_text)} chars of text')
print('--- FIRST 3000 CHARS ---')
print(full_text[:3000])

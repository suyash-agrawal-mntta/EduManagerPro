import subprocess, sys

# Try to install pdfminer
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pdfminer.six', '--quiet'])

from pdfminer.high_level import extract_text
text = extract_text('C:/Users/rajiv/Documents/EduManagerPro/App/EduManagerPro_PRD_FINAL.pdf')
with open('C:/Users/rajiv/Documents/EduManagerPro/App/prd_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print(f'Extraction complete. Characters: {len(text)}')
print('First 500 chars:')
print(text[:500])

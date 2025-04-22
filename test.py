x = []

with open('test.txt', 'r') as f:
    for line in f:
        x.append(line[line.rfind("/") + 1:line.rfind("-")])

print(x)
y = ['cze', 'hrv', 'bul', 'eng', 'dut', 'ger', 'dan', 'fre', 'heb', 'hun', 'ind', 'fin', 'hin', 'rus', 'nob', 'ita',
     'pol', 'may', 'slo', 'por', 'por', 'swe', 'thumbnails.vtt', 'tur', 'spa', 'spa', 'ukr']
orignial = ['ita', 'jpn', 'pol', 'por', 'ara', 'chi', 'cze', 'dan', 'dut', 'fin', 'fre', 'ger', 'gre', 'heb', 'hun',
            'ind', 'kor', 'nob', 'pol', 'rum', 'rus', 'tha', 'vie', 'swe', 'spa', 'tur', 'ces']
subtitle_codes = [
    "ara", "bul", "ces", "cze", "zho", "chi", "dan", "nld", "dut", "eng", "fin", "fra", "fre",
    "deu", "ger", "ell", "gre", "heb", "hin", "hrv", "hun", "ind", "ita", "jpn", "kor", "msa",
    "may", "nob", "pol", "por", "ron", "rum", "rus", "slk", "slo", "spa", "swe", "tha", "tur",
    "ukr", "vie"
]
OTHER_LANGS = ['ita', 'jpn', 'pol', 'por', 'ara', 'chi', 'cze', 'dan', 'dut', 'fin', 'fre', 'ger', 'gre', 'heb', 'hun',
               'ind', 'kor', 'nob', 'pol', 'rum', 'rus', 'tha', 'vie', 'swe', 'spa', 'tur', 'ces']

['ita', 'jpn', 'pol', 'por', 'ara', 'chi', 'cze', 'dan', 'dut', 'fin', 'fre', 'ger', 'gre', 'heb', 'hun', 'ind', 'kor',
 'nob', 'pol', 'rum', 'rus', 'tha', 'vie', 'swe', 'spa', 'tur', 'ces', 'bul', 'zho', 'nld', 'eng', 'fra', 'deu', 'ell',
 'hin', 'hrv', 'msa', 'may', 'ron', 'slk', 'slo', 'ukr', 'thumbnails.vtt']

for i in subtitle_codes:
    if i not in OTHER_LANGS:
        OTHER_LANGS.append(i)
for i in y:
    if i not in OTHER_LANGS:
        OTHER_LANGS.append(i)

print("\n\n\nOther Langs:")
print(OTHER_LANGS)
print(OTHER_LANGS == orignial)

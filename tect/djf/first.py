text = input()

calvi = "аеёиоуыэюя"
piko = "бвгджзйклмнпрстфхцчшщ"

text = text.lower()

calvii = 0
pikas = 0

for ch in text:
    if ch in calvi:
        calvii += 1
    elif ch in piko:
        pikas += 1

print(calvii, pikas)
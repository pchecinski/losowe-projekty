"""
Zadanie 3
Napisać skrypt, który przetworzy dane z pliku prezydent_2015_tura1.csv, zwracając dane zbiorcze
(sumy z kolejnych kolumn) dla poszczególnych województw i dla całego kraju – w formacie csv
lub tablicy json. Wyjście może być na ekran, lub do nowego pliku.
"""

import csv

csv_sum = []
for i in range(38):
    csv_sum.append(0)

wojewodztwa = {
    'dolnośląskie': [],
    'kujawsko-pomorskie': [],
    'lubelskie': [],
    'lubuskie': [],
    'łódzkie': [],
    'małopolskie': [],
    'mazowieckie': [],
    'opolskie': [],
    'podkarpackie': [],
    'podlaskie': [],
    'pomorskie': [],
    'śląskie': [],
    'świętokrzyskie': [],
    'warmińsko-mazurskie': [],
    'wielkopolskie': [],
    'zachodniopomorskie': []
}

for w in wojewodztwa:
    for i in range(38):
        wojewodztwa[w].append(0)

skip = 0
with open('prezydent_2015_tura1.csv', 'r') as csvfile:
     csv_reader = csv.reader(csvfile, delimiter=';')
     for row in csv_reader:
        
        # pominięcie pierwszego wiersza (nagłówek)
        if skip == 0:
            skip = 1
            continue;


        # aktualne wojewodztwo
        w = row[0]
        
        # pętla po wszystkich polach
        i = 0
        for field in row:
            i += 1

            # pominięcie niesumowalnych pól
            if i <= 6:
                continue

            csv_sum[i] += int(field)
            wojewodztwa[w][i] += int(field)
 
with open('output.csv', 'w') as csvfile:
    for key, value in wojewodztwa.items():
        value[0] = key
        csvfile.write(';'.join(str(tmp) for tmp in value))
        csvfile.write('\n')
    csvfile.write(';'.join(str(tmp) for tmp in csv_sum))
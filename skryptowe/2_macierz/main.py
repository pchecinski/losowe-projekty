"""
Zadanie 2
Zaimplementować macierze, z obsługą:
-dodawania macierzy,
-mnożenia macierzy,
-liczenia wyznacznika macierzy (dowolną metodą).
"""

from random import randint

class Matrix:
    def __init__(self, n, m):
        self.n = n
        self.m = m
        self.data = []
        for i in range(n):
            self.data.append([])
            for j in range(m):
                self.data[i].append(0)

    def randomData(self):
        for i in range(self.n):
            for j in range(self.m):
                self.data[i][j] = randint(0, 10)

    def print(self):
        print(self.data)

    @staticmethod
    def add(m1, m2):
        if (m1.n != m2.n or m1.m != m2.m):
            print('[error] rozmiar macierzy się nie zgadza!')
            return None

        newM = Matrix(m1.n, m1.m)
        for i in range(newM.n):
            for j in range(newM.m):
                newM.data[i][j] = m1.data[i][j] + m2.data[i][j]
        
        return newM

    @staticmethod
    def mult(m1, m2):
        if(m1.m != m2.n):
            print('[error] rozmiar macierzy się nie zgadza!')
            return None

        newM = Matrix(m1.n, m2.m)
        for i in range(m1.n):
            for j in range(m2.m):
                for k in range(m2.n):
                    newM.data[i][j] += m1.data[i][k] * m2.data[k][j]
        
        return newM

def getMatrixMinor(m,i,j):
    return [row[:j] + row[j+1:] for row in (m[:i]+m[i+1:])]

def getMatrixDeternminant(m):
    if len(m) == 2:
        return m[0][0]*m[1][1]-m[0][1]*m[1][0]

    determinant = 0
    for c in range(len(m)):
        determinant += ((-1)**c)*m[0][c]*getMatrixDeternminant(getMatrixMinor(m,0,c))
    return determinant


# --- test dodawania

m1 = Matrix(2, 3)
m1.randomData()
m1.print()

m2 = Matrix(2, 3)
m2.randomData()
m2.print()

m3 = Matrix.add(m1, m2)
if m3:
    m3.print()

# --- test mnożenia

m1 = Matrix(2, 3)
m1.randomData()
m1.print()

m2 = Matrix(3, 2)
m2.randomData()
m2.print()

m4 = Matrix.mult(m1, m2)
if m4:
    m4.print()

# --- test wyznacznika 

m1 = Matrix(3, 3)
m1.randomData()
print ('m1.det:', getMatrixDeternminant(m1.data))


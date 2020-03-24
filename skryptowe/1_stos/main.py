"""
Zadanie 1
Zaimplementować stos bez użycia typu listy. Klasa stosu powinna obsługiwać:
-dodanie elementu do stosu,
-zwrócenie zawartości wierzchu stosu,
-usunięcie wierzchu stosu i zwrócenie jego zawartości – błąd, jeśli stos jest pusty,
-zwrócenie (poprawnej!) wysokości stosu.
"""

class Node: 
    def __init__(self, data): 
        self.data = data  
        self.next = None

class Stack:
    def __init__(self): 
        self.root = None
        self.length = 0

    def push(self, data):
        self.length += 1
        newNode = Node(data) 
        newNode.next = self.root  
        self.root = newNode 

    def peek(self): 
        if (self.root == None):  
            return None

        return self.root.data

    def pop(self): 
        if (self.root == None): 
            return None

        self.length -= 1
        tmp = self.root  
        self.root = self.root.next
        return tmp.data

if __name__ == "__main__":
    s = Stack()
    print('Długość stosu: ' + str(s.length))

    s.push(745)
    s.push(2.554)
    s.push(chr(0x43))
    s.push('koperek')
    s.push(123)

    print('Długość stosu: ' + str(s.length))
    print('Podgląd ostatniego elementu: ' + str(s.peek()))

    print('Lista elementów stosu: ')
    tmp = s.pop()
    while tmp != None:
        print(tmp)
        tmp = s.pop()
from p5 import *
from random import randint
import numpy

cols = 0
rows = 0
resolution = 10
	
def countNeighbors(x, y):
	global grid
	sum = 0
	for i in range(-1, 2):
		for j in range(-1, 2):
			col = (x + i + cols) % cols
			row = (y + j + rows) % rows
			sum += grid[col][row]
	sum -= grid[x][y]
	return sum

def setup():
	global grid, cols, rows
	
	size(600, 400)
	cols = int(width / resolution)
	rows = int(height / resolution)
	
	grid = numpy.zeros((cols, rows))
	
	for i in range(cols):
		for j in range(rows):
			grid[i][j] = randint(0, 1)
	
			
def draw():
	global grid
	
	background(0)
	fill(255)
	stroke(0)
	
	next = numpy.zeros((cols, rows))
	
	for i in range(cols):
		for j in range(rows):
			x = i * resolution
			y = j * resolution
			
			if grid[i][j]:
				square((x, y), resolution -1)
				
	# Compute next based on grid
	for i in range(cols):
		for j in range(rows):
			state = grid[i][j]
			neighbors = countNeighbors(i, j)
			
			if state == 0 and neighbors == 3:
				next[i][j] = 1
			elif (state == 1 and (neighbors < 2 or neighbors > 3)):
				next[i][j] = 0
			else:
				next[i][j] = state

	grid = next
				
				
if __name__ == "__main__":
	run(frame_rate=160)
echo "CPU"
cat /proc/loadavg 
echo "Memory"
free -m 
echo "Top CPU"
ps aux | sort -nrk 3,3 | head -n 9 
echo "Top memory"
ps aux | sort -nrk 4,4 | head -n 9 

# Inne sposoby na wyświetlenie statystyk CPU 
# ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head -n 5
# ps -eo pid,comm,%cpu,%mem --sort=-%mem | head -n 5
# zgodnie z zadaniem skypt powinien być wywoływany w CRONie co minutę
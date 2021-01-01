#!/usr/bin/env python

import os
import time
import socket
from colorama import Fore, Back, Style

def logToFile(client, data=''):
	separator = '='*50
	fopen = open('./log.txt', 'a')
	fopen.write('Time: %s\nIP: %s\nPort: %d\nData: %s\n%s\n\n'%(time.ctime(), client[0], client[1], data, separator))
	fopen.close()
        
if __name__=='__main__':
	try:
		os.system("clear")
		print (Fore.CYAN  +"\n\t\t\t\tpress ctrl+c for exit :)\n\n")
		print(Style.RESET_ALL) 
		trapdata = input(Fore.BLUE + 'Data for Trap : ' + Fore.WHITE)
		print('\n')
		host = input(Fore.BLUE + 'IP Address for where you wants to add honeypot : '+ Fore.WHITE)
		print('\n')
		while True:
			try:
				port = int(input(Fore.BLUE + 'Port Address for where you wants to add honeypot : '+ Fore.WHITE ))
				print('\n')
			except TypeError:
				print (Fore.RED  +"Error: Invalid port number.")
				print(Style.RESET_ALL) 
				continue
			else:
				if (port < 1) or (port > 65535):
					print (Fore.RED  +"Invalid Port : Enter Port Between 1-65535.")
					print(Style.RESET_ALL) 
					continue
				else:
					os.system("clear")
					print (Fore.BLUE +" ============================ Honeypot Starting =============================== ")
					print(Style.RESET_ALL) 
					s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
					s.bind((host, port))
					s.listen(100)
					while True:
						insock, address = s.accept()
						print (Fore.WHITE +"request comming from : %s:%d" % (address[0], address[1]))
						print(Style.RESET_ALL) 
						try:
							insock.send(trapdata.encode('ascii'))
							data = insock.recv(1024)
							data = data.decode('ascii')
							insock.close()
						except socket.error as e:
							logToFile(address)
						else:
							logToFile(address, data)
						
	except KeyboardInterrupt:
		print (Fore.YELLOW  +"\nHave a nice day!")
		print(Style.RESET_ALL) 
		exit(0)
	except BaseException as e:
		print (Fore.RED  +"\nError: %s" % (e))
		print(Style.RESET_ALL) 
		exit(1)

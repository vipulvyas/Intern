import PyPDF2 
import os
try :
	try:
		os.system("gs -sDEVICE=pdfwrite -dDEVICEWIDTHPOINTS=612 -dDEVICEHEIGHTPOINTS=1008 -dFIXEDMEDIA -dPDFFitPage -dCompatibilityLevel=1.4 -o 1_Legal.pdf 1.pdf")
	except:
		print("gostscript not installed ")
	pdf1File = open('1_Legal.pdf', 'rb')
	pdf2File = open('2.pdf', 'rb')
	 
	# Read the files that you have opened
	pdf1Reader = PyPDF2.PdfFileReader(pdf1File)
	pdf2Reader = PyPDF2.PdfFileReader(pdf2File)
	 
	# Create a new PdfFileWriter object which represents a blank PDF document
	pdfWriter = PyPDF2.PdfFileWriter()
	 
	# Loop through all the pagenumbers for the first document
	for pageNum in range(pdf1Reader.numPages):
	    pageObj = pdf1Reader.getPage(pageNum)
	    pdfWriter.addPage(pageObj)
	 
	# Loop through all the pagenumbers for the second document
	for pageNum in range(pdf2Reader.numPages):
	    pageObj = pdf2Reader.getPage(pageNum)
	    pdfWriter.addPage(pageObj)
	 
	# Now that you have copied all the pages in both the documents, write them into the a new document
	pdfOutputFile = open('final.pdf', 'wb')
	pdfWriter.write(pdfOutputFile)
finally:
	# Close all the files - Created as well as opened
	pdfOutputFile.close()
	pdf1File.close()
	pdf2File.close()


# gs -sDEVICE=pdfwrite -dDEVICEWIDTHPOINTS=612 -dDEVICEHEIGHTPOINTS=1008 -dFIXEDMEDIA -dPDFFitPage -dCompatibilityLevel=1.4 -o n.pdf 1.pdf  

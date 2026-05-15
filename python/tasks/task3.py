## 

def writeToStudentFile(data):
    with open('students.txt' , 'w') as studentFile :
        studentFile.write(str(data))

def readFromStudentFile():
    with open('students.txt' , 'r') as studentFile:
        return eval(studentFile.read())
    


##


def writeToSubjectsFile(data):
    with open('Subjects.txt' , 'w') as SubjectsFile :
        SubjectsFile.write(str(data))
        

def readFromSubjectsFile():
    with open('Subjects.txt' , 'r') as SubjectsFile:
        return eval(SubjectsFile.read())
    

##

### data sample 
## [ {id : {student's data}} ,
#   {id : {student's data}} ,  ]

def getStudentsNames(*args):
    data = readFromStudentFile()
    names = []
    for student in data :
        for id , info in student.items():
            if(args):
                if(args[0] == id):
                    return info['name']
            else:
                names.append(info['name'])
    if(args):
        return ''
    return names

### data sample
## [ {stndt id : { python : grade , css : grade }} , 
##   ]

def getAllGradesForSubject(subject):
    data = readFromSubjectsFile()
    grades = []
    for row in data:
        for _ , sbjctsInfo in row.items():
            grades.append(sbjctsInfo[subject])
    return grades


def getStudentInfo(id : int):
    sbjcts = readFromSubjectsFile()
    name = getStudentsNames(id)
    if(name == ''):
        return 'no student with the provided id'

    for row in sbjcts:
        for i , sbjctsInfo in row.items():
            if(i == id):
                return sbjctsInfo

def getStudentsAvgGrades():
    data = readFromSubjectsFile()
    avg = {}
    for row in data:
        for id , sbjcts in row.items():
            avg[id] = sum(sbjcts.values())/len(sbjcts)
    return avg



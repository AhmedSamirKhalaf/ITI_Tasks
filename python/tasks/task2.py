################################

def rmVowels(sentance : str):
    vowels = 'aeiou'
    sentance = sentance.lower()
    result = [x for x in sentance if x not in vowels ]
    return result


print(rmVowels('AhmED'))


#####################################


def locateChar(sentance : str , char : chr):
    result = [i for i , c in enumerate(sentance) if c == char]
    return result
print(locateChar('This is javaScript','i'))


###################################


def multTable(number : int):
    return [[ col * row   for col in range( 1, row + 1) ]for row in range(1 , number +1)]

print(multTable(3))


######################################


import math

def calculate_area(shape, *args):
    shape = shape.lower()
    if shape == "t":                        
        base, height = args
        return 0.5 * base * height
    elif shape == "r":                      
        width, height = args
        return width * height
    elif shape == "s":                      
        side = args[0]
        return side ** 2
    elif shape == "c":                      
        radius = args[0]
        return math.pi * radius ** 2
    else:
        return "unknown"

print(calculate_area("t", 10, 7))   
print(calculate_area("r", 10, 7))   
print(calculate_area("s", 10))      
print(calculate_area("c", 10))    



#######################################


def names_to_dict(names : str):
    result = {}
    for name in sorted(names):
        k = name[0].lower()
        result[k] = name
    return result

names = ["ahmed", "fatma", "ibrahim"]
print(names_to_dict(names))


######################################


def pyramid(num : int) : 
    for i in range(num+1):
        for j in range(i+1):
            print('*' ,end='')
        print('')

pyramid(4)

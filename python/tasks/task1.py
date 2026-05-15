###############################
num = 15
start = 10
end = 20
result = end >= num >= start
print(result)

#################################

age = 17
has_coupon = False
eligible = (age < 18 or age > 65) or has_coupon
print(eligible)  

#################################

name = "ahmed"
greeting = "hello, " + name + '!'
print(greeting)

###############################

full_name = "ahmed samir"
initials = full_name[0] + full_name[-1]
print(initials)

################################

name = "ahmed"
age = 23

## first format 
sentence = f"{name} is {age} years old."
print(sentence) 
## second foramt 
sentence = "{} is {} years old.".format(name, age)
print(sentence) 
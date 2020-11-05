import itertools

counter = itertools.count()

#for num in counter:
    #print(num)

data = [100, 200, 300, 400]
daily_data = list(zip(itertools.count(), data))

print(daily_data)

#counter = itertools.count(start=5, step=-2.5)

# https://youtu.be/Qu3dThVy6KQ?t=714

counter = itertools.count(start=5, step=-2.5)
#for num in counter:
    #print(num)
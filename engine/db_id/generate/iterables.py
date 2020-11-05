import itertools



#https://www.youtube.com/watch?v=bD05uGo_sVI
#https://www.youtube.com/watch?v=Qu3dThVy6KQ

# custom inter class
class MyRange:
    def __init__(self, start, end):
        self.value = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        # custom next
        if self.value >= self.end:
            raise StopIteration
        current = self.value
        self.value += 1
        return current


#generator function same as above MyRange class
def my_range(start, end):
    current = start
    while current < end:
        yield current
        current += 1
#nums = MyRange(1, 10)
nums = my_range(1, 10)

#for num in nums:
#    print(num)

""":arg
print(next(nums))
print(next(nums))
print(next(nums))
print(next(nums))
print(next(nums))
"""

# GENERATORS
class Gen:
    def __init__(self):
        pass

    def gen(n):
        for i in range(n):
            print(i)
            print('*************** THE I ************************')
            yield i ** 2
#for i in g:
    #print(i)
    #print('*************** THE I ************************')

# Inter

#print(dir(g))
#print(next(g))
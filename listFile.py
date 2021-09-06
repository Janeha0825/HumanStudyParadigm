import os
from collections import defaultdict
imageDict = {}
for (dirpath, dirnames, filenames) in os.walk('static/img/selected_jpeg'):
    imageClass = dirpath.split('/')[-1]
    if imageClass.isnumeric():
        for filename in filenames:
            try:
                filename = filename.split('_')
                name = filename[-1].split('-')[0]
                if imageClass not in imageDict:
                    imageDict[imageClass] = set()
                imageDict[imageClass].add(name)
            except:
                continue
for key in imageDict:
    imageDict[key] = list(imageDict[key])
    # imageDict[key] = imageDict[key][:15]
print(len(imageDict))

# classNameList = []
# for key in imageDict:
#     classNameList.append(int(key))
# classNameList.sort()
# for i in range(len(classNameList)):
#     classNameList[i] = str(classNameList[i])
# print(classNameList)
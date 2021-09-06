import glob
import os
from pathlib import Path
def get_files(dir):
    full_path_list = glob.glob(dir+"/*")
    return full_path_list
def save_paths(path_list, name = 'pathtoimages.txt'):
    file = open(name, 'w')
    for line in path_list:
        file.write(line +'\n')
    file.close()
def list_files_windows(path,  name = 'images_name.txt'):
    file = open(name, 'w')
    for root, dirs, files in os.walk(path):
        for name in files:
            if name.endswith(("JPEG")):
                class_name = root.split('\\')[-1]
                # file.write( name+','+class_name+'\n')
                file.write( name+'\n')
    file.close()

if __name__ == '__main__':
    class_dir = Path()/'/Users/jane/Downloads/30_selected_class'
    list_files_windows(class_dir,'selected_images_new20classes.txt')
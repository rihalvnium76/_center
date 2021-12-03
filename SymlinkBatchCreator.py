from __future__ import annotations
from typing import Iterable
import subprocess, os

# autoCompleteSymlinkName = False --> {symbolLinkPath: targetPath}
# autoCompleteSymlinkName = True --> {symbolLinkPath: (targetPath, ...)}
def CreateSymbolLinks(symbolLinks: dict[str, str | Iterable[str]], autoCompleteSymlinkName: str) -> None:
    def isRunningAsAdmin() -> bool:
        if os.name == 'nt':
            return not subprocess.run(('cacls', r'C:\System Volume Information'), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode
        else: # unix
            return os.getuid() == 0
    
    def printProgress(symbolLinkPath: str, targetPath: str) -> None:
        print(f'[>] {symbolLinkPath} -> {targetPath}')

    def completeSymlinkName(symbolLinkPath: str, targetPath: str) -> str:
        name = os.path.basename(targetPath)
        return os.path.join(symbolLinkPath, name) if os.path.basename(symbolLinkPath) != name else symbolLinkPath

    def createSymbolLink(symbolLinkPath: str, targetPath: str) -> None:
        printProgress(symbolLinkPath, targetPath)
        parentDir = os.path.dirname(symbolLinkPath)
        if not os.path.exists(parentDir):
            os.makedirs(parentDir)
        os.symlink(targetPath, symbolLinkPath, os.path.isdir(targetPath))

    if isRunningAsAdmin():
        for k, v in symbolLinks.items():
            if autoCompleteSymlinkName:
                if type(v) == str:
                    v = [v]
                for v2 in v:
                    createSymbolLink(completeSymlinkName(k, v2), v2)
            else:
                createSymbolLink(k, v)
    else:
        print("This script needs to be run as admin")


#LATEST_DIR = r'D:\Picture\lastest'
#CreateSymbolLinks({
#, r: r

#LATEST_DIR: (
#    r"D:\Picture\1\1.jpg"
#    , r"D:\Picture\1\2.jpg"
#)

#}, True)

#CreateSymbolLinks({
#  r"D:\Picture\lastest\1.jpg": r"D:\Picture\1\1.jpg"
#  , r"D:\Picture\lastest\2.jpg": r"D:\Picture\1\2.jpg"
#}, False)

# os.system("pause")

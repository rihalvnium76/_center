#Python 3.8.0

from __future__ import annotations
import subprocess

#ffmpeg -i "<source_file>"" -c:v libx264 -preset veryslow -crf 23 -refs 6 -bf 6 -g 600 -keyint_min 1 -sc_threshold 60 -deblock 1:1 -qcomp 0.5 -psy-rd 0.4:0 -aq-mode 3 -aq-strength 0.8 -me_method 4 -c:a aac -b:a 320k "<output_file>"
#x264 --crf 23 --preset veryslow -r 6 -b 6 -I 600 -i 1 --scenecut 60 -f 1:1 --qcomp 0.5 --psy-rd 0.4:0 --aq-mode 3 --aq-strength 0.8 --me tesa -o "<output_file>" "<source_file>"

def convert(outputDir: str, inputPaths: list[str]):
    COMMAND = 'ffmpeg -i "{}" -c:v libx264 -preset veryslow -crf 23 -refs 6 -bf 6 -g 600 -keyint_min 1 -sc_threshold 60 -deblock 1:1 -qcomp 0.5 -psy-rd 0.4:0 -aq-mode 3 -aq-strength 0.8 -me_method 4 -c:a copy "{}"'
    outputDir.strip()
    outputDir.strip('"')
    if outputDir[-1] != '\\':
        outputDir += '\\'

    def getOutputPath(inputPath: str) -> str:
        inputPath = inputPath[inputPath.rfind('\\') + 1 :]
        dotIndex = inputPath.rfind('.')
        inputPath = inputPath[: dotIndex] + '_x264' + inputPath[dotIndex :]
        return outputDir + inputPath

    for i in inputPaths:
        if not i: continue
        i.strip()
        i.strip('"')
        # print(COMMAND.format(i, getOutputPath(i))) 
        subprocess.run(COMMAND.format(i, getOutputPath(i)), shell = True)
        

# convert("""F:\AVideo\\BandicamRecord\雀魂\_o""", [
#     """F:\AVideo\BandicamRecord\雀魂\_todo\202109030953_人机点了大三元.mp4""",
#     """F:\AVideo\BandicamRecord\雀魂\_todo\202111101351_赤木铳还是南乡代打.mp4"""
# ])

convert("""D:\_o""", r"""
D:\_todo\xxxx.mp4
D:\_todo\yyyy.mp4
""".splitlines()) #[1:])

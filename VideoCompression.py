from __future__ import annotations
import subprocess, os

#ffmpeg -i "<source_file>" -c:v libx264 -preset veryslow -crf 23 -refs 6 -bf 6 -g 600 -keyint_min 1 -sc_threshold 60 -deblock 1:1 -qcomp 0.5 -psy-rd 0.4:0 -aq-mode 3 -aq-strength 0.8 -me_method 4 -c:a aac -b:a 320k "<output_file>"
#ffmpeg -i "<source_file>" -c:v libx264 -preset veryslow -crf 23 -refs 6 -bf 6 -g 600 -keyint_min 1 -sc_threshold 60 -deblock 1:1 -qcomp 0.5 -psy-rd 0.4:0 -aq-mode 3 -aq-strength 0.8 -me_method 4 -c:a copy "<output_file>"
#x264 --crf 23 --preset veryslow -r 6 -b 6 -I 600 -i 1 --scenecut 60 -f 1:1 --qcomp 0.5 --psy-rd 0.4:0 --aq-mode 3 --aq-strength 0.8 --me tesa -o "<output_file>" "<source_file>"

def convert(outputDir: str, inputPaths: list[str]):
    def getCommandLine(inputPath: str, outputPath: str) -> list[str]:
        return ['ffmpeg', '-i', inputPath, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '23', '-refs', '6', '-bf', '6', '-g', '600', '-keyint_min', '1', '-sc_threshold', '60', '-deblock', '1:1', '-qcomp',
'0.5', '-psy-rd', '0.4:0', '-aq-mode', '3', '-aq-strength', '0.8', '-me_method', '4', '-c:a', 'copy', outputPath]

    def trimPath(path: str) -> str:
        return os.path.normpath(path.strip('"'))

    def getOutputPath(inputPath: str) -> str:
        t = os.path.splitext(os.path.basename(inputPath))
        return os.path.join(outputDir, t[0] + '_x264' + t[1])
    
    outputDir = trimPath(outputDir)
    for i in inputPaths:
        if not i: continue
        i = trimPath(i)
        print('[>] {} ...'.format(i))
        # print(getCommandLine(i, getOutputPath(i)))
        try:
            subprocess.run(getCommandLine(i, getOutputPath(i)), capture_output=True, check=True, text=True)
        except subprocess.CalledProcessError as e:
            print()
            print(e.stderr)
        

# convert(r"""D:\_o""", [
#     r"""D:\_todo\xxxx.mp4""",
#     r"""D:\_todo\yyyy.mp4"""
# ])

convert(r"""D:\_o""", r"""
D:\_todo\xxxx.mp4
D:\_todo\yyyy.mp4
""".splitlines()) #[1:])

# os.system('pause')

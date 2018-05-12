/******************************************************************************/
/*                                                                            */
/*  “自动鼓4.2”请首先阅读                                (C)2002-2016 kuzu  */
/*                                                                            */
/******************************************************************************/

谢谢，尽管你忙得不得了，还是下载了“自动鼓4.2”，非常感谢。这个文件描述“自动鼓
4.2”的总结，基本用法，注意事项等。请首先阅读。此外，对于详细的操作方法，请阅读
docs夹里的AutoDrum_chs.pdf。

■特点

自动鼓是自由且开源的自动鼓演奏器软件。这个软件可以使用为帮你的作曲，或者，帮你的
乐器练习等。自动鼓有十三种类的预置节奏式样。而，你可以添加你制作的用户定义的节奏
式样。即使在演奏中，你可以变更拍速度以1BPM单位。而，用从模式可以追随跟外部机器。
有混频器功能，可以调节每个打乐器的打速度，或选择静音。此外，有同步开始，同步停止
功能。


■作业环境

・OS　　　　　　：Microsoft Windows XP/Vista/7/8.1/10正常运行的电脑
・CPU 　　　　　：约Core2Duo
・存储器　　　　：约2GB
・硬盘　　　　　：约10MB
・显示器　　　　：640×480像素或更高分辨率的全彩色显示器。
・MIDI音源　　　：外部MIDI音源或合成器。
　　　　　　　　　（Microsoft GS Wavetable Synth内置音源是可用的、VSTi不是可用的。）
・MIDI键盘　　　：外部MIDI 键盘(选项)。对应于MMC/MTC输出/输入功能
・其他　　　　　：声音听起来的环境(放大器/扬声器或耳机)。


■内容

AutoDrum4.2
├license.txt           许可证(文本)
├AutoDrum.exe          自动鼓软件★
├AutoDrum.exe.manifest 自动鼓显明文件★
├AutoDrum.ini          自动鼓设置保存文件★
├AutoDrum.mak          C/C++作出文件
├AutoDrum.sln          VisualC++ 2008 Standard Edition SP1的解决方案文件
├AutoDrum.vcproj       VisualC++ 2008 Standard Edition SP1的项目文件
├AutoDrumEnu.dll       自动鼓的英文资源库★
├AutoDrumJpn.dll       自动鼓的日文资源库★
├MIDIIO.dll            MIDI消息输入输出库★
├MIDIData.dll          MIDI数据作成编辑库★
├MIDIClock.dll         MIDI时刻计测库★
├MIDIStatus.dll        MIDI音源状态管理库★
├readme.txt            请首先阅读(日文)
├readme_en.txt         请首先阅读(英文)
├readme_ch.txt         请首先阅读(中文)
├src                   C/C++源文件・头文件・资源脚本夹
│├AutoDrum.c          
│├AutoDrum.rc         
│├resouce.h           
│└winver.h            
├res                   资源保存夹
│└AutoDrum.ico        主窗口的图标
├AutoDrumRes           语言别资源脚本夹
│├AutoDrumEnu.rc      资源脚本(英文)
│├AutoDrumJpn.rc      资源脚本(日文)
│├AutoDrumChs.rc      资源脚本(中文)
│├AutoDrumRes.rc      资源脚本(共通)
│├AutoDrumRes.mak     C/C++作出文件
│├AutoDrumRes.sln     VisualC++ 2008 Standard Edition SP1的解决方案文件
│└AutoDrumRes.vcproj  VisualC++ 2008 Standard Edition SP1的项目文件
├docs                  用户手册夹
│├AutoDrum.odt        用户手册(日文)(为OpenOffice)
│├AutoDrum.pdf        用户手册(日文)(为Adobe Reader)
│├AutoDrum_en.odt     用户手册(英文)(为OpenOffice)
│├AutoDrum_en.pdf     用户手册(英文)(为Adobe Reader)
│├AutoDrum_en.odt     用户手册(中文)(为OpenOffice)
│└AutoDrum_en.pdf     用户手册(中文)(为Adobe Reader)
├patch                 鼓套数据夹★
│├001_Standard.mid    标准套鼓
│├002_Standard2.mid   标准套鼓2
│├009_Room.mid        房间套鼓
│├017_Power.mid       强大的摇滚乐的套鼓
│├025_Electronic.mid  电子鼓的套鼓
│├026_TR808.mid       TR-808的套鼓
│├033_Jazz.mid        爵士乐的套鼓（棒）
│├041_Brush.mid       爵士乐的套鼓（刷）
│└049_Orchestral.mid  管弦乐队的套鼓
└pattern               节奏式样数据夹★
　├8beat_01.mid        通常的8beat
　├8beat_02.mid        背后的8beat
　├16beat_01.mid       通常的16beat
　├16beat_02.mid       背后的16beat
　├Disco_01.mid        低音鼓和踩镲主要的演奏
　├Disco_02.mid        低音鼓和踩镲主要的演奏
　├March_01.mid        小鼓主要的演奏
　├March_02.mid        小鼓主要的演奏
　├March_03.mid        小鼓主要的演奏
　├Swing_01.mid        骑钹主要的主要的演奏
　├Tango_01.mid        为4/4
　├Waltz_01.mid        为3/4
　└Waltz_02.mid        为3/4

　★：为了启动软件，是必不可少的(如果失去，则不能启动)。

　!注意! 由Windows的设置，可能没出现DLL文件。
　explorer或my computer的「工具(T)」-「选项(O)...」的「显示」页面里，
　把「显示全夹和文件」请设置ON。
　如果不显示扩展，同页面里，把「不显示被登记的扩展」请设置OFF。


■安装・启动办法

这个软件没有安装程序。你要只解压缩zip文件。

(1)请解压缩AutoDrum4.2.zip。
　!警告!　如果忘解压缩，则不能启动。
　!警告!　不要把程序放在c:\program files或c:\program files(x86)或c:\windows夹里，
　　　　　因为Windows有用户帐户控制(UAC)功能，设置文件等不能保存。
　　　　　请把程序放在上述以外的夹里。

(2)为了启动，请双击AutoDrum.exe。
　!警告!　不要启动从联网电脑上。

(3)请设置MIDI输入设备，MIDI输出设备。
　!警告!　如果选择忘MIDI输出设备，音不能出来。



■语言的变更办法

因为自动鼓在日本制作了，默认语言是日文。用户界面可以选择日文或英文或中文。
为了变更语言，有两个方法，(a)用自动鼓的对话框，(b)用文本编辑软件。

(a) 语言(L)请打开语言对话框，选择语言，按确定，然后重新启动自动鼓。
　你也打开语言对话框，以按键盘的[Alt]+[L]。

(b) 用文本编辑软件请打开AutoDrum.ini，变更"UserInterface=Japanese"成
　"UserInterface=Chinese"，按确定，然后启动AutoDrum.exe。


■卸载办法

这个软件没有卸载程序。你要只删除AutoDrum4.2夹。


■许可证

(1)这个软件下GNU LGPL(Lesser General Public License)条款发布了。

(2)没有保证。

(3)这个软件使用下面的动态链接库。
　・AutoDrumJpn.dll      (c)2016 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・AutoDrumEnu.dll      (c)2016 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・AutoDrumChs.dll      (c)2016 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・MIDIIO.dll           (c)2016 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・MIDIData.dll         (c)2016 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・MIDIClock.dll        (c)2014 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・MIDIStatus.dll       (c)2014 kuzu / 开放MIDI项目  许可证 = GNU LGPL
　・MIDIInstrument.dll   (c)2014 kuzu / 开放MIDI项目  许可证 = GNU LGPL

　!注意! 这些DLL被包括在AutoDurm4.2里。
　!注意! 如果消除这些DLL，或如果使用不同版本的DLL，自动鼓不能启动。


■更新履歴

2003/08/11 AutoDrum1.0 Release.

2006/08/07 AutoDrum1.1 Unrelease

2007/06/06 AutoDrum1.2 Release.

2008/01/02 AutoDrum1.3 Release

2008/03/31 AutoDrum1.4 Release

2009/07/05 AutoDrum1.5 Release

2012/01/22 AutoDrum1.6 Release

2012/03/04 AutoDrum1.7 Release.

2014/12/28 AutoDrum4.0 Release.
・对应了于Unicode。全字码可以使用了为文件名或者文本事件等。
・对应了文本编码，可以选择在语言对话框中。
・开発环境过渡了从Viual C++4.0到Visual C++ 2008 Standard Edition SP1。
・为了保存全字符，AutoDrum.ini的字符代码变更成UTF-16LE格式。
・修改了用户界面的字体。
　・用户界面=日文 : MS P Gothic > MS UI Gothic
　・用户界面=英文 : MS Sans Serif > Microsoft Sans Serif
・用户界面对应了于WindowsXP/ Vista/ 7 /8.1的主题。
・更新了MIDIIO库到版本1.0。
・更新了MIDIData库到版本3.1。
・更新了MIDIClock库到版本1.0。
・更新了MIDIStatus库到版本0.9。

2015/05/04 AutoDrum4.1 Release
・对应了于Windows10 Insider Preview 10074(暂时)。
・加强了标准MIDI文件(*.mid)的读取能。
・用户界面和手册对应了于中文。
・更新了MIDIData库到版本3.2。

2016/06/26 AutoDrum4.2 Release
・支持Windows10。
・作为默认文本编码，追加了0-Windows Control Panel ANSI Code Page。
・更新了MIDIIO库到版本1.1。
・更新了MIDIData库到版本3.4。

■联系信息

邮件地址(暂时): ee65051@yahoo.co.jp
项目网站: http://openmidiproject.osdn.jp/index.html


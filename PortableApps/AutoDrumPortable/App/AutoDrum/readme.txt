/******************************************************************************/
/*                                                                            */
/*  『自動どらむ4.2』はじめにお読みください                (C)2002-2016 くず  */
/*                                                                            */
/******************************************************************************/

　このたびは、お忙しい中、『自動どらむ4.2』をダウンロードしていただき、又はお受
け取りになっていただき、誠にありがとうございます。このファイルは、『自動どらむ
4.2』の概要、基本的な使い方、注意点などを簡単にまとめたものになります。是非はじ
めにお読みください。詳細な取扱説明書は、添付のAutoDrum.pdfをご参照ください。



■特徴

　『自動どらむ4.2』は、フリーでオープンソースの、自動ドラム演奏ソフトです。
作曲時の妄想補助、楽器の練習など、幅広い場面で使用できます。リズムパターンはプ
リセット13種類の他、お手持ちのシーケンサソフトを使ってオリジナルのパターンを作
ることができます。テンポは演奏中でも自由に変更することができ、スレーブモードで
外部機器に追従させることもできます。また、ミキサー機能により、楽器ごとにベロシ
ティ調整やミュートが可能です。さらに、接続したMIDIキーボードの演奏に合わせて自
動的にスタート・ストップするシンクロ機能も搭載しています。



■動作条件

・OS　　　　　　：Microsoft Windows XP/Vista/7/8.1/10が正常に動作するマシン
・CPU 　　　　　：Core2Duo程度
・メモリ　　　　：2GB程度
・ハードディスク：10MBもあれば十分と思われます。
・モニター　　　：640×480ドット以上の解像度のモニター。
・MIDI音源　　　：外付けMIDI音源又は内蔵MIDI音源又はソフトウェア音源(VSTiは不可)。
・MIDIキーボード：外付けMIDIキーボード(必須ではありません)。



■内容物

AutoDrum4.2
├license.txt           ライセンス原文(テキスト)
├AutoDrum.exe          アプリケーション本体★
├AutoDrum.exe.manifest マニフェストファイル(テキスト)
├AutoDrum.ini          設定ファイル(テキスト)★
├AutoDrum.mak          C/C++メイクファイル(テキスト)
├AutoDrum.sln          Visual Studio 2008 Standard Edition SP1用ソリューションファイル
├AutoDrum.vcproj       Visual Studio 2008 Standard Edition SP1用プロジェクトファイル
├AutoDrumEnu.dll       英語用リソースDLL★
├AutoDrumJpn.dll       日本語用リソースDLL★
├AutoDrumChs.dll       中国語用リソースDLL★
├MIDIIO.dll            ダイナミックリンクライブラリ(MIDIメッセージ入出力用)★
├MIDIData.dll          ダイナミックリンクライブラリ(MIDIデータ作成編集用)★
├MIDIClock.dll         ダイナミックリンクライブラリ(MIDI時刻計測用)★
├MIDIStatus.dll        ダイナミックリンクライブラリ(MIDI音源状態保持用)★
├readme.txt            このファイル(はじめにお読みください)(日本語)
├readme_en.txt         このファイル(はじめにお読みください)(英語)
├readme_ch.txt         このファイル(はじめにお読みください)(中国語)
├src                   ソース格納フォルダ
│├AutoDrum.c          Cソースファイル(テキスト)
│├AutoDrum.rc         C/C++リソースファイル(全言語共通)(テキスト)
│├resouce.h           C/C++リソースヘッダーファイル(テキスト)
│└winver.h            Windowsヴァージョンヘッダーファイル(テキスト)
├res                   リソース格納フォルダ
│└AutoDrum.ico        AutoDrumメインアイコン
├AutoDrumRes           AutoDrumリソース用プロジェクトフォルダ
│├AutoDrumEnu.rc      AutoDrumの英語リソーススクリプト(テキスト)
│├AutoDrumJpn.rc      AutoDrumの日本語リソーススクリプト(テキスト)
│├AutoDrumChs.rc      AutoDrumの中国語リソーススクリプト(テキスト)
│├AutoDrumRes.rc      AutoDrumのリソーススクリプト共通(テキスト)
│├AutoDrumRes.mak     AutoDrumのリソースメイクファイル(テキスト)
│├AutoDrumRes.sln     Visual Studio 2008 Standard Edition SP1用ソリューションファイル
│└AutoDrumRes.vcproj  Visual Studio 2008 Standard Edition SP1用プロジェクトファイル
├docs                  ドキュメント(取扱説明書など)を格納するフォルダ。
│├AutoDrum.odt        取扱説明書(OpenOffice)(日本語)
│├AutoDrum.pdf        取扱説明書(PDF)(日本語)
│├AutoDrum_en.odt     取扱説明書(OpenOffice)(英語)
│├AutoDrum_en.pdf     取扱説明書(PDF)(英語)
│├AutoDrum_chs.odt    取扱説明書(OpenOffice)(中国語)
│└AutoDrum_chs.pdf    取扱説明書(PDF)(中国語)
├patch                 パッチデータを格納するフォルダ。★
│├001_Standard.mid    標準的なドラムセット☆
│├002_Standard2.mid   標準的なドラムセットその２☆
│├009_Room.mid        適度のアンビエントがついたセット☆
│├017_Power.mid       パワフルなハードロック用のセット☆
│├025_Electronic.mid  電子ドラムのセット☆
│├026_TR808.mid       TR-808の音色を中心としたセット☆
│├033_Jazz.mid        Jazz用のセット（スティック）☆
│├041_Brush.mid       Jazz用のセット（ブラシ）☆
│└049_Orchestral.mid  オーケストラの打楽器のセット☆
└pattern               パターンデータを格納するフォルダ。★
　├8beat_01.mid        通常の8beat☆
　├8beat_02.mid        裏拍の強い8beat☆
　├16beat_01.mid       通常の16beat☆
　├16beat_02.mid       裏拍の強い16beat☆
　├Disco_01.mid        バスドラとハイハットを中心としたビート☆
　├Disco_02.mid        バスドラとハイハットを中心としたビート☆
　├March_01.mid        スネアを中心とした演奏☆
　├March_02.mid        スネアを中心とした演奏☆
　├March_03.mid        スネアを中心とした演奏☆
　├Swing_01.mid        ライドシンバルを中心としたリズム☆
　├Tango_01.mid        4分の4拍子用☆
　├Waltz_01.mid        4分の3拍子用☆
　└Waltz_02.mid        4分の3拍子用☆

　★：アプリケーションの動作に必要不可欠なもの(無くした場合は起動不能となります)。
　☆：アプリケーションの動作にあるべきもの(無くしても起動しますが不便を生じます)。
　!注意! Windowsの設定によっては、拡張子がdllのファイルは表示されない場合があります。
　そのような場合、エクスプローラー又はマイコンピュータの、「ツール(T)」-「オプション(O)...」
　の「表示」タブの中から「すべてのフォルダとファイルを表示する」をONにしてください。
　また、拡張子の部分のみが全く表示されない場合は、同じタブの中から、
　「登録されている拡張子は表示しない」をOFFにしてください。



■インストール・起動方法

このソフトにインストーラーは付属していません。下記の手順に従ってください。

(1)AutoDrum4.2.zipを、適当なフォルダにそのまま解凍してください。
　!警告!　解凍せずに用いると、必要なファイルが読み込めず起動できなくなります。
　!警告!　c:\program files, c:\program files(x86), c:\windowsの中には置かないでください。
　　　　　これらのフォルダはWindowsのセキュリティの都合上、設定ファイル(*.ini)や
　　　　　自動保存ファイルを書き込むことができません。

(2)エクスプローラーかマイコンピュータで、AutoDrum.exeをダブルクリックして
　起動してください。
　!警告!　起動は必ずAutoDrum.exeの置いてあるパソコン上で行ってください。
　ネットワークコンピュータ上で実行すると思わぬトラブルを引き起こすことがあります。

(3)初回は、MIDI出力デバイスとMIDI入力デバイスを選択する必要があります。
　「MIDIデバイス(D)」で、MIDI出力デバイスとMIDI入力デバイスを選択してください。
　!警告!　MIDI出力デバイスが何も選択されていない場合、音は鳴りません。



■アンインストール方法

このソフトにアンインストーラーは付属していません。下記の手順に従ってください。
なお、このソフトはレジストリを汚しません。(1)の作業だけで完結します。

(1)エクスプローラーかマイコンピュータで、AutoDrum4.2のフォルダ全体を削除します。



■ライセンスについて

(1)このソフトは、GNU LGPL (Lesser General Public License)に基づき配布されます。
　あなたはこのソフトを、LGPLに基づき、複製・再配布することができます。
　また、あなたはこのソフトを改変し、それをLGPLに基づき、再配布することもできます。
　いずれの場合も作者に許可を取る必要はありません。

(2)このソフトは全くの無保証です。
　いかなる場合においても、作者又は関係者が責任を負うことはありません。
　予めご了承くださいませ。

(3)このソフトは、次のダイナミックリンクライブラリ(*.dll)を利用して作られています。
　・AutoDrumJpn.dll      (c)2016 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・AutoDrumEnu.dll      (c)2016 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・AutoDrumChs.dll      (c)2016 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・MIDIIO.dll           (c)2016 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・MIDIData.dll         (c)2016 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・MIDIClock.dll        (c)2014 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL
　・MIDIStatus.dll       (c)2014 くず / おーぷんMIDIぷろじぇくと  ライセンス = GNU LGPL

　!注意! これらのDLLはすべてAutoDrum4.2に同梱されています。
　!注意! これらのDLLをなくしたり異なるヴァージョンのDLLを使用するとAutoDrumは起動しません。


■更新履歴

2003/08/11 AutoDrum1.0 Release.
・多くのバグを抱えながらも、初回限定版リリース(まだオープンソースでない)。

2006/08/07 AutoDrum1.1 Unrelease
・MIDITick.dll→MIDIClock.dll(LGPL)に変更、及びこれに伴うソース変更。
・MIDIModule.dll→MIDIStatus.dll(LGPL)に変更、及びこれに伴うソース変更。
・WindowsXPのNTDLL.dllに対応するためCloseHandle→FindCloseに変更。
・その他バグ修正

2007/06/06 AutoDrum1.2 Release.
・完全オープンソース化、GNU LGPLに対応。
・MIDIDataInfoDlg.dllの利用廃止、及びこれに伴うソース変更。
・MIDIDeviceDlg.dllの利用廃止、及びこれに伴うソース変更。
・その他バグ修正。

2008/01/02 AutoDrum1.3 Release
・WindowsXPテーマにおける画面表示の白化け修正。
・AutoDrum.exe.manifestを追加し、WindowsXPのテーマにも合うように修正。
・SMPTEベースのMIDIデータの読み込み時に正常にエラー停止するように修正。
・「ファイルのプロパティ」ダイアログをより詳細に修正。
・MIDIIO.dllの更新及びそれに伴う修正。
・MIDIData.dllの更新及びそれに伴う修正。
・MIDIClock.dllの更新及びそれに伴う修正。
・MIDIStatus.dllの更新及びそれに伴う修正。
・変数名・関数名の統一。

2008/03/31 AutoDrum1.4 Release
・MIDIIO.dllの更新及びそれに伴う修正。
・MIDIData.dllの更新及びそれに伴う修正。
・MIDIClock.dllの更新及びそれに伴う修正。
・MIDIStatus.dllの更新及びそれに伴う修正。
・MIN,MAX,CLIPマクロの新規追加。

2009/07/05 AutoDrum1.5 Release
・演奏時にノートオフを送出しないバグを修正。
・MIDIIO.dllの更新及びそれに伴う修正。
・MIDIData.dllの更新及びそれに伴う修正。
・MIDIClock.dllの更新及びそれに伴う修正。
・MIDIStatus.dllの更新及びそれに伴う修正。
・SMPTE/MTCによるスレーブモードを搭載。
・MIDI同期信号送出に対応。

2012/01/22 AutoDrum1.6 Release
・言語ダイアログを追加。
・GUIと取扱説明書が英語に対応。
・MIDIData.dllの更新。
・ソースコード全体をリファクタリング
・メインダイアログのEndDialog忘れを修正。

2012/03/04 AutoDrum1.7 Release.
・ソースコード全体をリファクタリング。
・MIDIIOライブラリを0.7に更新。
・MIDIDataライブラリを2.6に更新。

2014/12/28 AutoDrum4.0 Release.
・Unicodeに対応。
・開発環境を古いVisualC++ 4.0から新しいVisual C++ 2008 Statndard Edition SP1に移行。
・「言語」ダイアログで、デフォルトのテキストエンコーディングを選択できるようにしました。
・AutoDrum.iniの文字コードは、すべての文字を保存できるようにするため、UTF-16LEとなりました。
・ユーザーインターフェイスのフォントを変更。
　・UserInterface=Japanese : ＭＳ Ｐゴシック → MS UI Gothic
　・UserInterface=English : MS Sans Serif → Microsoft Sans Serif
・ユーザーインターフェイスはWindowsXP/Vista/7/8.1のテーマに対応。
・MIDIIOライブラリを1.0に更新。
・MIDIDataライブラリを3.1に更新。
・MIDIClockライブラリを1.0に更新。
・MIDIStatusライブラリを0.9に更新。

2014/05/04 AutoDrum4.1 Release.
・Windows10 Insider Preview 10074への対応。
・スタンダードMIDIファイル(*.mid)の読み込み能力を強化。
・GUIと取扱説明書が中国語に対応。
・MIDIDataライブラリを3.2に更新。

2016/06/26 AutoDrum4.2 Release.
・Windows10に対応。
・デフォルトのテキストエンコーディングとして、0-Windows Control Panel ANSI Code Pageを追加。
・MIDIIOライブラリを1.1に更新。
・MIDIDataライブラリを3.4に更新。


■連絡先について

メールアドレス(仮): ee65051@yahoo.co.jp
プロジェクトホームページ: http://openmidiproject.osdn.jp/index.html

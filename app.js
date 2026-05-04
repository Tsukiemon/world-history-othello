const SIZE = 6;
const EMPTY = 0;
const BLUE = 1;
const RED = 2;

const regions = [
  { label: "イスラム", key: "イスラム" },
  { label: "仏", key: "フランス" },
  { label: "日", key: "日本" },
  { label: "中", key: "中国" },
  { label: "英", key: "イギリス" },
  { label: "露", key: "ロシア" }
];
const periods = ["1000-1100", "1500-1700", "1914-1945", "2000-", "1200-1400", "800-900"];
const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const rows = `
800-900|イスラム|830年|翻訳|アッバース朝の知恵の館設立|知恵の館,アッバース朝の知恵の館設立,翻訳
800-900|イスラム|868年|トゥルーン|トゥルーン朝の自立|トゥルーン朝,トゥルーン朝の自立,トゥルーン
800-900|イスラム|869年|ザンジュ|ザンジュの乱|ザンジュの乱,ザンジュ
800-900|イスラム|873年|サマーン|サマーン朝の成立|サマーン朝,サマーン朝の成立,サマーン
800-900|フランス|843年|ヴェルダン|ヴェルダン条約による帝国分割|ヴェルダン条約,帝国分割,ヴェルダン
800-900|フランス|870年|メルセン|メルセン条約による再分割|メルセン条約,メルセン
800-900|フランス|885年|パリ防衛|ヴァイキングによるパリ包囲戦|パリ包囲戦,ヴァイキングによるパリ包囲戦,パリ防衛
800-900|日本|810年|薬子|薬子の変|薬子の変,薬子
800-900|日本|842年|承和|承和の変|承和の変,承和
800-900|日本|866年|応天門|応天門の変|応天門の変,応天門
800-900|日本|894年|白紙|遣唐使の白紙撤回|遣唐使の白紙撤回,遣唐使停止,白紙
800-900|日本|887年〜|寛平|寛平の治|寛平の治,寛平
800-900|中国|805年〜|元和|憲宗の元和の中興|元和の中興,憲宗,元和
800-900|中国|845年|廃仏|武宗の会昌の廃仏|会昌の廃仏,武宗の会昌の廃仏,廃仏
800-900|中国|859年|裘甫|裘甫の乱|裘甫の乱,裘甫
800-900|中国|868年|龐勛|龐勛の乱|龐勛の乱,龐勛
800-900|中国|875年|黄巣|黄巣の乱|黄巣の乱,黄巣
800-900|イギリス|829年|統一|ウェセックス王エグバートのイングランド統一|エグバート,イングランド統一,統一
800-900|イギリス|871年|アルフレッド|アルフレッド大王の即位|アルフレッド大王,アルフレッド大王の即位,アルフレッド
800-900|イギリス|878年|ウェドモア|デーン人とのウェドモアの和議|ウェドモアの和議,ウェドモア
800-900|ロシア|862年|リューリク|リューリクによるノヴゴロド国建国|リューリク,ノヴゴロド国建国
800-900|ロシア|882年|キエフ|オレグによるキエフ公国建国|オレグ,キエフ公国建国,キエフ
1000-1100|イスラム|1055年|セルジューク|セルジューク朝のバグダード入城|セルジューク朝,バグダード入城,セルジューク
1000-1100|イスラム|1071年|マラズギルト|マラズギルトの戦い|マラズギルトの戦い,マンジケルトの戦い,マラズギルト
1000-1100|イスラム|1099年|エルサレム|第1回十字軍によるエルサレム陥落|エルサレム陥落,第1回十字軍によるエルサレム陥落,エルサレム
1000-1100|フランス|1004年|破門|カペー朝ロベール2世の破門|ロベール2世の破門,破門
1000-1100|フランス|1095年|クレルモン|クレルモン公会議|クレルモン公会議,クレルモン
1000-1100|フランス|1096年|十字軍|第1回十字軍の出発|第1回十字軍,第一回十字軍,十字軍
1000-1100|フランス|1098年|シトー|シトー会創設|シトー会,シトー会創設,シトー
1000-1100|日本|1016年|道長|藤原道長が摂政に就任|藤原道長,道長
1000-1100|日本|1028年|忠常|平忠常の乱|平忠常の乱,忠常
1000-1100|日本|1051年|前九年|前九年の役|前九年の役,前九年
1000-1100|日本|1083年|後三年|後三年の役|後三年の役,後三年
1000-1100|日本|1086年|院政|白河上皇の院政開始|白河上皇,院政
1000-1100|中国|1004年|澶淵|遼との澶淵の盟|澶淵の盟,澶淵
1000-1100|中国|1038年|西夏|西夏建国|西夏,西夏建国
1000-1100|中国|1043年|慶暦|范仲淹の慶暦の改革|慶暦の改革,范仲淹,慶暦
1000-1100|中国|1069年|新法|王安石の変法|王安石の変法,王安石の新法,新法
1000-1100|イギリス|1016年|デーン|デーン朝成立|デーン朝,カヌート,デーン
1000-1100|イギリス|1066年|ノルマン|ヘースティングズの戦い|ヘースティングズの戦い,ノルマン征服,ノルマン
1000-1100|イギリス|1086年|検地|ドゥームズデイ・ブック作成|ドゥームズデイ・ブック,ドゥームズデーブック,検地帳,検地
1000-1100|ロシア|1019年〜|ヤロスラフ|ヤロスラフ賢公の治世|ヤロスラフ賢公,ヤロスラフ
1000-1100|ロシア|1054年|大シスマ|東西教会の分裂による正教会の確立|東西教会の分裂,大シスマ,正教会
1000-1100|ロシア|1097年|リュベチ|リュベチ諸公会議|リュベチ諸公会議,リュベチ
1200-1400|イスラム|1258年|バグダード|モンゴル軍によるバグダード陥落・アッバース朝滅亡|バグダード陥落,アッバース朝滅亡,バグダード
1200-1400|イスラム|1260年|ジャールート|マムルーク朝によるアイン・ジャールートの戦い|アイン・ジャールートの戦い,アインジャールートの戦い,ジャールート
1200-1400|イスラム|1299年|オスマン|オスマン帝国建国|オスマン帝国,オスマン
1200-1400|イスラム|1370年|ティムール|ティムール朝建国|ティムール朝,ティムール
1200-1400|イスラム|1389年|コソボ|コソボの戦い|コソボの戦い,コソボ
1200-1400|フランス|1209年〜|アルビジョワ|アルビジョワ十字軍|アルビジョワ十字軍,アルビジョワ
1200-1400|フランス|1214年|ブーヴィーヌ|ブーヴィーヌの戦い|ブーヴィーヌの戦い,ブーヴィーヌ
1200-1400|フランス|1303年|アナーニ|アナーニ事件|アナーニ事件,アナーニ
1200-1400|フランス|1309年|アヴィニョン|アヴィニョン捕囚|アヴィニョン捕囚,アビニョン捕囚,アヴィニョン
1200-1400|フランス|1337年|百年戦争|百年戦争勃発|百年戦争,百年戦争勃発
1200-1400|日本|1221年|承久|承久の乱|承久の乱,承久
1200-1400|日本|1232年|式目|御成敗式目制定|御成敗式目,式目
1200-1400|日本|1274年・1281年|元寇|文永・弘安の役|文永の役,弘安の役,元寇
1200-1400|日本|1333年|建武|建武の新政|建武の新政,建武
1200-1400|日本|1392年|南北朝|南北朝合一|南北朝合一,南北朝
1200-1400|中国|1211年|モンゴル|チンギス・ハンによる金攻略開始|チンギス・ハン,金攻略,モンゴル
1200-1400|中国|1279年|崖山|崖山の戦い・南宋滅亡|崖山の戦い,南宋滅亡,崖山
1200-1400|中国|1351年|紅巾|紅巾の乱|紅巾の乱,紅巾
1200-1400|中国|1368年|明|明建国|明,明建国
1200-1400|中国|1399年|靖難|靖難の役勃発|靖難の役,靖難
1200-1400|イギリス|1215年|大憲章|マグナ・カルタ制定|マグナ・カルタ,マグナカルタ,大憲章
1200-1400|イギリス|1265年|シモン|シモン・ド・モンフォールの議会|シモン・ド・モンフォール,シモン
1200-1400|イギリス|1295年|模範|模範議会召集|模範議会,模範
1200-1400|イギリス|1381年|ワット|ワット・タイラーの乱|ワット・タイラーの乱,ワットタイラーの乱,ワット
1200-1400|ロシア|1223年|カルカ|カルカ河畔の戦い|カルカ河畔の戦い,カルカ
1200-1400|ロシア|1240年|タタール|バトゥのキエフ攻略|タタールのくびき,バトゥ,タタール
1200-1400|ロシア|1283年頃|モスクワ|モスクワ大公国成立|モスクワ大公国,モスクワ
1200-1400|ロシア|1380年|クリコヴォ|クリコヴォの戦い|クリコヴォの戦い,クリコヴォ
1500-1700|イスラム|1501年|サファヴィー|サファヴィー朝建国|サファヴィー朝,サファヴィー
1500-1700|イスラム|1514年|チャルディラーン|チャルディラーンの戦い|チャルディラーンの戦い,チャルディラーン
1500-1700|イスラム|1529年|ウィーン|第一次ウィーン包囲|第一次ウィーン包囲,ウィーン包囲,ウィーン
1500-1700|イスラム|1571年|レパント|レパントの海戦|レパントの海戦,レパント
1500-1700|イスラム|1587年|アッバース|アッバース1世即位|アッバース1世,アッバース
1500-1700|フランス|1562年|ユグノー|ユグノー戦争勃発|ユグノー戦争,ユグノー
1500-1700|フランス|1572年|虐殺|サン・バルテルミの虐殺|サン・バルテルミの虐殺,サンバルテルミの虐殺,虐殺
1500-1700|フランス|1598年|ナント|ナントの勅令|ナントの勅令,ナントの王令,ナント
1500-1700|フランス|1648年|フロンド|フロンドの乱|フロンドの乱,フロンド
1500-1700|フランス|1685年|廃止|フォンテーヌブロー勅令|フォンテーヌブロー勅令,ナントの勅令廃止,廃止
1500-1700|日本|1543年|鉄砲|鉄砲伝来|鉄砲伝来,鉄砲
1500-1700|日本|1582年|本能寺|本能寺の変|本能寺の変,本能寺
1500-1700|日本|1600年|関ケ原|関ヶ原の戦い|関ヶ原の戦い,関ケ原の戦い,関ケ原,関ヶ原
1500-1700|日本|1603年|江戸|江戸幕府開府|江戸幕府,江戸
1500-1700|日本|1637年|島原|島原の乱|島原の乱,島原
1500-1700|中国|1592年・1597年|倭乱|壬辰・丁酉の倭乱|壬辰・丁酉の倭乱,文禄慶長の役,倭乱
1500-1700|中国|1619年|サルフ|サルフの戦い|サルフの戦い,サルフ
1500-1700|中国|1644年|明滅亡|李自成の乱による明滅亡|李自成の乱,明滅亡
1500-1700|中国|1662年|鄭成功|鄭成功の台湾平定|鄭成功
1500-1700|中国|1689年|ネルチンスク|ネルチンスク条約締結|ネルチンスク条約,ネルチンスク
1500-1700|イギリス|1534年|首長令|国王至上法制定|国王至上法,首長令,首長法
1500-1700|イギリス|1588年|アルマダ|アルマダの海戦|アルマダの海戦,アルマダ
1500-1700|イギリス|1642年|清教徒|清教徒革命|清教徒革命,ピューリタン革命,清教徒
1500-1700|イギリス|1688年|名誉|名誉革命|名誉革命,名誉
1500-1700|イギリス|1689年|章典|権利の章典制定|権利の章典,権利章典,章典
1500-1700|ロシア|1547年|ツァーリ|イヴァン4世のツァーリ戴冠|イヴァン4世,ツァーリ
1500-1700|ロシア|1581年|シベリア|イェルマークのシベリア探検|イェルマーク,シベリア探検,シベリア
1500-1700|ロシア|1613年|ロマノフ|ロマノフ朝建国|ロマノフ朝,ロマノフ
1500-1700|ロシア|1670年|ラージン|ステンカ・ラージンの乱|ステンカ・ラージンの乱,ラージン
1500-1700|ロシア|1697年|西欧|ピョートル1世の西欧視察|ピョートル1世,大使節団,西欧
1914-1945|イスラム|1915年|フサイン|フサイン・マクマホン書簡|フサイン・マクマホン書簡,フサイン
1914-1945|イスラム|1916年|サイクス|サイクス・ピコ協定|サイクス・ピコ協定,サイクスピコ協定,サイクス
1914-1945|イスラム|1920年|セーヴル|セーヴル条約|セーヴル条約,セーブル条約,セーヴル
1914-1945|イスラム|1923年|トルコ|トルコ共和国成立|トルコ共和国,トルコ
1914-1945|イスラム|1932年|サウジ|サウジアラビア王国成立|サウジアラビア王国,サウジ
1914-1945|フランス|1914年|一次大戦|第一次世界大戦参戦|第一次世界大戦,一次大戦
1914-1945|フランス|1919年|ヴェルサイユ|ヴェルサイユ条約調印|ヴェルサイユ条約,ヴェルサイユ
1914-1945|フランス|1923年|ルール|ルール占領|ルール占領,ルール
1914-1945|フランス|1936年|人民戦線|人民戦線内閣成立|人民戦線内閣,人民戦線
1914-1945|フランス|1940年|ヴィシー|ヴィシー政権成立|ヴィシー政権,ヴィシー
1914-1945|日本|1915年|二十一カ条|二十一カ条の要求|二十一カ条の要求,二十一カ条
1914-1945|日本|1918年|米騒動|米騒動|米騒動
1914-1945|日本|1931年|満州|満州事変|満州事変,満州
1914-1945|日本|1936年|二・二六|二・二六事件|二・二六事件,二二六事件
1914-1945|日本|1941年|開戦|太平洋戦争開戦|太平洋戦争,真珠湾攻撃,開戦
1914-1945|中国|1919年|五四|五四運動|五四運動,五四
1914-1945|中国|1924年|国共合作|第一次国共合作|第一次国共合作,国共合作
1914-1945|中国|1928年|北伐|国民革命軍の北伐完了|北伐
1914-1945|中国|1936年|長征|長征完了|長征
1914-1945|中国|1937年|日中|盧溝橋事件・日中戦争勃発|盧溝橋事件,日中戦争,日中
1914-1945|イギリス|1917年|バルフォア|バルフォア宣言|バルフォア宣言,バルフォア
1914-1945|イギリス|1922年|アイルランド|アイルランド自由国成立|アイルランド自由国,アイルランド
1914-1945|イギリス|1931年|ウェストミンスター|ウェストミンスター憲章|ウェストミンスター憲章,ウェストミンスター
1914-1945|イギリス|1938年|ミュンヘン|ミュンヘン会談|ミュンヘン会談,ミュンヘン
1914-1945|イギリス|1940年|ブリテン|バトル・オブ・ブリテン|バトル・オブ・ブリテン,バトルオブブリテン,ブリテン
1914-1945|ロシア|1917年|革命|ロシア革命|ロシア革命,革命
1914-1945|ロシア|1918年|ブレスト|ブレスト・リトフスク条約|ブレスト・リトフスク条約,ブレスト
1914-1945|ロシア|1922年|ソ連|ソヴィエト連邦成立|ソヴィエト連邦,ソビエト連邦,ソ連
1914-1945|ロシア|1928年|五カ年|第一次五カ年計画|第一次五カ年計画,五カ年計画,五カ年
1914-1945|ロシア|1942年|スターリングラード|スターリングラード攻防戦|スターリングラード攻防戦,スターリングラード
2000-|イスラム|2001年|アフガン|アメリカ軍によるアフガニスタン侵攻|アフガニスタン侵攻,アフガン
2000-|イスラム|2003年|イラク|イラク戦争|イラク戦争,イラク
2000-|イスラム|2010年〜|アラブの春|アラブの春|アラブの春
2000-|イスラム|2014年|ISIL|ISILの台頭|ISIL,ISIS,イスラム国
2000-|イスラム|2021年|タリバン|タリバンによるカブール制圧|タリバン,カブール制圧
2000-|フランス|2002年|ユーロ|ユーロ紙幣・硬貨流通開始|ユーロ紙幣,ユーロ硬貨,ユーロ
2000-|フランス|2015年|シャルリー|シャルリー・エブド襲撃事件|シャルリー・エブド襲撃事件,シャルリー
2000-|フランス|2015年|パリ協定|パリ協定採択|パリ協定
2000-|フランス|2018年|ベスト|黄色いベスト運動|黄色いベスト運動,ベスト
2000-|フランス|2019年|ノートルダム|ノートルダム大聖堂火災|ノートルダム大聖堂火災,ノートルダム
2000-|日本|2000年〜|ITバブル|ITバブル崩壊|ITバブル崩壊,ITバブル
2000-|日本|2009年|政権交代|民主党への政権交代|政権交代
2000-|日本|2011年|東日本|東日本大震災|東日本大震災,東日本
2000-|日本|2012年|アベノミクス|アベノミクス開始|アベノミクス
2000-|日本|2019年|令和|新元号「令和」への改元|令和,改元
2000-|中国|2001年|WTO|WTO加盟|WTO加盟,WTO
2000-|中国|2008年|北京五輪|北京オリンピック開催|北京オリンピック,北京五輪
2000-|中国|2013年|一帯一路|「一帯一路」構想発表|一帯一路
2000-|中国|2019年〜|コロナ|新型コロナウイルス感染症の世界的流行|新型コロナ,コロナ,COVID-19
2000-|中国|2020年|国安法|香港国家安全維持法制定|香港国家安全維持法,国安法
2000-|イギリス|2005年|ロンドンテロ|ロンドン同時爆破テロ事件|ロンドン同時爆破テロ事件,ロンドンテロ
2000-|イギリス|2014年|スコットランド|スコットランド独立住民投票|スコットランド
2000-|イギリス|2016年|ブレグジット|ブレグジットを問う国民投票|ブレグジット,Brexit
2000-|イギリス|2020年|EU離脱|EUからの完全離脱|EU離脱
2000-|イギリス|2022年|エリザベス|エリザベス2世崩御|エリザベス2世,エリザベス
2000-|ロシア|2000年|クルスク|原子力潜水艦クルスク沈没事故|クルスク沈没事故,クルスク
2000-|ロシア|2004年|ベスラン|ベスラン学校占拠事件|ベスラン
2000-|ロシア|2008年|ジョージア|ジョージア紛争|ジョージア紛争,グルジア紛争
2000-|ロシア|2014年|クリミア|クリミア併合|クリミア
2000-|ロシア|2022年|ウクライナ|ウクライナ侵攻|ウクライナ侵攻,ロシアのウクライナ侵攻,ウクライナ
`;

const eventDatabase = rows.trim().split("\n").map((line) => {
  const [period, region, year, label, eventName, aliases] = line.split("|");
  return { period, region, year, label, names: aliases.split(","), note: `${year}、${eventName}。` };
});

let board;
let currentPlayer;
let selectedMove = null;
let pendingManualEventName = "";
let history = [];

const boardShellEl = document.querySelector("#boardShell");
const blueScoreEl = document.querySelector("#blueScore");
const redScoreEl = document.querySelector("#redScore");
const turnBadgeEl = document.querySelector("#turnBadge");
const statusTextEl = document.querySelector("#statusText");
const judgeTitleEl = document.querySelector("#judgeTitle");
const judgeTextEl = document.querySelector("#judgeText");
const eventFormEl = document.querySelector("#eventForm");
const eventInputEl = document.querySelector("#eventInput");
const judgeButtonEl = document.querySelector("#judgeButton");
const judgeFeedbackEl = document.querySelector("#judgeFeedback");
const manualReviewEl = document.querySelector("#manualReview");
const manualCorrectButtonEl = document.querySelector("#manualCorrectButton");
const manualWrongButtonEl = document.querySelector("#manualWrongButton");
const historyListEl = document.querySelector("#historyList");
const resetButton = document.querySelector("#resetButton");

function createBoard() {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ({ player: EMPTY, label: "" })));
}
function init() {
  board = createBoard();
  board[2][2] = { player: RED, label: "開始" };
  board[2][3] = { player: BLUE, label: "開始" };
  board[3][2] = { player: BLUE, label: "開始" };
  board[3][3] = { player: RED, label: "開始" };
  currentPlayer = BLUE;
  selectedMove = null;
  pendingManualEventName = "";
  history = [];
  resetJudge();
  render();
}
function inBounds(row, col) { return row >= 0 && row < SIZE && col >= 0 && col < SIZE; }
function opponent(player) { return player === BLUE ? RED : BLUE; }
function playerName(player) { return player === BLUE ? "青" : "赤"; }
function cellContext(row, col) {
  const region = regions[col];
  return { region: region.label, regionKey: region.key, period: periods[row], code: `${String.fromCharCode(65 + col)}${row + 1}` };
}
function getFlips(row, col, player) {
  if (board[row][col].player !== EMPTY) return [];
  const flips = [];
  const other = opponent(player);
  for (const [dr, dc] of directions) {
    const line = [];
    let r = row + dr;
    let c = col + dc;
    while (inBounds(r, c) && board[r][c].player === other) { line.push([r, c]); r += dr; c += dc; }
    if (line.length && inBounds(r, c) && board[r][c].player === player) flips.push(...line);
  }
  return flips;
}
function validMoves(player) {
  const moves = [];
  for (let row = 0; row < SIZE; row++) for (let col = 0; col < SIZE; col++) {
    const flips = getFlips(row, col, player);
    if (flips.length) moves.push({ row, col, flips });
  }
  return moves;
}
function normalize(value) {
  return value.trim().toLowerCase().replace(/[＝=・･\s　ー\-―—]/g, "").replace(/[()（）「」『』]/g, "");
}
function judgeEvent(input, context) {
  const normalizedInput = normalize(input);
  if (!normalizedInput) return { status: "empty", ok: false, reason: "イベント名を入力してください。" };
  const match = eventDatabase.find((event) => event.names.some((name) => {
    const normalizedName = normalize(name);
    return normalizedInput.includes(normalizedName) || normalizedName.includes(normalizedInput);
  }));
  if (!match) return { status: "unknown", ok: false, reason: "データベースに存在しないため、インターネット等で調査を行ってください。" };
  if (match.region === context.regionKey && match.period === context.period) return { status: "match", ok: true, event: match };
  return { status: "mismatch", ok: false, event: match, reason: `「${match.label}」は ${match.region} / ${match.period} のイベントとして判定されました。` };
}
function selectCell(row, col) {
  const flips = getFlips(row, col, currentPlayer);
  if (!flips.length) return;
  selectedMove = { row, col, flips };
  const context = cellContext(row, col);
  judgeTitleEl.textContent = `${context.code} ${context.region} / ${context.period}`;
  judgeTextEl.textContent = `${playerName(currentPlayer)}チームは、この条件に合う世界史イベントを入力してください。`;
  eventInputEl.disabled = false;
  judgeButtonEl.disabled = false;
  eventInputEl.value = "";
  judgeFeedbackEl.textContent = "";
  manualReviewEl.hidden = true;
  pendingManualEventName = "";
  statusTextEl.textContent = `${context.code} を選択中。イベント名を入力して判定します。`;
  render();
  eventInputEl.focus();
}
function resetJudge() {
  judgeTitleEl.textContent = "マスを選択";
  judgeTextEl.textContent = "選んだマスの地域・年代に合う事件、王朝、人物、戦争、革命などを入力します。";
  eventInputEl.value = "";
  eventInputEl.disabled = true;
  judgeButtonEl.disabled = true;
  manualReviewEl.hidden = true;
  pendingManualEventName = "";
}
function submitEvent(event) {
  event.preventDefault();
  if (!selectedMove) return;
  const context = cellContext(selectedMove.row, selectedMove.col);
  const result = judgeEvent(eventInputEl.value, context);
  if (result.ok) {
    placeStone(result.event, context);
    const message = `合致: ${result.event.year} / ${result.event.note}`;
    currentPlayer = opponent(currentPlayer);
    resetJudge();
    handleNoMoveOrRender();
    judgeFeedbackEl.textContent = message;
    statusTextEl.textContent = `${context.code} に置きました。${playerName(currentPlayer)}のターンです。`;
    return;
  }
  if (result.status === "unknown") {
    pendingManualEventName = eventInputEl.value.trim();
    judgeFeedbackEl.textContent = result.reason;
    statusTextEl.textContent = `${context.code} は手動調査待ちです。調査後に正解 / 不正解を選んでください。`;
    eventInputEl.disabled = true;
    judgeButtonEl.disabled = true;
    manualReviewEl.hidden = false;
    return;
  }
  if (result.status === "empty") { judgeFeedbackEl.textContent = result.reason; return; }
  history.unshift({ player: currentPlayer, square: context.code, region: context.region, period: context.period, label: eventInputEl.value || "未入力", success: false, note: result.reason });
  const message = `不一致: ${result.reason} 相手のターンに移ります。`;
  currentPlayer = opponent(currentPlayer);
  selectedMove = null;
  resetJudge();
  handleNoMoveOrRender();
  judgeFeedbackEl.textContent = message;
  statusTextEl.textContent = `${context.code} には置けませんでした。${playerName(currentPlayer)}のターンです。`;
}
function placeStone(event, context) {
  const { row, col, flips } = selectedMove;
  board[row][col] = { player: currentPlayer, label: event.label };
  for (const [r, c] of flips) board[r][c] = { player: currentPlayer, label: event.label };
  history.unshift({ player: currentPlayer, square: context.code, region: context.region, period: context.period, label: event.label, success: true, flips: flips.length, note: event.note });
  selectedMove = null;
}
function resolveManualReview(isCorrect) {
  if (!selectedMove) return;
  const context = cellContext(selectedMove.row, selectedMove.col);
  const eventName = pendingManualEventName || eventInputEl.value.trim() || "手動判定";
  if (isCorrect) {
    placeStone({ label: eventName.slice(0, 6), year: context.period, note: `参加者の調査により、${context.region} / ${context.period} に合致すると判定されました。` }, context);
    const message = `手動判定: 正解。${context.code} に置きました。`;
    currentPlayer = opponent(currentPlayer);
    resetJudge();
    handleNoMoveOrRender();
    judgeFeedbackEl.textContent = message;
    statusTextEl.textContent = `${playerName(currentPlayer)}のターンです。`;
    return;
  }
  history.unshift({ player: currentPlayer, square: context.code, region: context.region, period: context.period, label: eventName, success: false, note: "参加者の調査により、不正解と判定されました。" });
  const message = "手動判定: 不正解。相手のターンに移ります。";
  currentPlayer = opponent(currentPlayer);
  selectedMove = null;
  resetJudge();
  handleNoMoveOrRender();
  judgeFeedbackEl.textContent = message;
  statusTextEl.textContent = `${playerName(currentPlayer)}のターンです。`;
}
function handleNoMoveOrRender() {
  const moves = validMoves(currentPlayer);
  if (moves.length) { render(); return; }
  const other = opponent(currentPlayer);
  if (validMoves(other).length) {
    const skipped = currentPlayer;
    currentPlayer = other;
    render();
    statusTextEl.textContent = `${playerName(skipped)}は置けるマスがないためパスです。`;
    return;
  }
  render();
  showGameOver();
}
function counts() {
  let blue = 0, red = 0;
  for (const row of board) for (const cell of row) { if (cell.player === BLUE) blue++; if (cell.player === RED) red++; }
  return { blue, red };
}
function showGameOver() {
  const { blue, red } = counts();
  const result = blue === red ? "引き分け" : blue > red ? "青チームの勝ち" : "赤チームの勝ち";
  statusTextEl.textContent = `対局終了。${result}です。`;
  judgeTitleEl.textContent = result;
  judgeTextEl.textContent = `最終スコア 青 ${blue} - 赤 ${red}`;
  eventInputEl.disabled = true;
  judgeButtonEl.disabled = true;
}
function render() {
  const moves = validMoves(currentPlayer);
  const playable = new Set(moves.map(({ row, col }) => `${row},${col}`));
  const { blue, red } = counts();
  blueScoreEl.textContent = blue;
  redScoreEl.textContent = red;
  turnBadgeEl.textContent = `${playerName(currentPlayer)}の番`;
  turnBadgeEl.className = `turn-badge ${currentPlayer === BLUE ? "blue" : "red"}`;
  if (!selectedMove && moves.length) statusTextEl.textContent = `置けるマスは ${moves.length} 個。マスを選んでからイベントを入力してください。`;
  boardShellEl.innerHTML = "";
  const corner = document.createElement("div");
  corner.className = "logo-label";
  boardShellEl.append(corner);
  regions.forEach((region, index) => {
    const label = document.createElement("div");
    label.className = `region-label ${index % 2 ? "stripe" : ""}`;
    label.textContent = region.label;
    boardShellEl.append(label);
  });
  for (let row = 0; row < SIZE; row++) {
    const periodLabel = document.createElement("div");
    periodLabel.className = `period-label ${row % 2 ? "stripe" : ""}`;
    periodLabel.textContent = periods[row].includes("-") && periods[row] !== "2000-" ? periods[row].replace("-", "-\n") : periods[row];
    boardShellEl.append(periodLabel);
    for (let col = 0; col < SIZE; col++) {
      const context = cellContext(row, col);
      const isPlayable = playable.has(`${row},${col}`);
      const isSelected = selectedMove?.row === row && selectedMove?.col === col;
      const cell = document.createElement("button");
      cell.className = `cell ${isPlayable ? "playable" : ""} ${isSelected ? "selected" : ""}`;
      cell.type = "button";
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", `${context.code} ${context.region} ${context.period}`);
      cell.addEventListener("click", () => selectCell(row, col));
      if (board[row][col].player !== EMPTY) {
        const stone = document.createElement("span");
        stone.className = `stone ${board[row][col].player === BLUE ? "blue" : "red"}`;
        stone.textContent = board[row][col].label;
        cell.append(stone);
      }
      boardShellEl.append(cell);
    }
  }
  renderHistory();
}
function renderHistory() {
  if (!history.length) { historyListEl.innerHTML = '<p class="question">判定結果と置いたイベントがここに残ります。</p>'; return; }
  historyListEl.innerHTML = "";
  for (const item of history) {
    const row = document.createElement("article");
    row.className = `history-item ${item.success ? "" : "miss"}`;
    row.innerHTML = `<span class="dot ${item.player === BLUE ? "blue" : "red"}"></span><div><strong>${item.success ? "成功" : "失敗"} / ${item.square} / ${item.region} / ${item.period}</strong><span>${item.label}: ${item.note}${item.flips ? `（${item.flips}枚反転）` : ""}</span></div>`;
    historyListEl.append(row);
  }
}

eventFormEl.addEventListener("submit", submitEvent);
manualCorrectButtonEl.addEventListener("click", () => resolveManualReview(true));
manualWrongButtonEl.addEventListener("click", () => resolveManualReview(false));
resetButton.addEventListener("click", init);
init();

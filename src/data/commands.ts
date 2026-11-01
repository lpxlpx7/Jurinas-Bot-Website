import type { Text } from "../lib/locale.js";

// Everything the site knows about the bot's commands, in all three languages.
// The playground, the command list and the hero demo all read from here.

const same = (value: string): Text => ({ en: value, ja: value, zh: value });

export type CategoryId = "members" | "weather" | "haneda" | "routes";

export interface Category {
  id: CategoryId;
  label: Text;
}

export interface CommandOption {
  name: string;
  hint: Text;
}

export interface EmbedField {
  label: Text;
  value: string;
}

// A bold name with its value either on the same line or underneath, as Discord renders embed text.
export interface EmbedLine {
  name: string;
  value?: string;
  inline?: boolean;
}

export interface Embed {
  accent: "blurple" | "teal" | "gold" | "violet" | "orange";
  title: Text;
  // A linked title renders in blue, like the real Haneda reply.
  titleIsLink?: boolean;
  heading?: string;
  fields?: EmbedField[];
  lines?: EmbedLine[];
  body?: string;
  // Path under the site root.
  image?: { src: string; alt: string; width: number; height: number };
  footer?: string;
}

export interface Example {
  // Option values this example answers, e.g. { icao: "RJOA" }.
  args: Record<string, string>;
  embed?: Embed;
  // A link button under the message, for commands that only point somewhere.
  button?: Text;
  content?: Text;
}

export interface Command {
  name: string;
  category: CategoryId;
  summary: Text;
  options: CommandOption[];
  isNew?: boolean;
  examples: Example[];
}

export const categories: Category[] = [
  { id: "members", label: { en: "Members", ja: "メンバー", zh: "成员" } },
  { id: "weather", label: { en: "Weather & ATIS", ja: "気象・ATIS", zh: "天气与 ATIS" } },
  { id: "haneda", label: { en: "Haneda", ja: "羽田", zh: "羽田" } },
  { id: "routes", label: { en: "Routes", ja: "経路", zh: "航路" } },
];

const icao: CommandOption = { name: "icao", hint: { en: "Four-letter ICAO code", ja: "4文字のICAOコード", zh: "四字 ICAO 代码" } };
const fix: CommandOption = { name: "fix", hint: { en: "Route fix", ja: "経路FIX", zh: "航路点" } };

const fieldLabel = {
  information: { en: "Information", ja: "インフォメーション", zh: "通播代码" },
  issued: { en: "Issued", ja: "発行", zh: "发布" },
  runway: { en: "Runway", ja: "滑走路", zh: "跑道" },
  runways: { en: "Runways", ja: "滑走路", zh: "跑道" },
  wind: { en: "Wind", ja: "風", zh: "风" },
  visibility: { en: "Visibility", ja: "視程", zh: "能见度" },
  valid: { en: "Valid", ja: "有効期間", zh: "有效期" },
} satisfies Record<string, Text>;

export const commands: Command[] = [
  {
    name: "vstats",
    category: "members",
    summary: {
      en: "Public VATSIM and VATUSA profile for a CID",
      ja: "CIDのVATSIM・VATUSA公開プロフィール",
      zh: "某个 CID 的 VATSIM 与 VATUSA 公开资料",
    },
    options: [{ name: "cid", hint: { en: "VATSIM CID", ja: "VATSIM CID", zh: "VATSIM CID" } }],
    examples: [
      {
        args: { cid: "0000000" },
        embed: {
          accent: "blurple",
          title: { en: "VATSIM MEMBERSHIP", ja: "VATSIM メンバー情報", zh: "VATSIM 成员信息" },
          heading: "XXX XXX",
          fields: [
            { label: same("CID"), value: "0000000" },
            { label: { en: "Rating", ja: "レーティング", zh: "等级" }, value: "XXX" },
            { label: { en: "Division", ja: "ディビジョン", zh: "分部" }, value: "XXX" },
            { label: { en: "Facility", ja: "所属施設", zh: "管制单位" }, value: "XXX" },
            { label: { en: "Member", ja: "メンバー", zh: "成员" }, value: "XXX" },
            { label: { en: "Roles", ja: "役職", zh: "职务" }, value: "XXX" },
          ],
          footer: "Data sources: VATSIM API and VATUSA API.",
        },
      },
    ],
  },
  {
    name: "metar",
    category: "weather",
    summary: { en: "Latest METAR for an airport", ja: "空港の最新METAR", zh: "机场最新 METAR" },
    options: [icao],
    examples: [
      {
        args: { icao: "RJAA" },
        embed: {
          accent: "gold",
          title: same("METAR"),
          heading: "RJAA · Narita",
          fields: [
            { label: fieldLabel.wind, value: "340° 08 kt" },
            { label: fieldLabel.visibility, value: "10 km+" },
            { label: same("QNH"), value: "1019 hPa" },
          ],
          body: "RJAA 010900Z 34008KT 9999 FEW025 17/08 Q1019 NOSIG",
        },
      },
    ],
  },
  {
    name: "taf",
    category: "weather",
    summary: { en: "Latest TAF for an airport", ja: "空港の最新TAF", zh: "机场最新 TAF" },
    options: [icao],
    examples: [
      {
        args: { icao: "RJAA" },
        embed: {
          accent: "gold",
          title: same("TAF"),
          heading: "RJAA · Narita",
          fields: [
            { label: fieldLabel.issued, value: "010500Z" },
            { label: fieldLabel.valid, value: "0106/0212" },
          ],
          body: "TAF RJAA 010500Z 0106/0212 34010KT 9999 FEW030\nBECMG 0109/0111 18008KT\nTEMPO 0200/0203 SHRA BKN020",
        },
      },
    ],
  },
  {
    name: "datis",
    category: "weather",
    isNew: true,
    summary: {
      en: "Digital ATIS for airports in the United States and Japan",
      ja: "米国と日本の空港のDigital ATIS",
      zh: "美国与日本机场的 Digital ATIS",
    },
    options: [icao],
    examples: [
      {
        args: { icao: "RJOA" },
        embed: {
          accent: "teal",
          title: same("DIGITAL ATIS"),
          heading: "RJOA · Hiroshima",
          fields: [
            { label: fieldLabel.information, value: "F" },
            { label: fieldLabel.issued, value: "0200Z" },
            { label: fieldLabel.runway, value: "28" },
          ],
          body: [
            "ATIS RJOA F",
            "M0200",
            "(APCH)RNP RWY28",
            "USING RWY 28",
            "RADAR FREQ 124.05",
            "M",
            "010200Z VRB03KT 15KM FEW025CU BKN///",
            "17/11 Q1020/A3014=",
            "Q/THREE ZERO ONE FOUR",
          ].join("\n"),
        },
      },
      {
        args: { icao: "KJFK" },
        embed: {
          accent: "blurple",
          title: same("DIGITAL ATIS"),
          heading: "KJFK · New York JFK",
          fields: [
            { label: fieldLabel.information, value: "B" },
            { label: fieldLabel.issued, value: "1851Z" },
            { label: fieldLabel.runways, value: "22L / 22R" },
          ],
          body: "JFK ATIS INFO B 1851Z. 22010KT 10SM FEW250 18/06 A3012. ILS RWY 22L APCH IN USE. DEPG RWY 22R. READBACK ALL HOLD SHORT INSTRUCTIONS. ADVS YOU HAVE INFO B.",
        },
      },
    ],
  },
  {
    name: "hndconfig",
    category: "haneda",
    summary: {
      en: "Haneda's current official runway configuration",
      ja: "羽田の現在の公式滑走路運用",
      zh: "羽田当前官方跑道运行",
    },
    options: [],
    examples: [
      {
        args: {},
        // The bot replies in Japanese whatever the reader's language, so this example does too.
        embed: {
          accent: "orange",
          title: same("羽田空港 運用状況"),
          titleIsLink: true,
          lines: [
            { name: "日中帯北風" },
            { name: "好天時" },
            { name: "Current JST:", value: "2026-11-01 11:26", inline: true },
            { name: "Calculated time period:", value: "B period (07:00-11:29)", inline: true },
            { name: "滑走路運用状況", value: "ILS X RWY34L/HIGHWAY VSL RWY34R LDG RWY 34L/34R DEP RWY 05/34R" },
            { name: "表示更新", value: "2026/11/01 11:00" },
          ],
          image: { src: "img/haneda-north.png", alt: "羽田空港 北風運用の飛行経路図", width: 363, height: 380 },
          footer: "出典: 国土交通省 羽田空港飛行コースホームページ",
        },
      },
    ],
  },
  {
    name: "hnddep",
    category: "haneda",
    summary: {
      en: "SID version and departure runway in use right now",
      ja: "現在使用中のSIDバージョンと出発滑走路",
      zh: "当前使用的 SID 版本与离场跑道",
    },
    options: [{ name: "sid", hint: { en: "Haneda SID", ja: "羽田のSID", zh: "羽田 SID" } }],
    examples: [
      {
        args: { sid: "XXXXX" },
        embed: {
          accent: "orange",
          title: { en: "HANEDA DEPARTURE", ja: "羽田 出発", zh: "羽田离场" },
          heading: "XXXXX",
          fields: [
            { label: same("SID"), value: "XXXXX" },
            { label: fieldLabel.runway, value: "XXX" },
            { label: { en: "Period", ja: "時間帯", zh: "时段" }, value: "XXX" },
          ],
        },
      },
    ],
  },
  {
    name: "hndarr",
    category: "haneda",
    summary: {
      en: "Arrival runway, STAR and approach for an entry fix",
      ja: "到着FIXに対する着陸滑走路・STAR・進入方式",
      zh: "进场点对应的着陆跑道、STAR 与进近方式",
    },
    options: [{ name: "entry", hint: { en: "Entry fix", ja: "到着FIX", zh: "进场点" } }],
    examples: [
      {
        args: { entry: "XXXXX" },
        embed: {
          accent: "orange",
          title: { en: "HANEDA ARRIVAL", ja: "羽田 到着", zh: "羽田进场" },
          heading: "XXXXX",
          fields: [
            { label: fieldLabel.runway, value: "XXX" },
            { label: same("STAR"), value: "XXX" },
            { label: same("IAP"), value: "XXX" },
          ],
        },
      },
    ],
  },
  {
    name: "arrtransalt",
    category: "routes",
    summary: {
      en: "Arrival and approach transfer details for a route fix",
      ja: "経路FIXの到着・進入移管情報",
      zh: "航路点的进场与进近移交信息",
    },
    options: [icao, fix],
    examples: [
      {
        args: { icao: "XXXX", fix: "XXXXX" },
        embed: {
          accent: "violet",
          title: { en: "ARRIVAL TRANSFER", ja: "到着移管", zh: "进场移交" },
          heading: "XXXX · XXXXX",
          fields: [
            { label: { en: "Transfer", ja: "移管", zh: "移交" }, value: "XXX" },
            { label: { en: "Altitude", ja: "高度", zh: "高度" }, value: "XXX" },
          ],
        },
      },
    ],
  },
  {
    name: "deptransalt",
    category: "routes",
    summary: {
      en: "Departure and climb transfer details for a route fix",
      ja: "経路FIXの出発・上昇移管情報",
      zh: "航路点的离场与爬升移交信息",
    },
    options: [icao, fix],
    examples: [
      {
        args: { icao: "XXXX", fix: "XXXXX" },
        embed: {
          accent: "violet",
          title: { en: "DEPARTURE TRANSFER", ja: "出発移管", zh: "离场移交" },
          heading: "XXXX · XXXXX",
          fields: [
            { label: { en: "Transfer", ja: "移管", zh: "移交" }, value: "XXX" },
            { label: { en: "Altitude", ja: "高度", zh: "高度" }, value: "XXX" },
          ],
        },
      },
    ],
  },
  {
    name: "jpnroute",
    category: "routes",
    summary: { en: "Open the JPN Route website", ja: "JPN Routeのウェブサイトを開く", zh: "打开 JPN Route 网站" },
    options: [],
    examples: [
      {
        args: {},
        content: { en: "Here's JPN Route:", ja: "JPN Routeはこちら：", zh: "JPN Route 在这里：" },
        button: same("JPN Route"),
      },
    ],
  },
];

export const findCommand = (name: string): Command | undefined => commands.find((command) => command.name === name);

// The commands the hero suggests, in the order the demo cycles through them.
export const featured: Array<{ input: string; isNew?: boolean }> = [
  { input: "/datis icao:RJOA", isNew: true },
  { input: "/datis icao:KJFK" },
  { input: "/hndconfig" },
  { input: "/metar icao:RJAA" },
  { input: "/vstats cid:0000000" },
];

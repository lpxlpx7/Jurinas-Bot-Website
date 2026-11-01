// Everything the page says about commands lives here, in all three languages,
// so the command list and the live demo can never drift apart.
export const categories = [
    { id: "members", label: { en: "Members", ja: "メンバー", zh: "成员" } },
    { id: "weather", label: { en: "Weather & ATIS", ja: "気象・ATIS", zh: "天气与 ATIS" } },
    { id: "haneda", label: { en: "Haneda", ja: "羽田", zh: "羽田" } },
    { id: "routes", label: { en: "Routes", ja: "経路", zh: "航路" } },
];
export const commands = [
    {
        name: "/vstats",
        usage: "cid:<CID>",
        category: "members",
        summary: {
            en: "Public VATSIM and VATUSA profile for a CID",
            ja: "CIDのVATSIM・VATUSA公開プロフィール",
            zh: "某个 CID 的 VATSIM 与 VATUSA 公开资料",
        },
    },
    {
        name: "/metar",
        usage: "icao:<ICAO>",
        category: "weather",
        summary: { en: "Latest METAR for an airport", ja: "空港の最新METAR", zh: "机场最新 METAR" },
    },
    {
        name: "/taf",
        usage: "icao:<ICAO>",
        category: "weather",
        summary: { en: "Latest TAF for an airport", ja: "空港の最新TAF", zh: "机场最新 TAF" },
    },
    {
        name: "/datis",
        usage: "icao:<ICAO>",
        category: "weather",
        isNew: true,
        summary: {
            en: "Digital ATIS for airports in the United States and Japan",
            ja: "米国と日本の空港のDigital ATIS",
            zh: "美国与日本机场的 Digital ATIS",
        },
    },
    {
        name: "/hndconfig",
        usage: "",
        category: "haneda",
        summary: {
            en: "Haneda's current official runway configuration",
            ja: "羽田の現在の公式滑走路運用",
            zh: "羽田当前官方跑道运行",
        },
    },
    {
        name: "/hnddep",
        usage: "sid:<SID>",
        category: "haneda",
        summary: {
            en: "SID version and departure runway in use right now",
            ja: "現在使用中のSIDバージョンと出発滑走路",
            zh: "当前使用的 SID 版本与离场跑道",
        },
    },
    {
        name: "/hndarr",
        usage: "entry:<FIX>",
        category: "haneda",
        summary: {
            en: "Arrival runway, STAR and approach for an entry fix",
            ja: "到着FIXに対する着陸滑走路・STAR・進入方式",
            zh: "进场点对应的着陆跑道、STAR 与进近方式",
        },
    },
    {
        name: "/arrtransalt",
        usage: "icao:<ICAO> fix:<FIX>",
        category: "routes",
        summary: {
            en: "Arrival and approach transfer details for a route fix",
            ja: "経路FIXの到着・進入移管情報",
            zh: "航路点的进场与进近移交信息",
        },
    },
    {
        name: "/deptransalt",
        usage: "icao:<ICAO> fix:<FIX>",
        category: "routes",
        summary: {
            en: "Departure and climb transfer details for a route fix",
            ja: "経路FIXの出発・上昇移管情報",
            zh: "航路点的离场与爬升移交信息",
        },
    },
    {
        name: "/jpnroute",
        usage: "",
        category: "routes",
        summary: { en: "Open the JPN Route website", ja: "JPN Routeのウェブサイトを開く", zh: "打开 JPN Route 网站" },
    },
];
// Illustrative responses for the demo console. None of this is live data.
export const demos = [
    {
        id: "datis-rjoa",
        input: "/datis icao:RJOA",
        chip: { en: "D-ATIS · Japan", ja: "D-ATIS・日本", zh: "D-ATIS · 日本" },
        isNew: true,
        accent: "teal",
        title: { en: "DIGITAL ATIS", ja: "DIGITAL ATIS", zh: "DIGITAL ATIS" },
        heading: "RJOA · Hiroshima",
        fields: [
            { label: { en: "Information", ja: "インフォメーション", zh: "通播代码" }, value: "F" },
            { label: { en: "Issued", ja: "発行", zh: "发布" }, value: "0200Z" },
            { label: { en: "Runway", ja: "滑走路", zh: "跑道" }, value: "28" },
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
    {
        id: "datis-kjfk",
        input: "/datis icao:KJFK",
        chip: { en: "D-ATIS · US", ja: "D-ATIS・米国", zh: "D-ATIS · 美国" },
        accent: "blurple",
        title: { en: "DIGITAL ATIS", ja: "DIGITAL ATIS", zh: "DIGITAL ATIS" },
        heading: "KJFK · New York JFK",
        fields: [
            { label: { en: "Information", ja: "インフォメーション", zh: "通播代码" }, value: "B" },
            { label: { en: "Issued", ja: "発行", zh: "发布" }, value: "1851Z" },
            { label: { en: "Runways", ja: "滑走路", zh: "跑道" }, value: "22L / 22R" },
        ],
        body: "JFK ATIS INFO B 1851Z. 22010KT 10SM FEW250 18/06 A3012. ILS RWY 22L APCH IN USE. DEPG RWY 22R. NOTICE TO AIR MISSIONS: TWY B CLSD BTN A AND K. READBACK ALL HOLD SHORT INSTRUCTIONS. ADVS YOU HAVE INFO B.",
    },
    {
        id: "metar",
        input: "/metar icao:RJAA",
        chip: { en: "METAR", ja: "METAR", zh: "METAR" },
        accent: "gold",
        title: { en: "METAR", ja: "METAR", zh: "METAR" },
        heading: "RJAA · Narita",
        fields: [
            { label: { en: "Wind", ja: "風", zh: "风" }, value: "340° 08 kt" },
            { label: { en: "Visibility", ja: "視程", zh: "能见度" }, value: "10 km+" },
            { label: { en: "QNH", ja: "QNH", zh: "QNH" }, value: "1019 hPa" },
        ],
        body: "RJAA 010900Z 34008KT 9999 FEW025 17/08 Q1019 NOSIG",
    },
    {
        id: "hndconfig",
        input: "/hndconfig",
        chip: { en: "Haneda runways", ja: "羽田の滑走路", zh: "羽田跑道" },
        accent: "orange",
        // The bot replies in Japanese whatever the reader's language, so this demo does too.
        title: { en: "羽田空港 運用状況", ja: "羽田空港 運用状況", zh: "羽田空港 運用状況" },
        titleIsLink: true,
        lines: [
            { name: "日中帯北風" },
            { name: "好天時" },
            { name: "Current JST:", value: "2026-11-01 11:26", inline: true },
            { name: "Calculated time period:", value: "B period (07:00-11:29)", inline: true },
            { name: "滑走路運用状況", value: "ILS X RWY34L/HIGHWAY VSL RWY34R LDG RWY 34L/34R DEP RWY 05/34R" },
            { name: "表示更新", value: "2026/11/01 11:00" },
        ],
        image: { src: "haneda-north.png", alt: "羽田空港 北風運用の飛行経路図", width: 363, height: 380 },
        footer: "出典: 国土交通省 羽田空港飛行コースホームページ",
    },
    {
        id: "vstats",
        input: "/vstats cid:0000000",
        chip: { en: "Member lookup", ja: "メンバー検索", zh: "成员查询" },
        accent: "blurple",
        title: { en: "VATSIM MEMBERSHIP", ja: "VATSIM メンバー情報", zh: "VATSIM 成员信息" },
        heading: "XXX XXX",
        fields: [
            { label: { en: "CID", ja: "CID", zh: "CID" }, value: "0000000" },
            { label: { en: "Rating", ja: "レーティング", zh: "等级" }, value: "XXX" },
            { label: { en: "Division", ja: "ディビジョン", zh: "分部" }, value: "XXX" },
        ],
    },
];
export const ui = {
    exampleNote: {
        en: "Example output, not live data",
        ja: "表示例です（実際のデータではありません）",
        zh: "示例输出，并非实时数据",
    },
    newBadge: { en: "New", ja: "New", zh: "新" },
    all: { en: "All", ja: "すべて", zh: "全部" },
    botTag: { en: "APP", ja: "アプリ", zh: "APP" },
    today: { en: "Today at 18:00", ja: "今日 18:00", zh: "今天 18:00" },
};

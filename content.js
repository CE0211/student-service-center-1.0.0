window.SITE_DATA = {
  site: {
    id: "campus-launchpad",
    version: "1.0.0",
    contentVersion: "1.0.0",
    language: "zh-CN",
    title: "校园服务站定制｜Student Service Center-1.0.0",
    description: "报到流程、阶段任务、行李清单、第一周安排、常见问答与安全提醒，一页整理清楚。",
    themeColor: "#9a4e3f",
    defaultTheme: "warm",
    colors: {
      ink: "#302822",
      brand: "#9a4e3f",
      accent: "#e97755",
      paper: "#fbf4e9",
      white: "#fffdf8",
      muted: "#7b6d64",
      soft: "#f1e3d2"
    }
  },

  themes: [
    { id: "warm", label: "暖杏", colors: { ink: "#302822", brand: "#9a4e3f", accent: "#e97755", paper: "#fbf4e9", white: "#fffdf8", muted: "#7b6d64", soft: "#f1e3d2" } },
    { id: "coral", label: "珊瑚", colors: { ink: "#352328", brand: "#a23b4a", accent: "#f06b74", paper: "#fff1f1", white: "#fffafa", muted: "#7d6469", soft: "#f6dadd" } },
    { id: "amber", label: "向阳", colors: { ink: "#312a1c", brand: "#78571c", accent: "#e7aa2d", paper: "#fff8e7", white: "#fffdf7", muted: "#746b56", soft: "#f7e8b8" } },
    { id: "green", label: "青芽", colors: { ink: "#1f3026", brand: "#2c6546", accent: "#67b96e", paper: "#f0f8ef", white: "#fbfffb", muted: "#64766a", soft: "#ddecdd" } },
    { id: "blue", label: "晴空", colors: { ink: "#1d2b33", brand: "#245d7a", accent: "#4db4d7", paper: "#eff8fc", white: "#fbfeff", muted: "#607580", soft: "#d9edf5" } },
    { id: "indigo", label: "靛蓝", colors: { ink: "#25293a", brand: "#404c8a", accent: "#778ae8", paper: "#f2f3fb", white: "#fdfdff", muted: "#6d7082", soft: "#e0e3f4" } },
    { id: "violet", label: "柔紫", colors: { ink: "#302738", brand: "#6d4785", accent: "#b277c8", paper: "#f8f1fa", white: "#fffaff", muted: "#786a7d", soft: "#eddcf2" } }
  ],

  brand: {
    mark: "启",
    logo: "assets/creator-logo.webp",
    name: "校园服务站定制",
    subtitle: "Student Service Center-1.0.0",
    footerLine: "把复杂信息变成清晰行动。"
  },

  hero: {
    edition: "2026 新生第一周行动指南",
    prefix: "第一次走进校园",
    title: "别慌，照着这份清单慢慢来",
    intro: "报到、入住、开课前要做的事都整理在这里。先完成最重要的，再慢慢认识新的校园和朋友。",
    primaryAction: "查看可定制内容",
    arrivalDate: "手机 / 平板 / 电脑",
    campusAddress: "迎新导航 / 校园生活 / 活动指南",
    statusLabel: "你的准备清单",
    updatedAt: "正式版 1.0.0",
    cardMessage: "勾选完成项，进度会自动保存在当前浏览器。换设备后需要重新勾选。"
  },

  notice: {
    enabled: true,
    title: "先认准官方通知",
    text: "报到、缴费、宿舍与接站安排以学校当年正式通知为准；不要向私人账户转账，也不要透露短信验证码。"
  },

  quickLinks: [
    { icon: "路", title: "报到路线", description: "到校当天按顺序行动", url: "#roadmap" },
    { icon: "任", title: "阶段任务", description: "到哪个阶段看哪一组", url: "#tasks" },
    { icon: "单", title: "行李清单", description: "勾选结果留在本机", url: "#checklist" },
    { icon: "服", title: "服务速查", description: "地图、资助、报修与医疗", url: "#services" }
  ],

  highlights: [
    { value: "4", label: "类定制方向" },
    { value: "8", label: "类服务入口" },
    { value: "4", label: "组内容模块" },
    { value: "3", label: "档完整模板" }
  ],

  roadmapIntro: "现场安排可能变化，先找学院迎新点，再按本校当年流程行动。",
  roadmap: [
    { time: "到校", title: "先找到学院迎新点", detail: "核对身份、专业和班级信息，确认现场流程后再搬运行李。" },
    { time: "随后", title: "办理报到与入住", detail: "领取材料和宿舍钥匙，记录宿管、辅导员及紧急联系电话。" },
    { time: "当天", title: "只办必要事项", detail: "按通知处理校园卡、体检、军训物资等，推销项目先不急着买。" },
    { time: "晚上", title: "整理第二天安排", detail: "收藏上课地点与官方入口，把宿舍和辅导员联系方式同步给家人。" }
  ],

  taskGroups: [
    {
      id: "before",
      label: "出发前",
      eyebrow: "BEFORE ARRIVAL",
      title: "先处理无法临时补办的事项",
      intro: "不用急着买齐所有东西，先保证身份、信息和行程不出问题。",
      items: [
        { title: "核对官方通知", detail: "确认报到日期、校区、学院、宿舍和接站安排，保存通知截图。" },
        { title: "单独收好证件", detail: "身份证、录取通知书、证件照及学校要求材料放进随身包。" },
        { title: "规划到校路线", detail: "准备一套备选交通方案，并将预计到校时间告诉家人。" }
      ],
      tip: "不确定是否必须携带的材料，先询问学校招生办或学院辅导员。"
    },
    {
      id: "arrival",
      label: "报到日",
      eyebrow: "ARRIVAL DAY",
      title: "跟着学院指引走，不跟陌生人走",
      intro: "现场信息很多，先完成必要手续，再处理可以延后的事项。",
      items: [
        { title: "确认迎新人员身份", detail: "优先寻找学校统一标识、学院帐篷或官方志愿者。" },
        { title: "核对领取材料", detail: "当场检查校园卡、宿舍钥匙、流程单等是否齐全。" },
        { title: "拒绝非官方收费", detail: "遇到推销、兼职或代缴费，先离开现场再向学校核实。" }
      ],
      tip: "不要把身份证原件、手机、银行卡或验证码交给身份不明的人代办。"
    },
    {
      id: "dorm",
      label: "住宿舍",
      eyebrow: "DORM LIFE",
      title: "先保证安全和基本生活，再慢慢添置",
      intro: "宿舍空间有限，确认尺寸和规定前，不建议先买大件物品。",
      items: [
        { title: "检查床位与设施", detail: "记录损坏处并及时报修，确认床铺尺寸和用电规定。" },
        { title: "保管钥匙与贵重物品", detail: "离开宿舍随手锁门，证件和电子设备不要放在公共区域。" },
        { title: "约定共同生活规则", detail: "尽早沟通作息、卫生、空调和访客等容易产生分歧的事项。" }
      ],
      tip: "违规电器和大功率设备的判断标准，以宿舍管理规定为准。"
    },
    {
      id: "study",
      label: "开课前",
      eyebrow: "READY FOR CLASS",
      title: "把课表、教室和账号一次确认清楚",
      intro: "第一周群消息很多，关键安排要单独收藏，不要只靠聊天记录。",
      items: [
        { title: "登录教务系统", detail: "检查课程、上课时间、校区和教室，及时修改初始密码。" },
        { title: "确认班级通知渠道", detail: "只保留经过辅导员或班助确认的正式群聊。" },
        { title: "提前走一遍路线", detail: "从宿舍到教学楼实地走一次，给早高峰预留时间。" }
      ],
      tip: "群文件可能被多次转发，关键日期仍要回到官方通知核对。"
    }
  ],

  weekPlan: [
    { day: "DAY 01", title: "报到与入住", detail: "完成身份核验、领钥匙、整理床位，晚上只做必要的信息归档。", tag: "先安顿" },
    { day: "DAY 02", title: "熟悉生活半径", detail: "找到食堂、快递点、校医院、打印店和最近的便利店。", tag: "认路" },
    { day: "DAY 03", title: "确认班级信息", detail: "核对班群、辅导员、班助、军训或入学教育安排。", tag: "核信息" },
    { day: "BEFORE CLASS", title: "为开课做准备", detail: "登录教务系统，收藏课表，提前走一遍宿舍到教学楼的路线。", tag: "不迟到" }
  ],

  serviceFilters: [
    { id: "all", label: "全部" },
    { id: "arrival", label: "到校报到" },
    { id: "life", label: "校园生活" },
    { id: "study", label: "学习账号" },
    { id: "support", label: "帮助支持" }
  ],

  serviceDirectory: [
    { category: "arrival", icon: "图", title: "校园地图与接站路线", detail: "校门、迎新点、宿舍楼和接站点可以直接导航。", meta: "地图 / 路线 / 接站" },
    { category: "arrival", icon: "办", title: "报到系统与现场流程", detail: "集中放置线上报到入口、现场顺序和所需材料。", meta: "入口 / 材料 / 流程" },
    { category: "life", icon: "住", title: "宿舍报修与生活设施", detail: "床位报修、门禁、水电、浴室、快递和洗衣说明。", meta: "报修 / 门禁 / 快递" },
    { category: "life", icon: "医", title: "校医院与保险报销", detail: "就诊地点、开放时间、校内急救和医保说明。", meta: "医疗 / 保险 / 急救" },
    { category: "study", icon: "号", title: "教务、校园网与邮箱", detail: "账号激活、初始密码、课表查询和网络连接教程。", meta: "教务 / 网络 / 邮箱" },
    { category: "study", icon: "馆", title: "图书馆与学习空间", detail: "入馆方式、开放时间、自习室和常用数据库入口。", meta: "图书馆 / 自习 / 数据库" },
    { category: "support", icon: "助", title: "绿色通道与学生资助", detail: "助学贷款、缓缴、奖助政策和负责部门联系方式。", meta: "资助 / 贷款 / 咨询" },
    { category: "support", icon: "SOS", title: "辅导员与紧急联系", detail: "学院值班、保卫处、心理支持及家长须知集中展示。", meta: "电话 / 值班 / 家长" }
  ],

  checklist: [
    { id: "id-card", group: "证件", text: "身份证与录取通知书" },
    { id: "photos", group: "证件", text: "学校要求规格的证件照" },
    { id: "official", group: "信息", text: "收藏迎新网、招生网和学院通知入口" },
    { id: "contacts", group: "信息", text: "保存招生办、辅导员或值班电话" },
    { id: "charger", group: "随身", text: "手机、充电器、充电宝与数据线" },
    { id: "medicine", group: "随身", text: "个人常用药、雨具和水杯" },
    { id: "route", group: "行程", text: "到校路线与一套备选方案" },
    { id: "family", group: "行程", text: "把到校时间与地址告知家人" }
  ],

  safetyCards: [
    { icon: "验", title: "缴费先验真", detail: "只使用录取通知书、学校官网或官方公众号公布的入口，不向私人账户转账。" },
    { icon: "锁", title: "验证码不给人", detail: "密码、短信验证码、身份证照片和银行卡信息不要交给陌生人代办。" },
    { icon: "停", title: "推销先暂停", detail: "电话卡、培训、兼职和宿舍用品不必现场决定，离开后核实清楚再购买。" }
  ],

  faqs: [
    { question: "报到日期和宿舍安排在哪里看？", answer: "优先查看录取通知书、学校迎新系统和学院官方通知。本页面负责整理行动方法，不替代学校正式安排。" },
    { question: "需要提前购买整套宿舍用品吗？", answer: "建议先确认床铺尺寸、宿舍配置和管理规定。证件、个人药品等必须品随身带，大件用品可到校观察后再决定。" },
    { question: "有人拉群、收费或推荐兼职怎么办？", answer: "先核实群主和收费主体是否为学校官方人员。任何要求向私人账户转账、索取验证码或抵押证件的情况都应立即停止。" },
    { question: "页面信息和学校通知不一致怎么办？", answer: "无条件以学校当年正式通知为准。页面可集中连接学校官方入口，并清楚标记信息更新时间。" },
    { question: "勾选的清单会上传个人信息吗？", answer: "不会。清单只保存在当前浏览器的本地存储中，换设备或清理浏览器数据后需要重新勾选。" }
  ],

  customizationModules: [
    { index: "01", tag: "迎新 / 报到", title: "迎新与新生报到网站", detail: "把录取后的通知、路线、材料、报到流程、宿舍安排和常见问题整理成一条清晰的行动路线。", examples: ["学院迎新", "新生报到", "入学指南"] },
    { index: "02", tag: "组织 / 服务", title: "学生会与学院服务网站", detail: "集中展示部门介绍、办事入口、活动通知、值班联系和长期服务内容，减少重复转发和咨询。", examples: ["学生会主页", "学院服务", "部门导航"] },
    { index: "03", tag: "招新 / 活动", title: "社团招新与校园活动网站", detail: "适合社团招新、校园节、比赛和专题活动，可加入分类筛选、日程、报名流程与场地说明。", examples: ["社团招新", "校园活动", "比赛专题"] },
    { index: "04", tag: "长期运营", title: "校园长期服务站", detail: "把地图、教务、报修、资助、医疗、咨询等高频入口长期维护在一个页面，并按需要继续扩展功能。", examples: ["校园导航", "服务目录", "长期更新"] }
  ],

  projectCases: [
    {
      level: "简单",
      type: "信息型单页",
      title: "简单版 · 新生报到卡",
      summary: "把迎新通知整理成手机上能迅速看完的一页指南，集中呈现日期、地点、流程、材料、问答与联系入口。",
      suitable: "适合资料较少、上线时间紧的学院、班级或活动",
      features: ["关键信息", "报到流程", "材料清单", "常见问答", "一键联系"],
      href: "showcase/basic.html?v=20260719-lite",
      tone: "basic"
    },
    {
      level: "标准",
      type: "互动活动站",
      title: "标准版 · 社团招新站",
      summary: "在完整信息展示上加入分类筛选、活动日程、场地说明、报名流程和常见问题，适合反复浏览与分享。",
      suitable: "适合社团招新、校园节、赛事和专题活动",
      features: ["分类筛选", "活动日程", "场地信息", "报名流程", "常见问答"],
      href: "showcase/standard.html?v=20260719-lite",
      tone: "standard"
    },
    {
      level: "进阶",
      type: "综合服务台",
      title: "进阶版 · 新生服务台",
      summary: "根据新生、家长和志愿者身份展示不同任务，整合进度、公告、服务入口、运营数据与后台扩展说明。",
      suitable: "适合信息量大、多人群、需要长期维护的项目",
      features: ["身份视图", "任务进度", "服务目录", "运营概览", "后台扩展"],
      href: "showcase/advanced.html?v=20260719-lite",
      tone: "advanced"
    }
  ],

  contact: {
    enabled: true,
    kicker: "需要一份属于你们的服务站？",
    title: "把校园信息做成学生真正愿意使用的网站",
    label: "联系作者定制",
    url: "contact.html?v=20260719-lite#methods"
  },

  legal: {
    disclaimer: "页面所示信息用于功能展示，学校项目中的关键信息以当年官方资料为准。",
    footerNote: "© 2026 校园服务站定制 · All Rights Reserved"
  }
};

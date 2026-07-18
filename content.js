window.SITE_DATA = {
  site: {
    id: "campus-launchpad-public-demo",
    contentVersion: "1",
    language: "zh-CN",
    title: "校园服务站｜手机优先的学生网站定制演示",
    description: "展示高校新生导航、阶段任务、行李清单、常见问答、官方入口等学生服务网站能力。",
    themeColor: "#123c3a",
    colors: {
      ink: "#17201f",
      brand: "#123c3a",
      accent: "#f26b4f",
      paper: "#f4f0e7"
    }
  },

  brand: {
    mark: "启",
    name: "校园服务站",
    subtitle: "Custom Demo",
    footerLine: "一份母版，按需求独立定制。"
  },

  hero: {
    edition: "高校学生服务网站 · 可定制演示",
    prefix: "把分散的资料",
    title: "变成学生随手能用的服务站",
    intro: "这是一个公开功能展示页：学校、学院、年份、颜色、流程、任务、清单、链接和联系方式都可以按客户资料替换。",
    primaryAction: "体验页面功能",
    arrivalDate: "手机 / 平板 / 电脑",
    campusAddress: "新生导航、校园服务、社团招新、活动指南",
    statusLabel: "交互功能已开启",
    updatedAt: "展示版 1.0",
    cardMessage: "勾选下方清单后，进度会保存在当前浏览器，不收集或上传个人信息。"
  },

  notice: {
    enabled: true,
    title: "这是公开演示站",
    text: "页面不对应任何真实学校；正式交付时将根据客户提供的官方资料、品牌与服务对象独立定制。"
  },

  quickLinks: [
    { icon: "路", title: "报到流程", description: "按真实顺序整理行动路线", url: "#roadmap" },
    { icon: "任", title: "阶段任务", description: "按时间切换不同任务", url: "#tasks" },
    { icon: "单", title: "互动清单", description: "本地保存勾选与进度", url: "#checklist" },
    { icon: "问", title: "常见问答", description: "集中回答高频问题", url: "#faq" }
  ],

  roadmapIntro: "下面以高校新生报到为例；正式版可替换为活动流程、办事流程或社团招新路径。",
  roadmap: [
    { time: "第一步", title: "核验客户资料", detail: "确认服务对象、年份、校区、官方通知、链接与素材授权。" },
    { time: "第二步", title: "整理行动结构", detail: "把分散信息转成流程、阶段任务、清单和常见问答。" },
    { time: "第三步", title: "完成品牌定制", detail: "替换名称、配色、文案、入口、联系方式与视觉细节。" },
    { time: "第四步", title: "多端检查上线", detail: "完成手机、平板、电脑测试后部署到客户自己的仓库。" }
  ],

  taskGroups: [
    {
      id: "before",
      label: "出发前",
      eyebrow: "BEFORE ARRIVAL",
      title: "先处理无法临时补办的事项",
      intro: "任务可以按客户业务拆成不同阶段，每个阶段提供明确的行动说明。",
      items: [
        { title: "核对官方通知", detail: "确认报到日期、校区、学院、宿舍和接站安排，保存通知截图。" },
        { title: "单独收好证件", detail: "身份证、录取通知书、证件照及学校要求材料放进随身包。" },
        { title: "规划到校路线", detail: "至少准备一套备选交通方案，并将预计到校时间告诉家人。" }
      ],
      tip: "正式版中的日期、收费、校区和联系方式都必须回到官方渠道核验。"
    },
    {
      id: "arrival",
      label: "报到日",
      eyebrow: "ARRIVAL DAY",
      title: "按学院指引行动，不跟陌生人走",
      intro: "同一套交互可以替换成活动当天、比赛当天或社团招新当天。",
      items: [
        { title: "确认迎新人员身份", detail: "优先寻找学校统一标识、学院帐篷或官方志愿者。" },
        { title: "核对领取材料", detail: "当场检查校园卡、宿舍钥匙、流程单等是否齐全。" },
        { title: "拒绝非官方收费", detail: "遇到推销、兼职或代缴费，先离开现场再向学校核实。" }
      ],
      tip: "安全提醒和免责声明会在正式交付中保留在显著位置。"
    },
    {
      id: "dorm",
      label: "住宿舍",
      eyebrow: "DORM LIFE",
      title: "先保证安全和基本生活，再慢慢添置",
      intro: "页面文字、任务数量和分类名称都可以按客户资料调整。",
      items: [
        { title: "检查床位与设施", detail: "记录损坏处并及时报修，确认床铺尺寸和用电规定。" },
        { title: "保管钥匙与贵重物品", detail: "离开宿舍随手锁门，证件和电子设备不要长期放在公共区域。" },
        { title: "约定共同生活规则", detail: "尽早沟通作息、卫生、空调和访客等容易产生分歧的事项。" }
      ],
      tip: "复杂内容会被压缩成适合手机阅读的短段落，而不是照搬通知全文。"
    },
    {
      id: "study",
      label: "开课前",
      eyebrow: "READY FOR CLASS",
      title: "把课表、教室和账号一次确认清楚",
      intro: "阶段切换不需要跳转新页面，适合手机现场快速查看。",
      items: [
        { title: "登录教务系统", detail: "检查课程、上课时间、校区和教室，处理初始密码。" },
        { title: "确认班级通知渠道", detail: "只保留经过辅导员或班助确认的正式群聊。" },
        { title: "提前走一遍路线", detail: "从宿舍到教学楼实地走一次，给早高峰预留时间。" }
      ],
      tip: "正式版可连接学校官网、迎新网、地图、公众号文章或客户指定入口。"
    }
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

  faqs: [
    { question: "这套页面只能用于高校迎新吗？", answer: "不是。页面结构也适合校园生活服务、社团招新、志愿活动、赛事指南和短期专题页，模块名称与内容均可替换。" },
    { question: "手机和电脑都能正常使用吗？", answer: "可以。页面按手机优先设计，同时适配平板与电脑；交付前会检查多种常见视口和关键交互。" },
    { question: "客户以后可以自己更新内容吗？", answer: "可以。内容集中存放在独立配置文件中，也可以购买后续更新和维护服务。" },
    { question: "能够增加登录、缴费或报名数据库吗？", answer: "当前演示版是轻量静态网站。登录、支付、后台数据库和复杂表单属于升级项目，需要单独评估安全、合规与服务器方案。" }
  ],

  officialLinks: [
    { title: "品牌与配色", note: "替换名称、色彩、标语与视觉风格", url: "#top" },
    { title: "内容与模块", note: "调整流程、任务、清单、FAQ 和入口", url: "#tasks" },
    { title: "独立部署", note: "为每位客户发布到自己的 GitHub 仓库", url: "https://github.com/CE0211" }
  ],

  contact: {
    enabled: true,
    kicker: "想做一份自己的版本？",
    title: "准备学校或活动资料，就可以开始定制",
    label: "联系制作方",
    url: "https://github.com/CE0211"
  },

  legal: {
    disclaimer: "本页仅用于展示网站能力，不对应任何真实学校，也不提供真实报到或缴费服务。",
    footerNote: "© 2026 校园服务站定制演示 · All Rights Reserved"
  }
};

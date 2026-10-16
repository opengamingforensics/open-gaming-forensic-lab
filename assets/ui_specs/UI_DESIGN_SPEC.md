# Mobile Dissection OS (移动视网膜解构视窗 / 赛博法医实验台)
## OGFL Visual & Audiovisual UI/UX Architecture Specification (2026)

---

### 0. 核心设计哲学与审美定位 (Core Philosophy & Aesthetic Manifesto)

> **"不要陈腐的复古 CRT 扫描线，不要廉价的 PPT 左右推拉，不要平庸的手机壳居中套画面。"**
> **"像 Jony Ive 设计硬件一样解构代码，像 Bloomberg Terminal 穿透资产一样穿透内购，像外科法医一样解剖多巴胺算法。"**

* **目标受众画像**：24–38 岁欧美科技从业者、资深软件工程师、量化交易员、设计总监与高智商硬核玩家。他们每天使用 Linear、Figma、Stripe、Bloomberg、Raycast、Apple Pro 工作流，对低质模版（Canva 模板、After Effects 粗糙套用预设）具有极高的认知免疫与审美洁癖。
* **视觉语言系统**：**"Forensic Minimalism & Industrial CAD Precision" (法医级极简主义与工业 CAD 精密制图)**。
  * **主基调（Acts 1–3: The Autopsy）**：深度深石墨黑（Deep Graphite `#08090C`）、高透磨砂亚克力、60fps 弹簧动力学（Spring Physics）、发光矢量线条（Laser Precision Stroke）、SF Mono / JetBrains Mono 极细等宽字体、冷白 `#F4F6F8` 与警报酸性红（Acid Crimson `#FF2A55`）/ 荧光青（Forensic Cyan `#00F0FF`）高反差。
  * **转折基调（Act 4: The Panacea）**：戏剧性呼吸反转为**温润有机纸本美学（Humanist Warm Wabi-Sabi & Architectural Paper `#F7F4EB`）**、日系森系原木绿与陶土红、衬线排版（Editorial New / Hiragino Mincho），在生理感知上瞬间释放前三幕积压的算法压迫感。

---

### 1. 核心模块规范详解 (Core Architectural Modules)

#### 1.1 真机多维动态透视（Device-Native Micro-Viewport）
* **16:9 画布下的多维实验台布局**：
  * **左侧 / 主体视窗（60% 画布面积）**：真机 60fps 动态捕获视窗。摒弃泛滥的带阴影手机壳贴图，采用纯 CSS/SVG 参数化渲染的 **Titanium Sub-millimeter Bezel（钛金属精密倒角边框）** 与 **OLED Display Sub-pixel Edge Glow（亚像素边缘漫射）**。
  * **触控微观采样（Capacitive Touch Pointer & Haptic Ripple）**：玩家每一次触控，在真机视窗内呈现基于 Hooke-Jeeves 弹簧力学的微观矢量光晕环（Elastic Radial Halo），伴随高精度 120Hz 坐标网格（$(X_t, Y_t)$ 实时微积分变化率）。
  * **动态元素跟踪 HUD（Dynamic Element Tracking HUD）**：
    * 类似外科手术导航系统的悬浮追踪游标，实时锁定游戏画面中的关键陷阱元素（例如：“限时 900% 礼包”按钮、“单抽 160 原石”抽卡启动器）。
    * 引线（Leader Lines）与 45° 倒角导轨无缝延伸至右侧遥测仪表板。
    * **实时遥测指标（Live Telemetry Badges）**：
      1. `Real-time Psychological Pricing`（实时心理定价算法）：将虚拟币（如 6480 钻）动态反折算为法币时薪或真实物理购买力（例如：`$99.99 = 4.8 hrs median US wage`）。
      2. `PRNG Pull Probability Decay Counter`（伪随机算法爆率衰减计数器）：基于马尔可夫链实时解算当前抽卡池的隐蔽软保底与硬保底区间。
      3. `Dark FOMO Hazard Index`（FOMO 倒计时危害指数）：分析倒计时字体颜色、脉冲抖动频率对多巴胺受体的刺激评级（Level 1-5 危害预警）。

#### 1.2 专利蓝图动态 CAD 解构（Patent CAD Blueprint Assembly）
* **彻底告别枯燥的 USPTO PDF 静态截图与低像素扫描件**！
* **工业级 CAD 拆解与动态矢量重构**：
  * 将 USPTO 专利文献（如 EA 动态难度调整专利 `US20160001182A1`、Activision 微交易匹配专利 `US20170259177A1`）的流程图、状态机网络、拓扑节点全面转化为**动态发光矢量蓝图**。
  * **CAD 视觉构成**：
    * **底板**：$0.5\text{px}$ 细度的极坐标或等距网格（Isometric Orthographic Grid `#12161F`）。
    * **图层爆炸拆解（Exploded Layer Assembly）**：通过 3D 透视角度变换，将专利的“数据收集层（Input Vectors）”、“行为建模层（Retention Predictor）”与“匹配操纵层（Predatory Matchmaker）”沿 Z 轴分离浮空。
    * **激光路径描边动画（Laser Stroke Vector Drawing）**：使用 SVG `stroke-dasharray` 配合 Remotion `interpolate`，算法节点依次点亮，伴随着高频微电信号音效（Micro-relay clicks）。
    * **法医级高亮扫描器（Forensic Laser Sweep）**：以冷白、警报酸性红对关键侵权索赔条款（Patent Claims）进行外科手术刀式的横向光标切除扫描。

#### 1.3 资金与多巴胺流向画布（Financial & Dopamine Flow Canvas）
* **Stripe / Bloomberg Terminal 级数据穿透拓扑**：
  * 清晰、无情地揭露“掠夺性手游”背后的资本与生理洗劫回路：
    1. **节点 1：玩家钱包 / 信用卡（Player Debt/Wallet）**：$99.99 瞬时流出。
    2. **节点 2：平台抽取 30% 苹果/谷歌税（Platform Toll: 30% cut）**：-$30.00 流入 Cupertino 库比蒂诺金库。
    3. **节点 3：UA 买量套利黑洞（User Acquisition Reinvestment Loop）**：60% 资金即刻注入 AppLovin / Unity / TikTok 算法竞价竞配。
    4. **节点 4：避税壳公司终局利润（Offshore Arbitrage Shell Co.）**：塞浦路斯 (Limassol) / 开曼群岛 / 维京群岛离岸账户截留利润。
  * **流向图动态机制**：
    * 采用高帧率有向无环图（Directed Acyclic Graph / Sankey Stream），数字流粒子以流体动力学沿导轨高速穿梭。
    * 实时跌落计数器（Currency Erosion Counter）与多巴胺波动指数（Dopamine Volatility Index）联动震荡。

#### 1.4 第四幕审美极性反转（The Panacea Aesthetic Shift）
* **从冷酷“算法尸检”到温润“良心艺术”的戏剧性生理救赎**：
  * 前三幕：深石墨冷黑、冷白高光、霓虹警报红、机械等宽字、严酷数据流——让观众在理性层面感受到工业算法对人性的冰冷榨取与沉重窒息感。
  * 第四幕切入点（The Turning Point）：
    * 当解剖完罪恶专利，画外音指向单机艺术神作（如《Balatro》、《Monument Valley》、《Silksong》）时，画面触发**呼吸式审美相变（Phase Inversion Transition）**。
    * **视觉相变参数**：
      * Background: `#08090C` (冷黑) $\rightarrow$ `#F7F4EB` (和纸暖米白，带微米级高密度纸质 Fiber Texture)。
      * Stroke/Border: `#1A2333` (硬质冷边) $\rightarrow$ `#D8D2C5` (柔和印刷线条)。
      * Text: `SF Mono` / `JetBrains Mono` $\rightarrow$ `Editorial New` / `Fraunces` / `Hiragino Mincho` (优雅人文衬线体)。
      * Primary Accent: `#FF2A55` (警报酸性红) $\rightarrow$ `#2E5A44` (高山松针绿) & `#B85D38` (京都陶土红)。
    * **听觉音响极性反转**：
      * 沉闷的电子亚低音（Sub-bass Drone）和微电开关音瞬间消散，转入清澈的木质键盘轻叩声、高透自然混响环境声与无压缩的室内原声乐器点缀，完成观众从精神压迫到审美释然的情感飞跃。

---

### 2. 设计规范标尺与参数系统 (Design Tokens & Math Ratios)

| Token 类目 | 前三幕：法医解构台 (Acts 1-3) | 第四幕：良心解药 (Act 4) | 单位 / 规格 |
| :--- | :--- | :--- | :--- |
| **Canvas Resolution** | 3840 × 2160 (4K UHD) / 1920 × 1080 | 3840 × 2160 / 1920 × 1080 | 60.000 fps |
| **Background Base** | `#08090C` (Graphite Noir) | `#F7F4EB` (Unbleached Archival Paper) | HEX sRGB Rec.709 |
| **Grid Lines** | `rgba(0, 240, 255, 0.08)` (Laser Cyan Grid) | `rgba(46, 90, 68, 0.07)` (Bookbinder Grid) | 0.5px - 1px stroke |
| **Primary Typography** | `SF Mono`, `JetBrains Mono`, `Geist Mono` | `Editorial New`, `Fraunces`, `Newsreader` | 400 Light / 600 SemiBold |
| **Accent Alarm** | `#FF2A55` (Acid Crimson, 0.98 Glow) | `#B85D38` (Terracotta Brick) | High Contrast Ratio > 7:1 |
| **Accent Metric** | `#00F0FF` (Forensic Electric Cyan) | `#2E5A44` (Alpine Pine Green) | Precise HUD indicators |
| **Spring Damping** | `mass: 1.0, damping: 28, stiffness: 220` | `mass: 1.2, damping: 36, stiffness: 140` | Remotion `spring()` |
| **Corner Radius** | `4px` - `8px` (Hard Chamfer) | `16px` - `24px` (Continuous Squircle) | Apple Squircle geometry |
| **Haptic Sound (Foley)** | 800Hz-2.4kHz Ceramic/Relay Micro-clicks | 120Hz-400Hz Felt Wooden/Paper Tactile | 48kHz 24-bit PCM Wav |

---

### 3. 组件工程化架构 (Component Architecture Tree)

```
/Users/kilvonwu/Documents/OpenGamingForensicLab/assets/ui_specs/
├── UI_DESIGN_SPEC.md                      <-- 本全套系统架构设计白皮书
└── remotion/
    ├── types.ts                           <-- 严格 TypeScript 物理与遥测接口
    ├── DeviceNativeMicroViewport.tsx      <-- 真机多维动态透视视窗 + HUD 追踪系统
    ├── PatentCADBlueprintAssembly.tsx     <-- 专利蓝图动态 CAD 解构装配系统
    ├── FinancialDopamineFlowCanvas.tsx    <-- Stripe/Bloomberg 级资本多巴胺流向拓扑
    ├── PanaceaAestheticShift.tsx          <-- 第四幕审美极性反转相变容器
    └── index.ts                           <-- 统一导出的 Remotion 根视窗编排套件
```

---

*版权规范与合规说明：本系统全套视觉元素采用 100% 程序化 CSS/SVG 矢量绘制与纯粹 OSINT 公开专利几何重构，零第三方受版权保护外壳贴图，完全符合 YouTube Fair Use 转化性创作准则与 Broadcast 4K 60fps 工业渲染标准。*

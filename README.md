# JINYU Textile 独立站 · 完整部署包

站点：Guangxi Jinyu Intelligent Manufacturing Technology Co., Ltd.
域名：www.jinyusmarttextile.com

---

## 一、目录结构

```
├─ index.html                       首页（Hero + 精选产品 + 分类 + 优势 + CTA）
├─ products/
│  ├─ index.html                    产品总分类页（Custom Bags / Promotional Event Products）
│  ├─ bag-styles/index.html         一级分类：Custom Bags（含二级分类筛选）
│  └─ promotional-event-styles/index.html  一级分类：Promotional Event Products（含二级分类筛选）
├─ product-detail.html              产品详情页（面包屑 + 规格 + 图片放大 + 相关产品）
├─ about.html                       关于我们
├─ contact.html                     联系我们（多个 WhatsApp / 邮箱 / 电话 / 微信卡片）
├─ privacy.html                     隐私政策（Cookie 说明）
├─ 404.html                         404 页面
├─ admin/
│  ├─ index.html                    CMS 后台入口（访问 域名/admin/）
│  └─ config.yml                    后台字段配置（产品、二级分类、联系方式）
├─ content/
│  ├─ products/index.json           产品数据（后台读写这个文件）
│  └─ settings/contact.json         联系方式数据（后台读写这个文件）
├─ assets/
│  ├─ css/site.css                  公共样式（导航、手机菜单、返回顶部）
│  ├─ js/ui.js                      公共脚本（手机菜单、返回顶部）
│  └─ images/                       图片（uploads/ 为后台上传目录）
├─ netlify.toml                     Netlify 构建与安全头配置
├─ robots.txt / sitemap.xml         SEO 文件
└─ google1b6f2852317f8bcd.html      Google Search Console 验证文件
```

---

## 二、部署到 Netlify（首次）

1. 把本文件夹内**全部文件**上传到 GitHub 仓库根目录（不要多套一层文件夹）。
2. Netlify → Add new site → Import an existing project → 选择该仓库。
3. 构建设置：Build command 留空，Publish directory 填 `.`（netlify.toml 已写好，通常自动识别）。
4. 部署完成后先访问 `xxx.netlify.app` 确认页面正常。
5. 绑定域名：Domain management → Add a domain → `jinyusmarttextile.com`。
6. 域名 DNS 使用 Netlify 的 4 条 NS（NameSilo 后台 NameServers 改成）：
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   保存后等待 30 分钟～4 小时，Netlify 自动签发 SSL。

---

## 三、开启后台 CMS（重点）

1. Netlify 站点 → Identity → Enable Identity。
2. Identity → Registration → 设为 **Invite only**。
3. Identity → Services → 开启 **Git Gateway**。
4. Identity → Invite users → 填写自己的邮箱，收到邮件后设置密码。
5. 访问 `https://www.jinyusmarttextile.com/admin/` 登录后台。

后台可编辑：
- **Products / 产品**：新增/修改产品，含一级分类、**二级分类（自由输入）**、图片、MOQ、材质。
- **Site Settings / 联系方式**：WhatsApp 可加多个（第 1 个为主号码）、邮箱、电话、多个微信号。

> 二级分类填写规则：名称保持一致（如都写 `Tote Bags`），分类页顶部会自动生成对应筛选按钮；留空则只出现在 All 里。

---

## 四、已内置的功能

1. 固定顶部导航 + 手机端汉堡菜单（全站统一）
2. 一级分类：Custom Bags / Promotional Event Products
3. 二级分类：后台自由输入，前端自动生成筛选按钮
4. 产品详情：面包屑导航、规格表、图片点击放大、同分类相关产品推荐
5. 全站返回顶部按钮
6. 首页产品自动同步 CMS：勾选「首页推荐」的固定展示，未勾选的按最新上传自动补齐，最多 8 款
6. 埋点：GA4 `G-7H5SFHC9FT`、Meta Pixel `3025464907789231`、Pinterest Tag `2613926838568`
7. WhatsApp 点击上报转化：GA4 `generate_lead`、Meta `Lead`、Pinterest `lead`
8. Cookie 同意弹窗（欧盟 IP 才弹，拒绝则不加载统计）
9. 联系方式全部由 `content/settings/contact.json` 驱动，后台改完自动全站生效
10. 404 页面、robots.txt、sitemap.xml、Netlify 安全响应头

---

## 五、日常维护提醒

- 新增产品：后台 Products → Add → 填名称/描述/图片/一级分类/二级分类 → Publish。发布后约 1 分钟自动上线，首页会按「最新上传优先」自动带出（最多 8 款）。
- 想让某几款固定占住首页：勾选「Show on Homepage / 首页推荐」，并在后台列表里拖动调整它们的先后顺序；勾选的产品永远排在未勾选的前面。
- 换主 WhatsApp：把目标号码拖到列表第一位（或调整顺序），全站按钮自动跟着变。
- 新增 WhatsApp：在 Contact Info 的 wa_list 点 + 号继续加，联系方式页会自动多出一张卡片。
- 图片建议：正方形，1000×1000 以上，jpg/png，单张 < 1MB，上传后自动进 `assets/images/uploads`。
- 不要手动改 `content/products/index.json` 里的 `slug`，改了会导致旧详情链接失效。

---

## 六、常见问题

**Q：后台打不开 / 登录报错**
A：确认 Identity 已开启、Git Gateway 已开启、当前邮箱已被 Invite，且部署分支是 `main`。

**Q：改了后台内容网站没变**
A：等 1～2 分钟（触发一次自动部署），强制刷新浏览器（Ctrl/Cmd + Shift + R）。

**Q：二级分类筛选按钮太多**
A：后台把同类产品的 subcategory 写成完全一样的文字即可合并。

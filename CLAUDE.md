# 编辑 bryan-uiux 仓库时的规矩

这里是 bryan-uiux skill 的源码。`~/.claude/skills/bryan-uiux` 是指向这里的软链接，改了立刻生效。

## 用户贴外面的 skill.md / 设计规范进来

1. **先找有没有**：对照 `SKILL.md` 的文件地图。已有的主题就合并进那个文件，不另开一份；确实是新主题才新建，放进对应文件夹（`core/` 每次都用、`recipes/` 交互配方、`visual/` 长什么样、`ux/` 体验和流程）。
2. **翻成本库写法**：中文大白话、表格、编号。不写 JSON、IF-THEN、Figma 规格。时长、曲线、spring 只用 `references/core/params.md`，新的几何数值标「起始值」。
3. **核对事实**：数字和规范对照官方文档（Apple HIG、Material、WCAG、MDN），查不到就不写死。原文有错就改，交付时告诉用户改了哪几处、为什么。跟现有规则冲突时（`animate` 的频率关、一屏只高亮 1 样、红色只给错误和危险操作）按现有规则改写。
4. **桌面和手机都要有**：每一条都写桌面视图和手机视图，平板有差别也写；Web 和 RN / Expo 的写法都给。
5. **挂上链接**：`SKILL.md` 文件地图加一行；需要的话加第零步路由和 description 触发词（description 不超过 1024 字符）。README 文件表、README 和 `install.sh` 里的文件数一起改。

## 改完自检

- 链接都能打开（没有输出才算过）：

  ```bash
  grep -rhoE 'references/[a-z]+/[a-z-]+\.md' SKILL.md README.md CLAUDE.md references | sort -u | while read f; do [ -f "$f" ] || echo "缺：$f"; done
  ```

- 配方数跟 description 写的一致。
- `screenshot/` 里的原图不删、不改名、不压缩。
- 用户没说就不 commit。

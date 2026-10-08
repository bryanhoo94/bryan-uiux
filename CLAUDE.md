# 编辑 bryan-uiux 仓库时的规矩

这里是 bryan-uiux skill 的源码。`~/.claude/skills/bryan-uiux` 是指向这里的软链接，改了立刻生效。

## 仓库里有两种文件

| | 本库自己写的 | 搬进来的开源内容 |
|---|---|---|
| 怎么认 | 第一行没有标记 | 第一行有一句「第三方开源内容」的标记 |
| 在哪 | `SKILL.md`、`README.md`，`references/core/`、`recipes/`、`ux/`、`visual/` 里的大部分文件 | `references/build/`、`references/review/`、`references/visual/new-page/`、`redesign/`、`finish/`，以及 `core/product-brief.md`、`core/design-doc.md`、`recipes/vocabulary.md`、`visual/pick-library.md` |
| 怎么写 | 按下面「用户贴外面的 skill.md」那 5 条 | 保持原文，不翻译、不改写风格。第一行的标记不删 |

搬进来的文件只在 4 种情况下改：

1. 时长、曲线、spring 跟 `references/core/params.md` 不一致 → 改成参数词典的值。
2. 跟现有规则冲突（频率关、一屏只高亮 1 样、红色只给错误和危险操作、桌面和手机都要有）→ 按现有规则改，或在旁边加一句说明。
3. 出现了外部作者、GitHub 账号、别的 skill 的名字 → 去掉，改成指向本库对应的文件。
4. 要读者去跑本库没有的程序 → 改成人工做法。唯一例外是 `references/visual/new-page/scripts/detect.mjs`，它是可选的，没有 Node 也能照清单人工过。

文件开头 `<!-- 目录:开始 -->` 到 `<!-- 目录:结束 -->` 之间的「本文件目录」是 `tools/toc.py` 生成的，不算改原文，自己写的和搬进来的文件都一样。别手改。

## 一件事只有一份说了算

同一件事不写两遍。每件事归哪份文件，以 `SKILL.md` 第零步的表和文末的文件地图为准。新内容要是跟某份已有文件管的是同一件事，就合并进那一份，别处只留一行指过去。

## 目录有三层，后两层是算出来的

| 层 | 在哪 | 回答什么 | 谁维护 |
|---|---|---|---|
| 1 | `SKILL.md` 的第零步和文件地图 | 这件事读哪份文件 | 手写 |
| 2 | `references/core/pick.md` 最后一节「全部配方」 | 用哪个配方，在哪份文件第几行 | `tools/toc.py` 从 7 份配方文件生成 |
| 3 | 每份超过 100 行的 md，大标题下面的「本文件目录」 | 这份文件里读哪一节，在第几行 | `tools/toc.py` 从标题生成 |

后两层不是另一份说法：要改就改标题，或者改配方的名字和「用在」那一行，再跑 `python3 tools/toc.py`。目录里的行号会跟着变，所以**改了任何一份 md 的行数都要重跑**（自检第 5 条会抓出来）。

## 正文里不出现别人的名字

外部作者、GitHub 账号、别的 skill 的名字，只允许出现在根目录的 `THIRD_PARTY_NOTICES.md`（开源许可证要求保留版权声明，所以集中放在那里）。npm 包、官方设计规范（Apple HIG、Material）、定律的名字照常写。

以后再搬开源内容进来：先确认许可证允许（MIT、Apache-2.0 这类）；在 `THIRD_PARTY_NOTICES.md` 加一节，写来源和许可证原文，并把新名字加进那里的「自检关键词」；文件第一行加标记。

## 用户贴外面的 skill.md / 设计规范进来

1. **先找有没有**：对照 `SKILL.md` 的文件地图。已有的主题就合并进那个文件，不另开一份；确实是新主题才新建，放进对应文件夹（`core/` 每次都用、`recipes/` 交互配方、`visual/` 长什么样、`ux/` 体验和流程、`build/` 怎么写动效、`review/` 评审动效）。
2. **翻成本库写法**：中文大白话、表格、编号。不写 JSON、IF-THEN、Figma 规格。时长、曲线、spring 只用 `references/core/params.md`，新的几何数值标「起始值」。
3. **核对事实**：数字和规范对照官方文档（Apple HIG、Material、WCAG、MDN），查不到就不写死。原文有错就改，交付时告诉用户改了哪几处、为什么。跟现有规则冲突时（频率关、一屏只高亮 1 样、红色只给错误和危险操作）按现有规则改写。
4. **桌面和手机都要有**：每一条都写桌面视图和手机视图，平板有差别也写；Web 和 RN / Expo 的写法都给。
5. **挂上链接**：`SKILL.md` 文件地图加一行；需要的话加第零步路由和 description 触发词（description 不超过 1024 字符）。README 文件表、README 和 `install.sh` 里的文件数一起改。最后跑 `python3 tools/toc.py` 更新目录。

用户要「原文搬进来」而不是改写时，走上面「搬进来的开源内容」那一套。

## 改完自检

五条都没有输出才算过。

- 链接都能打开：

  ```bash
  python3 - <<'PY'
  import re, os, glob
  ok = lambda f, p: os.path.exists(p) or os.path.exists(os.path.join(os.path.dirname(f), p))   # 从 skill 根目录算，或者从文件自己的位置算
  for f in ['SKILL.md', 'README.md', 'CLAUDE.md'] + glob.glob('references/**/*.md', recursive=True):
      t = open(f, encoding='utf-8').read()
      for m in re.finditer(r'\]\((?!https?:|#|mailto:)([^)#\s]+)(?:#[^)]*)?\)', t):
          if not ok(f, m.group(1)): print('缺：', f, '→', m.group(1))
      for m in re.finditer(r'`(references/[\w./-]+\.(?:md|mjs|html))`', t):
          if not ok(f, m.group(1)): print('缺：', f, '→', m.group(1))
  PY
  ```

- 正文里没有别人的名字：

  ```bash
  kw=$(grep -m1 '^自检关键词：' THIRD_PARTY_NOTICES.md | sed 's/^自检关键词：//')
  grep -rnEi "$kw" --include='*.md' --include='*.html' --include='*.mjs' --include='*.sh' --exclude=THIRD_PARTY_NOTICES.md .
  ```

- 曲线只有参数词典里的那几条（`recipes/effects.md` 和 `recipes/gsap.md` 是专门讲换算的，不查）：

  ```bash
  grep -rhoE 'cubic-bezier\([^)]*\)' --include='*.md' --exclude=effects.md --exclude=gsap.md references | tr -d ' ' | sed 's/(0\./(./; s/,0\./,./g' | sort | uniq -c | grep -vE '\(\.23,1,\.32,1\)|\(\.77,0,\.175,1\)|\(\.32,\.72,0,1\)'
  ```

- 数字对得上（配方数、文件数。加了配方或文件，`SKILL.md`、`README.md`、`install.sh` 里的数字要一起改）：

  ```bash
  python3 - <<'PY'
  import re, glob
  rd = lambda p: open(p, encoding='utf-8').read()
  sk, readme, inst = rd('SKILL.md'), rd('README.md'), rd('install.sh')
  cats = [('page', 'P', '页面级'), ('component', 'C', '组件'), ('chart', 'D', '图表控件'), ('gesture', 'G', '手势手感'),
          ('feedback', 'F', '控件反馈'), ('motion', 'M', '动效质感'), ('effects', 'E', '网页效果')]
  total = 0
  for f, L, name in cats:
      t = rd(f'references/recipes/{f}.md')
      n = len(re.findall(rf'^### {L}\d+ ', t, re.M)); total += n
      if f'（{L}1–{L}{n}）' not in t.split('\n')[0]: print(f'标题的范围不对：references/recipes/{f}.md，实际有 {n} 个')
      if not re.search(rf'{L}1–{L}{n}(?!\d)', sk): print(f'SKILL.md 文件地图：{name}应该是 {L}1–{L}{n}')
      if f'{name}（{n} 个）' not in readme: print(f'README 分类表：{name}应该是 {n} 个')
      if not re.search(rf'recipes/{f}\.md` \| [^|]*?{n} 个', readme): print(f'README 文件表：{f}.md 应该是 {n} 个')
  gifs = len(glob.glob('demo/**/*.gif', recursive=True))
  for where, text, want in [('SKILL.md description', sk, f'{total} 个交互配方'), ('README', readme, f'{total} 个小动作'),
                            ('README', readme, f'全部 {total} 个'), ('README', readme, f'剩下的 {total - gifs} 个')]:
      if want not in text: print(f'{where} 里应该写「{want}」')
  md = len(glob.glob('references/**/*.md', recursive=True)) + 1   # 加上 SKILL.md
  for where, text in [('README', readme), ('install.sh', inst)]:
      if f'{md} 个 md' not in text: print(f'{where} 里应该写「{md} 个 md」')
  PY
  ```

- 目录是最新的（过期就跑 `python3 tools/toc.py`，再检查一次）：

  ```bash
  python3 tools/toc.py --check
  ```

另外：

- `screenshot/` 里的原图不删、不改名、不压缩。
- 用户没说就不 commit。

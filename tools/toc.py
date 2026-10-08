#!/usr/bin/env python3
"""生成 bryan-uiux 的两种目录。目录是从文件自己的标题算出来的，别手改。

1. 本文件目录：references/ 下每份超过 100 行的 md，标题下面列出每一节在第几行。
2. 配方目录：references/core/pick.md 的「全部配方」，每个配方一行（用在哪、在哪份文件的第几行）。

在仓库根目录跑：
    python3 tools/toc.py           生成或更新
    python3 tools/toc.py --check   只检查，列出目录过期的文件，不改文件
"""
import glob
import re
import sys

MIN_LINES = 100      # 超过这么多行才加本文件目录
BIG_SECTION = 120    # 一节超过这么多行，就把它下一级的小标题也列出来
START, END = '<!-- 目录:开始', '<!-- 目录:结束 -->'
CAT_START, CAT_END = '<!-- 配方目录:开始', '<!-- 配方目录:结束 -->'
PICK = 'references/core/pick.md'
RECIPES = [('page', 'P', '页面级'), ('component', 'C', '组件'), ('chart', 'D', '图表控件'), ('gesture', 'G', '手势手感'),
           ('feedback', 'F', '控件反馈'), ('motion', 'M', '动效质感'), ('effects', 'E', '网页效果')]


def headings(lines):
    """[(行下标, 级别, 标题)]，代码块里的 # 不算。"""
    out, fence = [], None
    for i, line in enumerate(lines):
        m = re.match(r'^\s*(`{3,}|~{3,})', line)
        if m:
            fence = m.group(1)[0] if fence is None else (None if m.group(1)[0] == fence else fence)
            continue
        if fence:
            continue
        m = re.match(r'^(#{1,6})\s+(.*\S)', line)
        if m:
            out.append((i, len(m.group(1)), m.group(2).rstrip('#').strip()))
    return out


def section_end(lines, heads, k):
    """第 k 个标题那一节的最后一行（行下标，不含结尾的空行）。"""
    i, level, _ = heads[k]
    end = next((j for j, lv, _ in heads[k + 1:] if lv <= level), len(lines)) - 1
    while end > i and not lines[end].strip():
        end -= 1
    return end


def strip_toc(lines):
    """去掉已有的本文件目录，连同它后面的一个空行。"""
    for a, line in enumerate(lines):
        if line.startswith(START):
            b = next(j for j in range(a, len(lines)) if lines[j].strip() == END) + 1
            if b < len(lines) and lines[b] == '':
                b += 1
            return lines[:a] + lines[b:]
    return lines


def with_toc(lines):
    """给超过 MIN_LINES 行的文件加上（或更新）本文件目录。"""
    lines = strip_toc(lines)
    heads = headings(lines)
    title = next((k for k, (i, lv, _) in enumerate(heads) if lv == 1 and i < 20), None)
    subs = [lv for k, (_, lv, _) in enumerate(heads) if k != title and lv >= 2]
    top = next((lv for lv in (2, 3, 4) if subs.count(lv) >= 3), None)
    if len(lines) <= MIN_LINES or top is None:
        return lines

    listed = []
    for k, (_, lv, _) in enumerate(heads):
        if k == title:
            continue
        if lv <= top:
            listed.append(k)
        elif lv == top + 1:   # 上一级那一节太长，才把这一级也列出来
            parent = next((p for p in range(k - 1, -1, -1) if heads[p][1] < lv), None)
            if parent is not None and heads[parent][1] == top \
                    and section_end(lines, heads, parent) - heads[parent][0] > BIG_SECTION:
                listed.append(k)

    # 插在大标题下面；没有大标题就插在开头的标记和导航块后面
    if title is not None:
        at = heads[title][0] + 1
        lead = ['']
        if at < len(lines) and lines[at] == '':
            at, lead = at + 1, []
    else:
        at = 1 if lines[0].startswith('<!--') else 0
        while at < len(lines) and (lines[at] == '' or lines[at].startswith('>')):
            at += 1
        lead = [] if at == 0 or lines[at - 1] == '' else ['']

    added = len(lead) + len(listed) + 5   # 开始标记、说明、空行、每节一行、结束标记、空行
    num = lambda i: i + 1 + (added if i >= at else 0)
    base = max(2, min(heads[k][1] for k in listed))   # 文件里第二个大标题跟 ## 平级显示
    block = [f'{START}（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->',
             f'**本文件目录**（全文 {len(lines) + added} 行；先看这里，再按行号只读用得上的那一节）', '']
    for k in listed:
        i, lv, text = heads[k]
        block.append(f'{"  " * max(0, lv - base)}- 第 {num(i)}–{num(section_end(lines, heads, k))} 行：{text}')
    return lines[:at] + lead + block + [END, ''] + lines[at:]


def recipe_catalog(files):
    """从 7 份配方文件算出配方目录。files 是 {路径: 已经加好本文件目录的行}。"""
    out = []
    for name, letter, label in RECIPES:
        path = f'references/recipes/{name}.md'
        lines = files[path]
        heads = headings(lines)
        rows, first = [], None
        for k, (i, lv, text) in enumerate(heads):
            m = re.match(rf'({letter}\d+) (.+)', text)
            if lv != 3 or not m:
                continue
            first = i if first is None else first
            end = section_end(lines, heads, k)
            use = next((l.split('：', 1)[1] for l in lines[i:end + 1] if l.startswith('- **用在**：')), '')
            rows.append(f'| {m.group(1)} | {m.group(2)} | {use.replace("|", "/")} | {i + 1}–{end + 1} |')
        # 第一个配方前面的说明（这一类的共同规则）在第几行；只有一行「参数见 params.md」的不提
        toc_end = next((i for i, l in enumerate(lines) if l.strip() == END), 0)
        intro = [i for i in range(toc_end + 1, first) if lines[i].strip() and lines[i].strip() != '---']
        note = f'；第 {intro[0] + 1}–{intro[-1] + 1} 行是这一类的说明和共同规则，也要读' if len(intro) > 1 else ''
        out += [f'**{label} {letter}1–{letter}{len(rows)}**（`{path}`{note}）', '',
                '| 编号 | 名字 | 用在 | 第几行 |', '|---|---|---|---|'] + rows + ['']
    return out


def with_catalog(lines, catalog):
    a = next(i for i, l in enumerate(lines) if l.startswith(CAT_START))
    b = next(i for i, l in enumerate(lines) if l.strip() == CAT_END)
    return lines[:a + 1] + [''] + catalog + lines[b:]


def main():
    check = '--check' in sys.argv[1:]
    paths = sorted(glob.glob('references/**/*.md', recursive=True))
    old = {p: open(p, encoding='utf-8').read() for p in paths}
    body = {p: old[p].rstrip('\n').split('\n') for p in paths}
    new = {p: with_toc(body[p]) for p in paths if p != PICK}
    new[PICK] = with_toc(with_catalog(body[PICK], recipe_catalog(new)))

    stale = []
    for p in paths:
        text = '\n'.join(new[p]) + old[p][len(old[p].rstrip('\n')):]
        if text != old[p]:
            stale.append(p)
            if not check:
                open(p, 'w', encoding='utf-8').write(text)
    for p in stale:
        print(('目录过期（跑 python3 tools/toc.py）：' if check else '更新了：') + p)
    sys.exit(1 if check and stale else 0)


if __name__ == '__main__':
    main()

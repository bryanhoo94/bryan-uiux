#!/usr/bin/env bash
# 安装 bryan-uiux。所有内容都在这个仓库里，不需要再装别的 skill。
#
#   bash install.sh          看它打算做什么，确认后才动手
#   bash install.sh --yes    不问，直接装
#
# 它只会碰 ~/.claude/skills/bryan-uiux；电脑上有 Codex（有 ~/.codex）的话，再加 ~/.codex/skills/bryan-uiux。
# 不下载别的东西，不会给你的任何项目装 npm 包。
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
YES=0; [ "${1:-}" = "--yes" ] && YES=1

# Claude Code 一定装；有 Codex 就也装，两边链接到同一个文件夹，规矩只有一份
TARGETS=("${SKILLS_DIR:-$HOME/.claude/skills}")
CODEX_DIR="${CODEX_HOME:-$HOME/.codex}"
[ -d "$CODEX_DIR" ] && TARGETS+=("$CODEX_DIR/skills")

TODO=()
for d in "${TARGETS[@]}"; do
  if [ -e "$d/bryan-uiux" ]; then
    echo "已经装在 $d/bryan-uiux，不用再装。"
  else
    TODO+=("$d")
  fi
done

if [ "${#TODO[@]}" -eq 0 ]; then
  echo "要更新：在这个文件夹里 git pull 就行。"
  exit 0
fi

echo
echo "要做的事：把这个文件夹链接到"
for d in "${TODO[@]}"; do echo "         $d/bryan-uiux"; done
echo "         （126 个 md + 22 个示例网页 + 2 个物件模板 + 9 个实物图示例 + demo；只有实物图要 node）"
echo
echo "不会做的事：不下载别的东西；不给任何项目装 npm 包；不改你项目里的文件。"
echo

if [ "$YES" != 1 ]; then
  read -r -p "开始装吗？[y/N] " ans
  case "$ans" in y|Y|yes|YES) ;; *) echo "取消了。"; exit 0 ;; esac
fi

# 能做链接就做链接，这样改了仓库立刻生效；不行就整份复制
for d in "${TODO[@]}"; do
  mkdir -p "$d"
  ln -s "$HERE" "$d/bryan-uiux" 2>/dev/null || cp -r "$HERE" "$d/bryan-uiux"
  echo "✓ $d/bryan-uiux"
done

echo
echo "装完了。重开一个会话：Claude Code 里打 /bryan-uiux，Codex 里打 \$bryan-uiux。"
echo
echo "以前分开装过别的设计 skill 的话：它们的内容这里都有了，"
echo "两边同时留着会重复触发，建议把旧的从上面这几个 skills 文件夹里移走。"

#!/usr/bin/env bash
# 安装 bryan-uiux。所有内容都在这个仓库里，不需要再装别的 skill。
#
#   bash install.sh          看它打算做什么，确认后才动手
#   bash install.sh --yes    不问，直接装
#
# 它只会碰 ~/.claude/skills/bryan-uiux。不下载别的东西，不会给你的任何项目装 npm 包。
set -euo pipefail

SKILLS_DIR="${SKILLS_DIR:-$HOME/.claude/skills}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
YES=0; [ "${1:-}" = "--yes" ] && YES=1

echo "安装目录：$SKILLS_DIR"
echo

if [ -e "$SKILLS_DIR/bryan-uiux" ]; then
  echo "bryan-uiux 已经装了，不用再装。"
  echo "要更新：在这个文件夹里 git pull 就行。"
  exit 0
fi

echo "要做的事：把这个文件夹链接到 $SKILLS_DIR/bryan-uiux"
echo "         （106 个 md + 22 个示例网页 + demo，没有任何依赖）"
echo
echo "不会做的事：不下载别的东西；不给任何项目装 npm 包；不改你项目里的文件。"
echo

if [ "$YES" != 1 ]; then
  read -r -p "开始装吗？[y/N] " ans
  case "$ans" in y|Y|yes|YES) ;; *) echo "取消了。"; exit 0 ;; esac
fi

mkdir -p "$SKILLS_DIR"

# 能做链接就做链接，这样改了仓库立刻生效；不行就整份复制
ln -s "$HERE" "$SKILLS_DIR/bryan-uiux" 2>/dev/null || cp -r "$HERE" "$SKILLS_DIR/bryan-uiux"
echo "✓ bryan-uiux"

echo
echo "装完了。重开一个 Claude Code 会话，然后在项目里打 /bryan-uiux。"
echo
echo "以前分开装过别的设计 skill 的话：它们的内容这里都有了，"
echo "两边同时留着会重复触发，建议把旧的从 $SKILLS_DIR 移走。"

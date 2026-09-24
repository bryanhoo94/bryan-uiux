#!/usr/bin/env bash
# 安装 bryan-uiux，并把它会用到的配套 skill 一起装好。
#
#   bash install.sh          看它打算做什么，确认后才动手
#   bash install.sh --yes    不问，直接装
#
# 它只会碰 ~/.claude/skills/。不会给你的任何项目装 npm 包。
set -euo pipefail

SKILLS_DIR="${SKILLS_DIR:-$HOME/.claude/skills}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
YES=0; [ "${1:-}" = "--yes" ] && YES=1

# 名字|仓库|仓库里的路径
COMPANIONS=(
  "animate|https://github.com/emilkowalski/skills|skills/animate"
  "animate-expo|https://github.com/emilkowalski/skills|skills/animate-expo"
  "apple-design|https://github.com/emilkowalski/skills|skills/apple-design"
  "pick-ui-library|https://github.com/emilkowalski/skills|skills/pick-ui-library"
  "finesse-ui|https://github.com/mouse-lin/finesse-skill|skills/finesse-ui"
  "design-taste-frontend|https://github.com/Leonxlnx/taste-skill|skills/taste-skill"
)

need=(); have=()
for row in "${COMPANIONS[@]}"; do
  name="${row%%|*}"
  if [ -e "$SKILLS_DIR/$name" ]; then have+=("$name"); else need+=("$row"); fi
done

echo "安装目录：$SKILLS_DIR"
echo
echo "1. 装 bryan-uiux 本体（15 个 md + demo，没有任何依赖）"
[ -e "$SKILLS_DIR/bryan-uiux" ] && echo "   已经装了，跳过"
echo "2. 配套 skill："
[ ${#have[@]} -gt 0 ] && echo "   已有，跳过：${have[*]}"
if [ ${#need[@]} -gt 0 ]; then
  for row in "${need[@]}"; do echo "   要装：${row%%|*}  ←  $(echo "$row" | cut -d'|' -f2)"; done
else
  echo "   全都有了"
fi
echo "3. impeccable（收尾检查用）：它有自己的安装器，装法见最后提示"
echo
echo "不会做的事：不给任何项目装 npm 包；不改你项目里的文件。"
echo

if [ "$YES" != 1 ]; then
  read -r -p "开始装吗？[y/N] " ans
  case "$ans" in y|Y|yes|YES) ;; *) echo "取消了。"; exit 0 ;; esac
fi

mkdir -p "$SKILLS_DIR"

# 1. 本体：能做链接就做链接，这样改了仓库立刻生效
if [ ! -e "$SKILLS_DIR/bryan-uiux" ]; then
  ln -s "$HERE" "$SKILLS_DIR/bryan-uiux" 2>/dev/null || cp -r "$HERE" "$SKILLS_DIR/bryan-uiux"
  echo "✓ bryan-uiux"
fi

# 2. 配套 skill：从各自的上游取，保留它们的 LICENSE
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
for row in "${need[@]:-}"; do
  [ -z "$row" ] && continue
  name="${row%%|*}"; repo="$(echo "$row" | cut -d'|' -f2)"; path="$(echo "$row" | cut -d'|' -f3)"
  key="$(echo "$repo" | tr '/:.' '___')"
  [ -d "$tmp/$key" ] || git clone --depth 1 -q "$repo" "$tmp/$key" || { echo "✗ $name（clone 失败，跳过）"; continue; }
  if [ -d "$tmp/$key/$path" ]; then
    cp -r "$tmp/$key/$path" "$SKILLS_DIR/$name"
    [ -f "$tmp/$key/LICENSE" ] && [ ! -f "$SKILLS_DIR/$name/LICENSE" ] && cp "$tmp/$key/LICENSE" "$SKILLS_DIR/$name/LICENSE"
    printf 'source: %s (%s), installed %s\n' "$repo" "$path" "$(date +%F)" > "$SKILLS_DIR/$name/SOURCE.txt"
    echo "✓ $name"
  else
    echo "✗ $name（上游没有 $path，可能改结构了，跳过）"
  fi
done

echo
echo "装完了。重开一个 Claude Code 会话，然后在项目里打 /bryan-uiux。"
echo
echo "还想要的话，另外两个是可选的："
echo "  impeccable（收尾检查）：在项目根目录跑  npx impeccable install"
echo "  motion-design（动效意图）：本库自带数值，没有它也能用"

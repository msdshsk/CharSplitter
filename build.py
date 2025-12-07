#!/usr/bin/env python
"""
CharSplitter UXP Plugin Build Script
.ccx パッケージを生成します（不要ファイルを除外）
"""

import zipfile
import os
from pathlib import Path

# 除外するファイル/フォルダ
EXCLUDE = {
    '.git',
    '.gitignore',
    '.vscode',
    '.idea',
    '__pycache__',
    '.DS_Store',
    'Thumbs.db',
    'build.py',
    '*.ccx',
}

# 出力ファイル名
OUTPUT_NAME = 'CharSplitter.ccx'


def should_exclude(path: Path) -> bool:
    """除外対象かどうか判定"""
    for part in path.parts:
        if part in EXCLUDE:
            return True
        for pattern in EXCLUDE:
            if pattern.startswith('*') and part.endswith(pattern[1:]):
                return True
    return False


def build():
    script_dir = Path(__file__).parent
    output_path = script_dir / OUTPUT_NAME

    # 既存のccxを削除
    if output_path.exists():
        output_path.unlink()

    files_added = []

    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for file_path in script_dir.rglob('*'):
            if file_path.is_file():
                relative_path = file_path.relative_to(script_dir)

                if should_exclude(relative_path):
                    continue

                zf.write(file_path, relative_path)
                files_added.append(str(relative_path))

    print(f'CharSplitter.ccx を作成しました')
    print(f'含まれるファイル ({len(files_added)}):')
    for f in sorted(files_added):
        print(f'  - {f}')
    print(f'\nサイズ: {output_path.stat().st_size:,} bytes')


if __name__ == '__main__':
    build()

import unittest
from pathlib import Path
import sys

# 将根目录加入环境变量以便导入 main.py
sys.path.append(str(Path(__file__).parent.parent))
from main import run_smoke_test

class TestMiseryAndCo(unittest.TestCase):
    def test_smoke_check(self):
        """验证核心网页与资产完整性"""
        self.assertEqual(run_smoke_test(), 0)

    def test_index_html_content(self):
        """验证 index.html 存在且不为空"""
        index_path = Path(__file__).parent.parent / "index.html"
        self.assertTrue(index_path.exists())
        content = index_path.read_text(encoding="utf-8")
        self.assertTrue(len(content) > 0)

if __name__ == "__main__":
    unittest.main()

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 8000
ROOT_DIR = Path(__file__).parent.resolve()

class GameRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

def run_smoke_test() -> int:
    """检查核心游戏文件与资产是否存在（供 GitHub Actions / 命令行测试使用）"""
    required_files = ["index.html", "README.md", "storyboard.jpg", "workflow.jpg"]
    missing = [f for f in required_files if not (ROOT_DIR / f).exists()]
    if missing:
        print(f"[FAIL] Missing required files: {', '.join(missing)}")
        return 1
    print("[PASS] Misery & Co. smoke test passed successfully.")
    return 0

if __name__ == "__main__":
    if "--smoke-test" in sys.argv:
        sys.exit(run_smoke_test())

    os.chdir(ROOT_DIR)
    with socketserver.TCPServer(("", PORT), GameRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"Starting Misery & Co. at {url} (Press Ctrl+C to quit)")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

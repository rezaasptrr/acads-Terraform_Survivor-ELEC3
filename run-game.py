#!/usr/bin/env python3
"""
Terraform Survivor - Game Server
Serves from project root for correct paths
"""

import http.server
import socketserver
import os
import webbrowser
import time
import socket
from threading import Timer

PORT = 8000

class GameHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

def find_available_port(start_port=8000, max_attempts=10):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

def open_browser(port):
    """Open browser after a short delay"""
    time.sleep(1.5)
    webbrowser.open(f'http://localhost:{port}/src/frontend/standalone.html')

if __name__ == '__main__':
    # Make sure we're in the project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Find an available port
    available_port = find_available_port(PORT)
    if available_port is None:
        print("❌ ERROR: Could not find an available port!")
        print(f"   Tried ports {PORT} to {PORT + 9}")
        exit(1)
    
    PORT = available_port
    
    with socketserver.TCPServer(("", PORT), GameHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("🎮 TERRAFORM SURVIVOR - GAME SERVER")
        print("=" * 60)
        print(f"\n📡 Server running at: http://localhost:{PORT}")
        print(f"📂 Serving from: {os.getcwd()}")
        print(f"\n🎯 PLAY THE GAME:")
        print(f"   → http://localhost:{PORT}/src/frontend/standalone.html")
        print(f"\n⚙️  Settings & Testing: Press 'O' in-game")
        print(f"\n⏹️  Press Ctrl+C to stop")
        print("=" * 60)
        print("\n🌐 Opening game in browser...\n")
        
        # Open browser automatically
        Timer(1.5, open_browser, args=[PORT]).start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n" + "=" * 60)
            print("👋 Server stopped. Thanks for playing!")
            print("=" * 60)

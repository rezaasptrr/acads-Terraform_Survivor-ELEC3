#!/usr/bin/env python3
"""
Simple HTTP server for testing Terraform Survivor locally.
Serves files with proper MIME types for ES6 modules.

Usage:
    python server.py
    
Then open: http://localhost:8000
"""

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # Ensure .js files are served with correct MIME type
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Terraform Survivor Server")
        print(f"📡 Serving at: http://localhost:{PORT}")
        print(f"📂 Directory: {os.getcwd()}")
        print(f"\n🎮 Open these URLs:")
        print(f"   Modular version:    http://localhost:{PORT}/index.html")
        print(f"   Standalone version: http://localhost:{PORT}/standalone.html")
        print(f"   Test page:          http://localhost:{PORT}/test.html")
        print(f"\n⏹️  Press Ctrl+C to stop\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")

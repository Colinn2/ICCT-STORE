#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import mysql.connector
from urllib.parse import urlparse, parse_qs
import sys

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'icct_store',
    'unix_socket': '/var/run/mysqld/mysqld.sock'
}

class APIHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        # Parse URL
        parsed_url = urlparse(self.path)
        params = parse_qs(parsed_url.query)
        
        # Get action and category
        action = params.get('action', [''])[0]
        category = params.get('category', [''])[0]
        
        # Handle different actions
        if action == 'categories':
            self.handle_categories()
        elif action == 'products':
            self.handle_products(category)
        else:
            self.send_error_response('Invalid action')
    
    def handle_categories(self):
        try:
            conn = mysql.connector.connect(**DB_CONFIG)
            cursor = conn.cursor(dictionary=True)
            
            cursor.execute("SELECT id, name, slug, description FROM categories ORDER BY id")
            categories = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            self.send_json_response({'success': True, 'data': categories})
        except Exception as e:
            self.send_error_response(str(e))
    
    def handle_products(self, category_slug):
        try:
            conn = mysql.connector.connect(**DB_CONFIG)
            cursor = conn.cursor(dictionary=True)
            
            if category_slug and category_slug != 'all-products':
                sql = """SELECT p.*, c.name as category_name, c.slug as category_slug 
                        FROM products p 
                        JOIN categories c ON p.category_id = c.id 
                        WHERE c.slug = %s AND p.is_active = 1 
                        ORDER BY p.name"""
                cursor.execute(sql, (category_slug,))
            else:
                sql = """SELECT p.*, c.name as category_name, c.slug as category_slug 
                        FROM products p 
                        JOIN categories c ON p.category_id = c.id 
                        WHERE p.is_active = 1 
                        ORDER BY c.id, p.name"""
                cursor.execute(sql)
            
            products = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            self.send_json_response({'success': True, 'data': products})
        except Exception as e:
            self.send_error_response(str(e))
    
    def send_json_response(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode())
    
    def send_error_response(self, error):
        self.send_response(500)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'success': False, 'error': error}).encode())
    
    def log_message(self, format, *args):
        # Suppress default logging
        pass

if __name__ == '__main__':
    PORT = 8080
    # Bind to 0.0.0.0 to allow external access (for GitHub Codespaces)
    server = HTTPServer(('0.0.0.0', PORT), APIHandler)
    print(f'✅ Python API Server running on http://0.0.0.0:{PORT}')
    print('✅ Ready to serve product data from MySQL')
    print('✅ Accessible from GitHub Codespaces')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n👋 Server stopped')
        sys.exit(0)

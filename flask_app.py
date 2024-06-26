from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("main.html")


@app.route("/checkout", methods=['POST'])
def checkout():
    data = request.get_json()  # Get the JSON data from the request
    print(f"{data = }")
    try:
        data = request.get_json()  # Get the JSON data from the request
        print(f"{data = }")
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400
        
        print(data)
        
        # Calculate total (example logic, modify as needed)
        total = sum(item['price'] * item['quantity'] for item in data['items'])
        
        return jsonify({"message": f"We have received {data}", "total": total}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)

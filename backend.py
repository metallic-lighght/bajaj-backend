from flask import Flask, request, jsonify

app = Flask(__name__)

# Helper function to extract the highest lowercase alphabet
def get_highest_lowercase(alphabets):
    lowercase_letters = [ch for ch in alphabets if ch.islower()]
    if lowercase_letters:
        return max(lowercase_letters)
    return None

# POST endpoint with exception handling
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        # Extract user input from the request
        full_name = request.json.get('full_name')
        dob = request.json.get('dob')
        email = request.json.get('email')
        roll_number = request.json.get('roll_number')
        data = request.json.get('data', [])

        # Validate required fields
        if not all([full_name, dob, email, roll_number]):
            raise ValueError("Missing required fields")

        # Create user_id in the required format
        user_id = f"{full_name.replace(' ', '_')}_{dob}"

        # Filter numbers and alphabets from the input data
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        
        # Find the highest lowercase alphabet
        highest_lowercase = get_highest_lowercase(alphabets)

        # Construct the response
        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }

        return jsonify(response)

    except ValueError as ve:
        # Handle missing fields or invalid input
        return jsonify({
            "is_success": False,
            "message": str(ve)
        }), 400

    except Exception as e:
        # Handle any other exceptions
        return jsonify({
            "is_success": False,
            "message": "An error occurred while processing the request.",
            "error": str(e)
        }), 500

# GET endpoint with exception handling
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    try:
        response = {
            "operation_code": 1
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({
            "is_success": False,
            "message": "An error occurred while processing the request.",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
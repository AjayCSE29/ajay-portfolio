from flask import Flask, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder='.', static_url_path='')


@app.route('/')
def index():
    # Serve the main index.html
    return send_from_directory('.', 'index.html')


@app.route('/<path:filename>')
def static_files(filename):
    # Serve static assets (css, js, resume.pdf, images, etc.)
    if os.path.exists(os.path.join('.', filename)):
        return send_from_directory('.', filename)
    return ('', 404)


@app.route('/contact', methods=['POST'])
def contact():
    # Accept JSON payload from frontend contact form
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({'message': 'Invalid payload'}), 400

    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    # Basic validation
    if not all([name, email, subject, message]):
        return jsonify({'message': 'Please fill in all fields.'}), 400

    # For this simple demo, we'll log to the console.
    # In production you would send an email, store to a DB, or integrate with a 3rd-party service.
    app.logger.info('Contact form received: Name=%s Email=%s Subject=%s', name, email, subject)
    app.logger.info('Message: %s', message)

    return jsonify({'message': 'Thank you! Your message was received.'}), 200


if __name__ == '__main__':
    # Run on port 5000 as requested, accessible on all interfaces for testing
    app.run(host='0.0.0.0', port=5000, debug=True)

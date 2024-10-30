from flask import Flask, jsonify, request, render_template
from network_model import shortest_influence_path, social_network

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# API route to get shortest path
@app.route('/api/shortest_path', methods=['GET'])
def get_shortest_path():
    source = request.args.get('source')
    target = request.args.get('target')
    result = shortest_influence_path(source, target)
    return jsonify(result)

# API route to get network data for visualization
@app.route('/api/network', methods=['GET'])
def get_network():
    nodes = [{"id": n} for n in social_network.nodes]
    links = [{"source": u, "target": v, "weight": d["weight"]} for u, v, d in social_network.edges(data=True)]
    return jsonify({"nodes": nodes, "links": links})

if __name__ == '__main__':
    app.run(debug=True)

import networkx as nx

# Initialize the social network graph
social_network = nx.Graph()

# Add nodes and edges with weights (strength of influence)
social_network.add_edge("Alice", "Bob", weight=2.5)
social_network.add_edge("Bob", "Charlie", weight=1.5)
social_network.add_edge("Alice", "Charlie", weight=3.0)

# Function to find shortest influence path
def shortest_influence_path(source, target):
    try:
        path = nx.dijkstra_path(social_network, source=source, target=target, weight='weight')
        length = nx.dijkstra_path_length(social_network, source=source, target=target, weight='weight')
        return {"path": path, "length": length}
    except nx.NetworkXNoPath:
        return {"path": None, "length": float('inf')}

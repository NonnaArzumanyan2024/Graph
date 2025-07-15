/*
1971. Find if Path Exists in Graph - Easy

There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
You want to determine if there is a valid path that exists from vertex source to vertex destination.
Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.
 

Constraints:
1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.

Time Complexity: O(V + E) — where V is the number of vertices and E is the number of edges
Space Complexity: O(V + E) — for the adjacency list and visited set
*/



var validPath = function(n, edges, source, destination) {
    // Step 1: Create an adjacency list to represent the graph
    const graph = new Map();

    // Step 2: Create a Set to track visited nodes and prevent cycles
    const visited = new Set();

    // Step 3: Initialize adjacency list with empty arrays for each node
    for (let i = 0; i < n; ++i) {
        graph.set(i, []);
    }

    // Step 4: Fill adjacency list with edges (since the graph is undirected)
    for (let [u, v] of edges) {
        graph.get(u).push(v); // Add v as a neighbor of u
        graph.get(v).push(u); // Add u as a neighbor of v
    }

    
    // Step 5: Define DFS function to explore the graph
    const dfs = (node) => {
        // Base case: If we reach the destination, return true
        if (node === destination) return true;

        // Mark the current node as visited
        visited.add(node);

        // Explore all neighbors of the current node
        for (let neighbor of graph.get(node)) {
            // If the neighbor has not been visited
            if (!visited.has(neighbor)) {
                // Recursively call DFS on the neighbor
                if (dfs(neighbor)) return true; // If path is found, return true immediately
            }
        }

        // If no path is found through any neighbor, return false
        return false; 
    };


    // Step 6: Start DFS from the source node
    return dfs(source);
};
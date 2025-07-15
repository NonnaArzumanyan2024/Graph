
/*
695. Max Area of Island - Medium

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Example: 1
Input:
grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6

Example 2:
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.

Time Complexity: O(m × n)
  - We visit each cell at most once during DFS.
Space Complexity: O(m × n)
  - In the worst case, the recursion stack can be as deep as the number of land cells.
*/



var maxAreaOfIsland = function(grid) {
    // Edge case: empty grid
    if (!grid || !grid.length) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0; // stores the maximum island area found

    /**
     * Depth-First Search function to explore an island from grid[r][c].
     * Marks visited land cells by setting them to 0 to avoid revisiting.
     * Returns the area of the current island being explored.
     */
    const dfs = (r, c) => {
        // Check for out-of-bounds or water cell
        if (r < 0 || c < 0 || r >= rows || c >= cols) return 0;
        if (grid[r][c] === 0) return 0;

        // Mark the cell as visited (set to 0)
        grid[r][c] = 0;

        // Recursively check all 4 directions and sum up the area
        return 1
            + dfs(r - 1, c) // up
            + dfs(r + 1, c) // down
            + dfs(r, c - 1) // left
            + dfs(r, c + 1); // right
    };

    // Traverse every cell in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // If we find land, start a DFS to compute island area
            if (grid[i][j] === 1) {
                const area = dfs(i, j);
                // Update maxArea if this island is larger
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    // Return the largest island area found
    return maxArea;
};

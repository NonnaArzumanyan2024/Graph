/*
200. Number of Islands - Medium

Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

Time Complexity: O(m * n) – each cell is visited once
Space Complexity: O(m * n) – in worst case, DFS call stack can go as deep as the number of land cells
*/



var numIslands = function(grid) {
    // Edge case: if grid is empty or invalid, return 0
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0; // total number of islands found

    /*
    Depth-First Search helper function to explore and mark all land ('1')
    cells connected to grid[r][c] as visited by converting them to '0'
    (in-place modification).
    */
    const dfs = (r, c) => {
        // if out of bounds, return
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;

        // if current cell is water or already visited, return
        if (grid[r][c] === '0') return;

        // mark current land cell as visited
        grid[r][c] = '0';

        // Recursively visit all adjacent (up, down, left, right) land cells
        dfs(r - 1, c); // up
        dfs(r + 1, c); // down
        dfs(r, c - 1); // left
        dfs(r, c + 1); // right
    };

    // Traverse the entire grid
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            // If current cell is land, we found a new island
            if (grid[i][j] === '1') {
                ++count;      // Increment island counter
                dfs(i, j);    // Start DFS to mark entire island as visited
            }
        }
    }

    // Return total number of islands found
    return count;
};
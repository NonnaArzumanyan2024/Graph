/*
2658. Maximum Number of Fish in a Grid - Medium

You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:
A land cell if grid[r][c] = 0, or
A water cell containing grid[r][c] fish, if grid[r][c] > 0.
A fisher can start at any water cell (r, c) and can do the following operations any number of times:
Catch all the fish at cell (r, c), or
Move to any adjacent water cell.
Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

Example 1:
Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.

Example 2:
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish. 
 

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 10
0 <= grid[i][j] <= 10

Time Complexity: O(m × n)
Space Complexity: O(m × n) (due to recursion stack)
*/



var getMaximumFish = function(grid) {
    // Edge case: if grid is null or empty, return 0
    if (!grid || !grid.length) return 0;

    // Number of rows and columns in the grid
    const rows = grid.length;
    const cols = grid[0].length;

    // Variable to store the maximum fish caught from any connected region
    let maxFish = 0;

    /*
    Depth-First Search function to explore connected water cells.
    It collects all fish in the current region by:
    - Visiting a water cell with fish
    - Catching all fish at that cell
    - Recursively exploring all 4 adjacent directions
    - Marking visited cells by setting them to 0 (no fish)
    */
    const dfs = (r, c) => {
        // If cell is out of bounds, return 0
        if (r < 0 || c < 0 || r >= rows || c >= cols) return 0;

        // If cell is land (0 fish) or already visited, return 0
        if (grid[r][c] === 0) return 0;

        // Catch the fish in this cell
        let total = grid[r][c];

        // Mark the cell as visited by setting fish count to 0
        grid[r][c] = 0;

        // Recursively visit all 4 adjacent cells
        total += dfs(r - 1, c); // up
        total += dfs(r + 1, c); // down
        total += dfs(r, c - 1); // left
        total += dfs(r, c + 1); // right

        // Return total fish collected from this region
        return total;
    };

    // Traverse each cell in the grid
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            // If the current cell contains fish (> 0), start a DFS
            if (grid[i][j] > 0) {
                // Get total fish in this connected region
                const fish = dfs(i, j);

                // Update maxFish if this region has more fish
                maxFish = Math.max(maxFish, fish);
            }
        }
    }

    // Return the maximum fish that can be caught from any region
    return maxFish;
};


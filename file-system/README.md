# Problem
- Design a file system to support file, directory and symbolic link
- Support special `ls` feature to list out all directory and files recursively
- Display child of directory with tab space to right
- Look into `initial-design.js` to understand the basic code
- Rewrite to apply design pattern
- Highlight the issues with the initial design

# Solution
Following are problems with initial given design
- `Directory` can contains both `Directory` and `File` therefore while iterating `children` it is complicated as need to check the class of child before calling `ls` function
- To solve this problem, let's use interface as `Node` and let both `Directory` and `File` to implement it.
- This makes `Directory` class to simply calls `child.ls()`

# Design pattern used
- Composite design pattern
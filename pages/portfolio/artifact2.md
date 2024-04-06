---
title: ABC University Hash Table Implementation with Rust
date: 2024/3/26
description: Category Two Artifact of the SNHU CS Portfolio
tag: data structures, rust, hash table
author: You
---

[**Portfolio**](/portfolio) | [**Home**](/) | [**About**](/about) | [**Posts**](/posts)

[**Previous: Software Engineering and Design**](/portfolio/artifact1) | [**Next: Databases**](/portfolio/artifact3)

---

## Development Narrative

[**Link to Github Repository**](https://github.com/gurulantern/abcu-rust)

For the second artifact, I have chosen a hash table implementation to organize and store course information for an office of academic advising. We were asked to choose an appropriate data structure for this task in CS 300. I chose the hash table data structure because most algorithms used to handle the data have a worst-case O(n) time complexity when it comes to checking each node in a linked list. Here are the following time complexities for the functions used by the hash table:

### Insert 
#### Time Complexity
- O(n) in the worst case (n is the length of linked list)
```rust
/// Inserts a course into the hash table
pub fn insert(&mut self, course: Course) {
    // Get the hash value of the course number
    let key = self.hash(&course.course_number);
    // Create a new node with the course and key
    let node = Node::new(course, key);
    // Print the key value
    match node.key {
        key_value => {
            // Use the key value here
            println!("Node key: {}", key_value.to_string());
        }
    }

    // Insert the node into the hash table
    // Time complexity: O(n) in the worst case (n: length of linked list)
    match &mut self.nodes[key] {
        // If the node is already in the hash table, insert it after the last node
        Some(n) => {
            let mut current = n;
            while let Some(ref mut next_node) = current.next {
                current = next_node;
            }
            current.next = Some(Box::new(node));
        }
        // If the node is not in the hash table, insert it at the head of the linked list
        None => {
            self.nodes[key] = Some(node);
        }
    }
}
```
| Pseudocode                                             | Line Cost | # Times Executes | Total Cost |
|--------------------------------------------------|-----------|------------------|------------|
| Get the hash value of the course number         |     1     |        1         |      1     |
| Create a new node with the course and key       |     1     |        1         |      1     |
| Print the key value                              |     1     |        1         |      1     |
| Use the key value here                           |     1     |        1         |      1     |
| Insert the node into the hash table              |     1     |        1         |      1     |
| If the node is already in the hash table        |     1     |        1         |      1     |
| If the node is not in the hash table            |     1     |        1         |      1     |
| Set the current node to the head of the linked list |     1     |        1         |      1     |
| While loop until there is no next node          |     1     |     n       |     n |
| Set the next node                               |     1     |     1     |  1  |
| Total Cost                                      |   n + 9      |
| Runtime                                         |   O(n)     |

### Search
#### Time Complexity
- O(n) in the worst case (n is the length of linked list)

```rust
/// Searches for a course in the hash table
pub fn search(&self, course_number: &str) -> Option<Course> {
    let key = self.hash(course_number);

    // If the node is in the hash table, search for the course
    if let Some(node) = &self.nodes[key] {
        let mut current = node;
        // Iterate through the linked list and search for the course
        // Time complexity: O(n) where n is the number of courses in linked list
        while let Some(ref next_node) = &current.next {
            // If the course is found, return it
            if next_node.course.course_number == course_number {
                return Some(next_node.course.clone());
            }
            // If the course is not found, move to the next node in the linked list
            current = next_node;
        }
    }
    // If the course is not in the hash table, return None
    None
}
```

| Pseudocode                                                                      | Line Cost | # Times Executes | Total Cost |
|---------------------------------------------------------------------------|-----------|------------------|------------|
| Get the hash value of the course number                                  |     1     |        1         |      1     |
| If the node is in the hash table, search for the course                  |     1     |        1         |      1     |
| Set the current node to the head of the linked list                      |     1     |        1         |      1     |
| While loop                                                                |     1     |      n      |   n   |
| If the course is found, return it                                         |     1     |        1         |      1     |
| If the course is not found, move to the next node in the linked list     |     1     |     n     |  n  |
| If the course is not in the hash table, return None                       |     1     |        1         |      1     |
| Total Cost                                                                |     2n + 5     |
| Runtime                                                                   |   O(n)    |

### Print All
#### Time Complexity
- O(n log n) for sorting the courses as documented in the Rust documentation (n is the amount of courses in the table)

```rust
 /// Prints all courses in the hash table and their prerequisites
pub fn print_all(&self) {
    // Initialize a vector to store all courses
    let mut all_courses = Vec::new();
    // Iterate through the nodes and add all courses to the vector
    // Time complexity: O(n) where n is the number of nodes in the hash table
    for node in &self.nodes {
        if let Some(n) = node {
            all_courses.push(&n.course);
            let mut current = &n.next;
            // Iterate through the linked list and add all courses to the vector
            while let Some(ref next_node) = current {
                all_courses.push(&next_node.course);
                current = &next_node.next;
            }
        }
    }

    // Sort the vector by course number
    // Time complexity: O(n log n) where n is the number of courses
    all_courses.sort_by(|a, b| a.course_number.cmp(&b.course_number));

    // Print all courses and their prerequisites
    // Time complexity: O(n) where n is the number of courses
    for course in all_courses {
        println!(
            "{} | {} | Prerequisites: {}",
            course.course_number,
            course.name,
            course
                .prerequisites
                .iter()
                .map(|prereq| prereq.as_str())
                .collect::<Vec<_>>()
                .join(", ")
        );
    }
}
```

The most complex operation we use in this implementation is the printAll function which uses Rust’s sort function to Merge Sort the courses by course number. This function’s time complexity grows in proportion to the size of the data stored in the table. This is relatively efficient compared to other sorting algorithms like Bubble Sort or Selection Sort with O(n^2) time complexity. This approach is also acceptable as the number of courses available to a certain degree at a university won’t breach into higher quantities where the performance of the algorithm will suffer. 

To implement the hash table, I made a class that defined a vector of nodes and a struct that defined the nodes themselves to contain an instance of a course class and a pointer that references the next node in the linked list.  Whenever a course is added to the hash table, an index key is calculated by a hash function and the course is added to the vector at the index whether as a head of a linked list or as the next node in the linked list.

To improve the artifact, I ported the program from C++ over to the Rust Programming Language. Rust’s syntax is similar to C++ while including the guarantees of memory safety, type safety, and lack of data races. Recently, the White House has even put out a [press release](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/ ) in support of an industry-wide move toward memory safe languages like Rust over languages like C++. Using this enhancement as a chance to learn more about Rust was a great opportunity to future proof my skills and get closer to my goal of making games using the Bevy game framework which uses Rust.  

Porting the C++ hash table implementation to Rust also showcases my understanding of the data structure at the center of this program. Rust has a HashMap struct that can solve this problem and may be a better choice in terms of safety but developing the hash table itself using Rust’s struct and impl design does a better job demonstrating my ability to design and evaluate computing solutions using algorithmic principles using this new syntax. 

Most of my challenges came in the form of learning the new syntax, which words to use and how it all fit together. The design of the program is almost identical to the C++ program. It defines the course, node, and hash table as structs and then declares how these structs should be implemented with fn definitions, Rust’s functions. 

To ensure that this implementation was more memory safe, I researched the `Box<>` struct which is a pointer type I used to replicate the node pointers. I learned that this pointer type allocates memory to the heap which is usually slower than storing to the stack, but due to Rust’s ownership system, there is only ever one owner for any piece of this heap-allocated memory. It is also managed through Rust lifetimes which ensures that the references only last as long as the data they refer to exists. 

These features avoid issues with dangling pointers or null pointer dereferences. So just by designing the program in Rust, it has already gained a new level of security. I have more to learn about Rust but this artifact really sold me on how powerful this language could be in developing safe and secure programs.

### Outcomes Achieved

**Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices.**

- Implementing the Hash Table data structure in Rust demonstrates my algorithmic understanding. Porting over to Rust from C++ required an understanding of the C++ implementation so that it could be properly handled in Rust. This hash table has a time complexity of O(n) in the worst case.

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

- Rust has gained a lot of adoption over the years and it is still evolving. To keep up in the computer science field, we must continue to learn new tools and expand our understanding of the field itself. There have been many major cyberattacks in the past few years and many of them can be attributed to unsafe memory management. Learning this new language demonstrates my ability to use these innovative technologies to accomplish the industry-wide goal of creating secure and safe software.   

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

- Learning Rust for development is a step towards mitigating design flaws and enhancing the security of the project. Rust’s built in features which include the lifetime system and ownership system ensure that programs built in Rust are memory safe.  Memory safety is a leading cause of security vulnerabilities and programming languages like C/C++ require developers to manually manage memory safely. Rust handles this for us as the compiler will throw errors for any unsafe uses of memory.

[**Link to Github Repository**](https://github.com/gurulantern/abcu-rust)

---


[**Previous: Software Engineering and Design**](/portfolio/artifact1) | [**Next: Databases**](/portfolio/artifact3)
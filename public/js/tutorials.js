// Tutorial content for all languages - Enhanced W3Schools Style
const tutorials = {
    html: {
        title: "HTML Tutorial",
        content: `
            <h2>HTML Tutorial</h2>
            <p><strong>HTML</strong> (HyperText Markup Language) is the standard markup language for creating Web pages.</p>
            
            <h3>What is HTML?</h3>
            <ul>
                <li>HTML stands for Hyper Text Markup Language</li>
                <li>HTML is the standard markup language for creating Web pages</li>
                <li>HTML describes the structure of a Web page</li>
                <li>HTML consists of a series of elements</li>
                <li>HTML elements tell the browser how to display the content</li>
            </ul>

            <h3>HTML Syntax</h3>
            <p>An HTML element is defined by a start tag, some content, and an end tag:</p>
            <pre><code>&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</code></pre>
            <p><strong>Example:</strong></p>
            <pre><code>&lt;h1&gt;My First Heading&lt;/h1&gt;
&lt;p&gt;My first paragraph.&lt;/p&gt;</code></pre>
            
            <h3>Basic HTML Document Structure</h3>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;This is a Heading&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

            <h3>Explanation:</h3>
            <ul>
                <li><code>&lt;!DOCTYPE html&gt;</code> - Declares this is an HTML5 document</li>
                <li><code>&lt;html&gt;</code> - Root element of an HTML page</li>
                <li><code>&lt;head&gt;</code> - Contains meta information about the document</li>
                <li><code>&lt;title&gt;</code> - Specifies a title for the document (shown in browser tab)</li>
                <li><code>&lt;body&gt;</code> - Contains the visible page content</li>
                <li><code>&lt;h1&gt;</code> - Defines a large heading</li>
                <li><code>&lt;p&gt;</code> - Defines a paragraph</li>
            </ul>

            <h3>HTML Headings</h3>
            <p>HTML headings are defined with <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> tags:</p>
            <pre><code>&lt;h1&gt;Heading 1&lt;/h1&gt; &lt;!-- Most important --&gt;
&lt;h2&gt;Heading 2&lt;/h2&gt;
&lt;h3&gt;Heading 3&lt;/h3&gt;
&lt;h4&gt;Heading 4&lt;/h4&gt;
&lt;h5&gt;Heading 5&lt;/h5&gt;
&lt;h6&gt;Heading 6&lt;/h6&gt; &lt;!-- Least important --&gt;</code></pre>

            <h3>HTML Paragraphs</h3>
            <p>HTML paragraphs are defined with the <code>&lt;p&gt;</code> tag:</p>
            <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;</code></pre>

            <h3>HTML Links</h3>
            <p>HTML links are defined with the <code>&lt;a&gt;</code> tag:</p>
            <pre><code>&lt;a href="https://www.example.com"&gt;This is a link&lt;/a&gt;</code></pre>
            <p>The <code>href</code> attribute specifies the destination address.</p>

            <h3>HTML Images</h3>
            <p>HTML images are defined with the <code>&lt;img&gt;</code> tag:</p>
            <pre><code>&lt;img src="image.jpg" alt="Description" width="500" height="600"&gt;</code></pre>
            <ul>
                <li><code>src</code> - specifies the path to the image</li>
                <li><code>alt</code> - specifies alternative text for the image</li>
                <li><code>width</code> and <code>height</code> - specify dimensions</li>
            </ul>

            <h3>HTML Lists</h3>
            <p><strong>Unordered List:</strong></p>
            <pre><code>&lt;ul&gt;
    &lt;li&gt;Coffee&lt;/li&gt;
    &lt;li&gt;Tea&lt;/li&gt;
    &lt;li&gt;Milk&lt;/li&gt;
&lt;/ul&gt;</code></pre>

            <p><strong>Ordered List:</strong></p>
            <pre><code>&lt;ol&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
    &lt;li&gt;Third item&lt;/li&gt;
&lt;/ol&gt;</code></pre>

            <h3>HTML Attributes</h3>
            <p>HTML attributes provide additional information about elements. Common attributes:</p>
            <ul>
                <li><code>id</code> - Specifies a unique id for an element</li>
                <li><code>class</code> - Specifies one or more classnames</li>
                <li><code>style</code> - Specifies an inline CSS style</li>
                <li><code>href</code> - Specifies the URL for a link</li>
                <li><code>src</code> - Specifies the URL for an image</li>
                <li><code>alt</code> - Specifies alternative text for an image</li>
            </ul>

            <h3>HTML Form Elements</h3>
            <pre><code>&lt;form action="/submit" method="POST"&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name"&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email"&gt;
    
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('html-example-1', 'html')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('html-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-html-example-1" data-original="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1 style=&quot;color: #2c5aa0;&quot;&gt;Welcome to HTML!&lt;/h1&gt;
    &lt;p&gt;Edit this code and click Run to see the changes.&lt;/p&gt;
    &lt;button onclick=&quot;alert('Hello!')&quot;&gt;Click Me&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1 style="color: #2c5aa0;"&gt;Welcome to HTML!&lt;/h1&gt;
    &lt;p&gt;Edit this code and click Run to see the changes.&lt;/p&gt;
    &lt;button onclick="alert('Hello!')"&gt;Click Me&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-html-example-1"></div>
                </div>
            </div>

            <h3>Common Tags</h3>
            <ul>
                <li><strong style="color: #000;">&lt;h1&gt;</strong> to <strong style="color: #000;">&lt;h6&gt;</strong> - Headings (h1 largest, h6 smallest)</li>
                <li><strong style="color: #000;">&lt;p&gt;</strong> - Paragraph</li>
                <li><strong style="color: #000;">&lt;a href="url"&gt;</strong> - Link</li>
                <li><strong style="color: #000;">&lt;img src="image.jpg" alt="description"&gt;</strong> - Image</li>
                <li><strong style="color: #000;">&lt;div&gt;</strong> - Container/Division (block-level)</li>
                <li><strong style="color: #000;">&lt;span&gt;</strong> - Inline container</li>
                <li><strong style="color: #000;">&lt;button&gt;</strong> - Clickable button</li>
                <li><strong style="color: #000;">&lt;input&gt;</strong> - Input field</li>
                <li><strong style="color: #000;">&lt;ul&gt;</strong> / <strong style="color: #000;">&lt;ol&gt;</strong> - Unordered/Ordered lists</li>
                <li><strong style="color: #000;">&lt;li&gt;</strong> - List item</li>
            </ul>

            <h3>Attributes</h3>
            <pre><code>&lt;div id="unique-id" class="style-class"&gt;
    &lt;a href="https://example.com" target="_blank"&gt;Link&lt;/a&gt;
    &lt;img src="photo.jpg" alt="Description" width="300"&gt;
&lt;/div&gt;</code></pre>

            <h3>Forms</h3>
            <pre><code>&lt;form action="/submit" method="POST"&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name" required&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email"&gt;
    
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('html-example-2', 'html')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('html-example-2')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-html-example-2" data-original="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
    &lt;h1&gt;HTML Lists Example&lt;/h1&gt;
    
    &lt;h2&gt;My Favorite Fruits:&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;Apples&lt;/li&gt;
        &lt;li&gt;Bananas&lt;/li&gt;
        &lt;li&gt;Oranges&lt;/li&gt;
    &lt;/ul&gt;
    
    &lt;h2&gt;Steps to Make Coffee:&lt;/h2&gt;
    &lt;ol&gt;
        &lt;li&gt;Boil water&lt;/li&gt;
        &lt;li&gt;Add coffee grounds&lt;/li&gt;
        &lt;li&gt;Pour hot water&lt;/li&gt;
        &lt;li&gt;Enjoy!&lt;/li&gt;
    &lt;/ol&gt;
&lt;/body&gt;
&lt;/html&gt;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
    &lt;h1&gt;HTML Lists Example&lt;/h1&gt;
    
    &lt;h2&gt;My Favorite Fruits:&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;Apples&lt;/li&gt;
        &lt;li&gt;Bananas&lt;/li&gt;
        &lt;li&gt;Oranges&lt;/li&gt;
    &lt;/ul&gt;
    
    &lt;h2&gt;Steps to Make Coffee:&lt;/h2&gt;
    &lt;ol&gt;
        &lt;li&gt;Boil water&lt;/li&gt;
        &lt;li&gt;Add coffee grounds&lt;/li&gt;
        &lt;li&gt;Pour hot water&lt;/li&gt;
        &lt;li&gt;Enjoy!&lt;/li&gt;
    &lt;/ol&gt;
&lt;/body&gt;
&lt;/html&gt;</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-html-example-2"></div>
                </div>
            </div>

            <div class="note">
                <strong>Tip:</strong> Always use semantic HTML tags like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, and &lt;footer&gt; for better accessibility and SEO. Always include alt attributes for images for accessibility.
            </div>
        `
    },

    css: {
        title: "CSS Tutorial",
        content: `
            <h2>CSS Tutorial</h2>
            <p><strong>CSS</strong> (Cascading Style Sheets) is used to style and layout web pages.</p>
            
            <h3>What is CSS?</h3>
            <ul>
                <li>CSS stands for Cascading Style Sheets</li>
                <li>CSS describes how HTML elements are to be displayed</li>
                <li>CSS saves a lot of work by controlling the layout of multiple pages at once</li>
                <li>External stylesheets are stored in CSS files (.css)</li>
                <li>CSS can control color, font, size, spacing, layout, and more</li>
            </ul>

            <h3>CSS Syntax</h3>
            <p>A CSS rule consists of a selector and a declaration block:</p>
            <pre><code>selector {
    property: value;
    property: value;
}</code></pre>

            <p><strong>Example:</strong></p>
            <pre><code>h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>h1</code> - <b>selector</b> (selects the HTML element to style)</li>
                <li><code>color</code> - <b>property</b> (aspect you want to style)</li>
                <li><code>blue</code> - <b>value</b> (setting for the property)</li>
            </ul>

            <h3>CSS Selectors</h3>
            <pre><code>/* Element Selector - selects all p elements */
p {
    color: red;
}

/* Class Selector - selects elements with class="my-class" */
.my-class {
    font-size: 16px;
}

/* ID Selector - selects element with id="my-id" */
#my-id {
    background-color: yellow;
}

/* Universal Selector - selects all elements */
* {
    margin: 0;
    padding: 0;
}

/* Group Selector - selects multiple elements */
h1, h2, h3 {
    font-family: Arial, sans-serif;
}

/* Descendant Selector - selects p inside div */
div p {
    color: blue;
}</code></pre>

            <h3>CSS Colors</h3>
            <p>Colors can be specified using different formats:</p>
            <pre><code>/* Named colors */
color: red;
color: blue;

/* Hex colors */
color: #FF0000;  /* Red */
color: #0000FF;  /* Blue */

/* RGB colors */
color: rgb(255, 0, 0);  /* Red */

/* RGBA colors (with transparency) */
color: rgba(255, 0, 0, 0.5);  /* Semi-transparent red */

/* HSL colors */
color: hsl(0, 100%, 50%);  /* Red */</code></pre>

            <h3>CSS Box Model</h3>
            <p>All HTML elements can be considered as boxes. The CSS box model consists of:</p>
            <ul>
                <li><b>Content</b> - The actual content of the box</li>
                <li><b>Padding</b> - Space around the content (inside border)</li>
                <li><b>Border</b> - A border around the padding</li>
                <li><b>Margin</b> - Space outside the border</li>
            </ul>

            <pre><code>div {
    width: 300px;
    padding: 20px;        /* Space inside */
    border: 5px solid black;
    margin: 30px;         /* Space outside */
}</code></pre>

            <h3>CSS Text Properties</h3>
            <pre><code>p {
    color: navy;
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.6;
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
}</code></pre>

            <h3>CSS Display Property</h3>
            <pre><code>/* Block-level element (takes full width) */
display: block;

/* Inline element (only takes necessary width) */
display: inline;

/* Flexbox (modern layout) */
display: flex;

/* Grid (modern layout) */
display: grid;

/* Hide element */
display: none;</code></pre>

            <h3>CSS Positioning</h3>
            <pre><code>/* Static (default - normal flow) */
position: static;

/* Relative to normal position */
position: relative;
top: 10px;
left: 20px;

/* Relative to nearest positioned ancestor */
position: absolute;

/* Relative to viewport (stays in place when scrolling) */
position: fixed;

/* Hybrid of relative and fixed */
position: sticky;</code></pre>

            <h3>CSS Flexbox (Modern Layout)</h3>
            <pre><code>.container {
    display: flex;
    justify-content: center;  /* Horizontal alignment */
    align-items: center;      /* Vertical alignment */
    gap: 10px;                /* Space between items */
    flex-direction: row;      /* or column */
}

.item {
    flex: 1;  /* Grow to fill space */
}</code></pre>

            <h3>Selectors</h3>
            <pre><code>/* Element selector */
p { color: blue; }

/* Class selector */
.my-class { font-size: 16px; }

/* ID selector */
#my-id { background: yellow; }

/* Descendant selector */
div p { margin: 10px; }

/* Multiple selectors */
h1, h2, h3 { font-family: Arial; }</code></pre>

            <h3>Common Properties</h3>
            <ul>
                <li><strong style="color: #000;">color</strong> - Text color</li>
                <li><strong style="color: #000;">background</strong> - Background color/image</li>
                <li><strong style="color: #000;">font-size</strong> - Text size (px, em, rem, %)</li>
                <li><strong style="color: #000;">margin</strong> - Outer spacing</li>
                <li><strong style="color: #000;">padding</strong> - Inner spacing</li>
                <li><strong style="color: #000;">border</strong> - Border around element</li>
                <li><strong style="color: #000;">width</strong> / <strong style="color: #000;">height</strong> - Element dimensions</li>
                <li><strong style="color: #000;">display</strong> - Display type (block, inline, flex, grid)</li>
                <li><strong style="color: #000;">position</strong> - Positioning (static, relative, absolute, fixed)</li>
            </ul>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('css-example-1', 'html')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('css-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-css-example-1" data-original="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;
        .box {
            width: 200px;
            padding: 20px;
            margin: 10px;
            background: #2c5aa0;
            color: white;
            border-radius: 8px;
            text-align: center;
        }
        
        .box:hover {
            background: #1e3d6e;
            transform: scale(1.05);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;box&quot;&gt;Hover over me!&lt;/div&gt;
    &lt;div class=&quot;box&quot;&gt;Edit the CSS above&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;
        .box {
            width: 200px;
            padding: 20px;
            margin: 10px;
            background: #2c5aa0;
            color: white;
            border-radius: 8px;
            text-align: center;
        }
        
        .box:hover {
            background: #1e3d6e;
            transform: scale(1.05);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="box"&gt;Hover over me!&lt;/div&gt;
    &lt;div class="box"&gt;Edit the CSS above&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-css-example-1"></div>
                </div>
            </div>

            <h3>Flexbox Layout</h3>
            <pre><code>.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.item {
    flex: 1;
}</code></pre>

            <h3>Grid Layout</h3>
            <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</code></pre>

            <h3>Responsive Design</h3>
            <pre><code>@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}</code></pre>

            <div class="note">
                <strong>Tip:</strong> Use CSS variables for consistent theming: <code>--primary-color: #61dafb;</code> then use with <code>color: var(--primary-color);</code>
            </div>
        `
    },

    javascript: {
        title: "JavaScript Basics",
        content: `
            <h2>JavaScript</h2>
            <p>JavaScript is a programming language that makes web pages interactive and dynamic.</p>
            
            <h3>Variables</h3>
            <pre><code>// Modern way (block-scoped)
let name = "John";
const age = 25;

// Old way (avoid)
var city = "New York";</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('js-example-1', 'javascript')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('js-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-js-example-1" data-original="// Try changing the values!
let name = 'Alice';
let age = 25;
let city = 'New York';

console.log('Name: ' + name);
console.log('Age: ' + age);
console.log('City: ' + city);
console.log(name + ' is ' + age + ' years old and lives in ' + city);">// Try changing the values!
let name = 'Alice';
let age = 25;
let city = 'New York';

console.log('Name: ' + name);
console.log('Age: ' + age);
console.log('City: ' + city);
console.log(name + ' is ' + age + ' years old and lives in ' + city);</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-js-example-1"></div>
                </div>
            </div>

            <h3>Data Types</h3>
            <pre><code>let string = "Hello";
let number = 42;
let boolean = true;
let array = [1, 2, 3, 4];
let object = { name: "Alice", age: 30 };
let nothing = null;
let notDefined = undefined;</code></pre>

            <h3>Functions</h3>
            <pre><code>// Function declaration
function greet(name) {
    return "Hello, " + name;
}

// Arrow function
const greet = (name) => {
    return \`Hello, \${name}\`;
};

// Shorter arrow function
const greet = name => \`Hello, \${name}\`;</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}

// Ternary operator
const status = age >= 18 ? "Adult" : "Minor";</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of loop (arrays)
for (const item of array) {
    console.log(item);
}

// forEach
array.forEach(item => console.log(item));</code></pre>

            <h3>DOM Manipulation</h3>
            <pre><code>// Select elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");

// Change content
element.textContent = "New text";
element.innerHTML = "&lt;b&gt;Bold text&lt;/b&gt;";

// Change styles
element.style.color = "red";

// Add event listener
element.addEventListener("click", () => {
    alert("Clicked!");
});</code></pre>

            <div class="note">
                <strong>Tip:</strong> Use <code>const</code> by default, only use <code>let</code> when you need to reassign. Never use <code>var</code>.
            </div>
        `
    },

    python: {
        title: "Python Tutorial",
        content: `
            <h2>Python Tutorial</h2>
            <p><strong>Python</strong> is a popular programming language that is easy to learn and powerful.</p>
            
            <h3>What is Python?</h3>
            <ul>
                <li>Python is a high-level, interpreted programming language</li>
                <li>Python has simple, easy-to-learn syntax that emphasizes readability</li>
                <li>Python is widely used for web development, data science, AI, and automation</li>
                <li>Python runs on Windows, Linux, Mac, and many other platforms</li>
                <li>Python is free and open-source</li>
            </ul>

            <h3>Python Syntax</h3>
            <p>Python syntax is simple and clean, using indentation for code blocks:</p>
            <pre><code>if 5 > 2:
    print("Five is greater than two!")</code></pre>
            <p><strong>Note:</strong> Python uses indentation (spaces or tabs) to define code blocks, not curly braces.</p>
            
            <h3>Variables and Data Types</h3>
            <pre><code># Variables (no declaration needed)
name = "Alice"
age = 25
height = 5.7
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(age))  # <class 'int'></code></pre>

            <h3>Python Operators</h3>
            <pre><code># Arithmetic Operators
print(10 + 5)   # Addition: 15
print(10 - 5)   # Subtraction: 5
print(10 * 5)   # Multiplication: 50
print(10 / 5)   # Division: 2.0
print(10 // 3)  # Floor division: 3
print(10 % 3)   # Modulus: 1
print(2 ** 3)   # Exponentiation: 8

# Comparison Operators
print(5 == 5)   # Equal: True
print(5 != 3)   # Not equal: True
print(5 > 3)    # Greater than: True

# Logical Operators
print(5 > 3 and 10 > 5)  # and: True
print(5 > 3 or 5 < 3)    # or: True
print(not(5 > 3))        # not: False</code></pre>

            <h3>Data Structures</h3>
            <pre><code># List (mutable)
fruits = ["apple", "banana", "orange"]
fruits.append("grape")

# Tuple (immutable)
coordinates = (10, 20)

# Dictionary
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Set
unique_numbers = {1, 2, 3, 4}</code></pre>

            <h3>Functions</h3>
            <pre><code>def greet(name):
    return f"Hello, {name}!"

def add(a, b=0):  # Default parameter
    return a + b

# Lambda function
square = lambda x: x ** 2</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")</code></pre>

            <h3>Loops</h3>
            <pre><code># For loop
for i in range(5):
    print(i)

# For loop with list
for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehension
squares = [x**2 for x in range(10)]</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('python-example-1', 'python')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('python-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-python-example-1" data-original="# Try editing this Python code!
name = 'Alice'
age = 25
fruits = ['apple', 'banana', 'cherry']

print(f'Name: {name}')
print(f'Age: {age}')
print(f'Fruits: {fruits}')

# Loop example
for fruit in fruits:
    print(f'I like {fruit}')

# List comprehension
numbers = [x * 2 for x in range(5)]
print(f'Doubled numbers: {numbers}')"># Try editing this Python code!
name = 'Alice'
age = 25
fruits = ['apple', 'banana', 'cherry']

print(f'Name: {name}')
print(f'Age: {age}')
print(f'Fruits: {fruits}')

# Loop example
for fruit in fruits:
    print(f'I like {fruit}')

# List comprehension
numbers = [x * 2 for x in range(5)]
print(f'Doubled numbers: {numbers}')</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-python-example-1"></div>
                </div>
            </div>

            <h3>Classes</h3>
            <pre><code>class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hi, I'm {self.name}"

person = Person("Alice", 25)
print(person.greet())</code></pre>

            <div class="note">
                <strong>Tip:</strong> Python uses indentation (4 spaces) to define code blocks. No curly braces needed!
            </div>
        `
    },

    java: {
        title: "Java Tutorial",
        content: `
            <h2>Java Tutorial</h2>
            <p><strong>Java</strong> is a popular programming language used for building enterprise applications, Android apps, and more.</p>
            
            <h3>What is Java?</h3>
            <ul>
                <li>Java is a high-level, class-based, object-oriented programming language</li>
                <li>Java is platform-independent ("Write Once, Run Anywhere")</li>
                <li>Java is used for mobile apps (Android), web apps, desktop apps, games, and more</li>
                <li>Java runs on billions of devices worldwide</li>
                <li>Java is secure, robust, and multithreaded</li>
            </ul>

            <h3>Java Syntax</h3>
            <p>Every Java program must have a class name that matches the filename and a main method:</p>
            <pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>public class Main</code> - Every Java program must have a class</li>
                <li><code>main()</code> - Required method, entry point of the program</li>
                <li><code>System.out.println()</code> - Prints text to console</li>
                <li>Every statement must end with a semicolon <code>;</code></li>
            </ul>

            <h3>Variables and Data Types</h3>
            <pre><code>// Primitive types
int number = 42;
double decimal = 3.14;
boolean isTrue = true;
char letter = 'A';
String text = "Hello";  // Reference type

// Constants
final int MAX_SIZE = 100;</code></pre>

            <h3>Arrays</h3>
            <pre><code>// Array declaration
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
names[0] = "Alice";

// ArrayList (dynamic)
import java.util.ArrayList;
ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("item");
list.get(0);</code></pre>

            <h3>Methods</h3>
            <pre><code>public static int add(int a, int b) {
    return a + b;
}

public static String greet(String name) {
    return "Hello, " + name;
}</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if (age >= 18) {
    System.out.println("Adult");
} else if (age >= 13) {
    System.out.println("Teenager");
} else {
    System.out.println("Child");
}

// Switch statement
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    default:
        System.out.println("Other day");
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// Enhanced for loop
for (String name : names) {
    System.out.println(name);
}

// While loop
while (count < 10) {
    count++;
}</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('java-example-1', 'java')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('java-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-java-example-1" data-original="// Try editing this Java code!
public class Main {
    public static void main(String[] args) {
        String name = 'Alice';
        int age = 25;
        String[] fruits = {'apple', 'banana', 'cherry'};
        
        System.out.println('Name: ' + name);
        System.out.println('Age: ' + age);
        
        // Loop through array
        for (String fruit : fruits) {
            System.out.println('I like ' + fruit);
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println('Count: ' + i);
        }
    }
}">// Try editing this Java code!
public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 25;
        String[] fruits = {"apple", "banana", "cherry"};
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        
        // Loop through array
        for (String fruit : fruits) {
            System.out.println("I like " + fruit);
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-java-example-1"></div>
                </div>
            </div>

            <h3>Classes and Objects</h3>
            <pre><code>public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public void greet() {
        System.out.println("Hi, I'm " + name);
    }
}

Person person = new Person("Alice", 25);
person.greet();</code></pre>

            <div class="note">
                <strong>Tip:</strong> Java file name must match the public class name. Main.java contains public class Main.
            </div>
        `
    },

    cpp: {
        title: "C++ Tutorial",
        content: `
            <h2>C++ Tutorial</h2>
            <p><strong>C++</strong> is a powerful general-purpose programming language.</p>
            
            <h3>What is C++?</h3>
            <ul>
                <li>C++ is a cross-platform language for creating high-performance applications</li>
                <li>C++ was developed as an extension of the C language</li>
                <li>C++ gives programmers high level of control over system resources and memory</li>
                <li>C++ is widely used in game development, browsers, operating systems, and embedded systems</li>
                <li>C++ supports both procedural and object-oriented programming</li>
            </ul>

            <h3>C++ Syntax</h3>
            <p>A simple C++ program:</p>
            <pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello World!";
    return 0;
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>#include &lt;iostream&gt;</code> - Header file for input/output</li>
                <li><code>using namespace std</code> - Use names from the std namespace</li>
                <li><code>int main()</code> - Main function, program entry point</li>
                <li><code>cout <<</code> - Output text to console</li>
                <li><code>return 0</code> - End the main function</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello, World!" &lt;&lt; endl;
    return 0;
}</code></pre>

            <h3>Variables and Data Types</h3>
            <pre><code>int number = 42;
double decimal = 3.14;
char letter = 'A';
bool isTrue = true;
string text = "Hello";

// Constants
const int MAX_SIZE = 100;

// Auto type
auto value = 10;  // Compiler determines type</code></pre>

            <h3>Arrays and Vectors</h3>
            <pre><code>// Array
int numbers[5] = {1, 2, 3, 4, 5};

// Vector (dynamic array)
#include &lt;vector&gt;
vector&lt;int&gt; nums = {1, 2, 3};
nums.push_back(4);
nums[0] = 10;</code></pre>

            <h3>Functions</h3>
            <pre><code>int add(int a, int b) {
    return a + b;
}

string greet(string name) {
    return "Hello, " + name;
}

// Function with default parameters
void print(string msg = "Default") {
    cout &lt;&lt; msg &lt;&lt; endl;
}</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if (age >= 18) {
    cout &lt;&lt; "Adult" &lt;&lt; endl;
} else if (age >= 13) {
    cout &lt;&lt; "Teenager" &lt;&lt; endl;
} else {
    cout &lt;&lt; "Child" &lt;&lt; endl;
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop
for (int i = 0; i < 5; i++) {
    cout &lt;&lt; i &lt;&lt; endl;
}

// Range-based for loop
for (int num : numbers) {
    cout &lt;&lt; num &lt;&lt; endl;
}

// While loop
while (count < 10) {
    count++;
}</code></pre>

            <h3>Classes</h3>
            <pre><code>class Person {
private:
    string name;
    int age;

public:
    Person(string n, int a) : name(n), age(a) {}
    
    string getName() {
        return name;
    }
    
    void greet() {
        cout &lt;&lt; "Hi, I'm " &lt;&lt; name &lt;&lt; endl;
    }
};

Person person("Alice", 25);
person.greet();</code></pre>

            <h3>Pointers and References</h3>
            <pre><code>int x = 10;
int* ptr = &x;  // Pointer
int& ref = x;   // Reference

cout &lt;&lt; *ptr &lt;&lt; endl;  // Dereference pointer</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('cpp-example-1', 'cpp')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('cpp-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-cpp-example-1" data-original="// Try editing this C++ code!
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string name = 'Alice';
    int age = 25;
    vector<string> fruits = {'apple', 'banana', 'cherry'};
    
    cout << 'Name: ' << name << endl;
    cout << 'Age: ' << age << endl;
    
    // Loop through vector
    for (const string& fruit : fruits) {
        cout << 'I like ' << fruit << endl;
    }

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('csharp-example-1', 'csharp')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('csharp-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-csharp-example-1" data-original="// Try editing this C# code!
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        string name = 'Alice';
        int age = 25;
        List<string> fruits = new List<string> { 'apple', 'banana', 'cherry' };
        
        Console.WriteLine('Name: ' + name);
        Console.WriteLine('Age: ' + age);
        
        // Loop through list
        foreach (string fruit in fruits) {
            Console.WriteLine('I like ' + fruit);
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            Console.WriteLine('Count: ' + i);
        }
    }
}">// Try editing this C# code!
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        string name = "Alice";
        int age = 25;
        List<string> fruits = new List<string> { "apple", "banana", "cherry" };
        
        Console.WriteLine("Name: " + name);
        Console.WriteLine("Age: " + age);
        
        // Loop through list
        foreach (string fruit in fruits) {
            Console.WriteLine("I like " + fruit);
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            Console.WriteLine("Count: " + i);
        }
    }
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-csharp-example-1"></div>
                </div>
            </div>
    
    // Traditional for loop
    for (int i = 0; i < 5; i++) {
        cout << 'Count: ' << i << endl;
    }
    
    return 0;
}">// Try editing this C++ code!
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string name = "Alice";
    int age = 25;
    vector<string> fruits = {"apple", "banana", "cherry"};
    
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    
    // Loop through vector
    for (const string& fruit : fruits) {
        cout << "I like " << fruit << endl;
    }
    
    // Traditional for loop
    for (int i = 0; i < 5; i++) {
        cout << "Count: " << i << endl;
    }
    
    return 0;
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-cpp-example-1"></div>
                </div>
            </div>

            <div class="note">
                <strong>Tip:</strong> Remember to include necessary headers and use <code>using namespace std;</code> or prefix with <code>std::</code>
            </div>
        `
    },

    csharp: {
        title: "C# Tutorial",
        content: `
            <h2>C# Tutorial</h2>
            <p><strong>C#</strong> (pronounced "C Sharp") is a modern programming language developed by Microsoft.</p>
            
            <h3>What is C#?</h3>
            <ul>
                <li>C# is a modern, object-oriented programming language by Microsoft</li>
                <li>C# runs on the .NET Framework</li>
                <li>C# is used for web apps, desktop apps, mobile apps, games (Unity), and more</li>
                <li>C# is similar to Java and C++</li>
                <li>C# is type-safe and supports modern programming paradigms</li>
            </ul>

            <h3>C# Syntax</h3>
            <p>A simple C# program:</p>
            <pre><code>using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>using System</code> - Import System namespace</li>
                <li><code>namespace</code> - Organizes code</li>
                <li><code>class</code> - Container for data and methods</li>
                <li><code>Main()</code> - Entry point of the program</li>
                <li><code>Console.WriteLine()</code> - Output text</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <pre><code>using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}</code></pre>

            <h3>Variables and Data Types</h3>
            <pre><code>int number = 42;
double decimal = 3.14;
string text = "Hello";
bool isTrue = true;
char letter = 'A';

// Var keyword (type inference)
var value = 10;

// Constants
const int MAX_SIZE = 100;</code></pre>

            <h3>Arrays and Lists</h3>
            <pre><code>// Array
int[] numbers = {1, 2, 3, 4, 5};

// List (dynamic)
using System.Collections.Generic;
List&lt;string&gt; names = new List&lt;string&gt;();
names.Add("Alice");
names.Add("Bob");</code></pre>

            <h3>Methods</h3>
            <pre><code>static int Add(int a, int b) {
    return a + b;
}

static string Greet(string name) {
    return $"Hello, {name}!";
}</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if (age >= 18) {
    Console.WriteLine("Adult");
} else if (age >= 13) {
    Console.WriteLine("Teenager");
} else {
    Console.WriteLine("Child");
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop
for (int i = 0; i < 5; i++) {
    Console.WriteLine(i);
}

// Foreach loop
foreach (string name in names) {
    Console.WriteLine(name);
}

// While loop
while (count < 10) {
    count++;
}</code></pre>

            <h3>Classes and Objects</h3>
            <pre><code>class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age) {
        Name = name;
        Age = age;
    }
    
    public void Greet() {
        Console.WriteLine($"Hi, I'm {Name}");
    }
}

Person person = new Person("Alice", 25);
person.Greet();</code></pre>

            <h3>LINQ (Language Integrated Query)</h3>
            <pre><code>using System.Linq;

var evenNumbers = numbers.Where(n => n % 2 == 0);
var doubled = numbers.Select(n => n * 2);</code></pre>

            <div class="note">
                <strong>Tip:</strong> Use string interpolation with <code>$"Hello, {name}"</code> for cleaner code.
            </div>
        `
    },

    php: {
        title: "PHP Tutorial",
        content: `
            <h2>PHP Tutorial</h2>
            <p><strong>PHP</strong> (Hypertext Preprocessor) is a server-side scripting language for web development.</p>
            
            <h3>What is PHP?</h3>
            <ul>
                <li>PHP is a server-side scripting language</li>
                <li>PHP is widely used for creating dynamic web pages</li>
                <li>PHP can interact with databases (MySQL, PostgreSQL, etc.)</li>
                <li>PHP files have extension ".php"</li>
                <li>PHP is free, open-source, and runs on various platforms</li>
            </ul>

            <h3>PHP Syntax</h3>
            <p>PHP code is executed on the server and sent to the browser as plain HTML:</p>
            <pre><code>&lt;?php
    echo "Hello World!";
?&gt;</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>&lt;?php ... ?&gt;</code> - PHP code block</li>
                <li><code>echo</code> - Output text or variables</li>
                <li>Statements end with semicolon <code>;</code></li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>PHP is a server-side scripting language widely used for web development.</p>
            
            <h3>Basic Syntax</h3>
            <pre><code>&lt;?php
echo "Hello, World!";
?&gt;</code></pre>

            <h3>Variables</h3>
            <pre><code>&lt;?php
$name = "Alice";
$age = 25;
$price = 19.99;
$isActive = true;

// Constants
define("MAX_SIZE", 100);
const DB_NAME = "mydb";
?&gt;</code></pre>

            <h3>Arrays</h3>
            <pre><code>&lt;?php
// Indexed array
$fruits = array("apple", "banana", "orange");
$fruits = ["apple", "banana", "orange"];  // Short syntax

// Associative array
$person = [
    "name" => "John",
    "age" => 30,
    "city" => "New York"
];

echo $person["name"];
?&gt;</code></pre>

            <h3>Functions</h3>
            <pre><code>&lt;?php
function greet($name) {
    return "Hello, " . $name;
}

function add($a, $b = 0) {  // Default parameter
    return $a + $b;
}

echo greet("Alice");
?&gt;</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('php-example-1', 'php')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('php-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-php-example-1" data-original="<?php
// Try editing this PHP code!
$name = 'Alice';
$age = 25;
$fruits = array('apple', 'banana', 'cherry');

echo 'Name: ' . $name . PHP_EOL;
echo 'Age: ' . $age . PHP_EOL;

// Loop through array
foreach ($fruits as $fruit) {
    echo 'I like ' . $fruit . PHP_EOL;
}

// For loop
for ($i = 0; $i < 5; $i++) {
    echo 'Count: ' . $i . PHP_EOL;
}

// Function
function greet($name) {
    return 'Hello, ' . $name . '!';
}

echo greet($name);
?>"><?php
// Try editing this PHP code!
$name = "Alice";
$age = 25;
$fruits = array("apple", "banana", "cherry");

echo "Name: " . $name . PHP_EOL;
echo "Age: " . $age . PHP_EOL;

// Loop through array
foreach ($fruits as $fruit) {
    echo "I like " . $fruit . PHP_EOL;
}

// For loop
for ($i = 0; $i < 5; $i++) {
    echo "Count: " . $i . PHP_EOL;
}

// Function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet($name);
?></textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-php-example-1"></div>
                </div>
            </div>

            <h3>Conditionals</h3>
            <pre><code>&lt;?php
if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teenager";
} else {
    echo "Child";
}
?&gt;</code></pre>

            <h3>Loops</h3>
            <pre><code>&lt;?php
// For loop
for ($i = 0; $i < 5; $i++) {
    echo $i;
}

// Foreach loop
foreach ($fruits as $fruit) {
    echo $fruit;
}

// Foreach with key
foreach ($person as $key => $value) {
    echo "$key: $value";
}
?&gt;</code></pre>

            <h3>Classes</h3>
            <pre><code>&lt;?php
class Person {
    private $name;
    private $age;
    
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function greet() {
        return "Hi, I'm " . $this->name;
    }
}

$person = new Person("Alice", 25);
echo $person->greet();
?&gt;</code></pre>

            <h3>Superglobals</h3>
            <pre><code>&lt;?php
$_GET      // URL parameters
$_POST     // Form data
$_SERVER   // Server information
$_SESSION  // Session variables
$_COOKIE   // Cookies
?&gt;</code></pre>

            <div class="note">
                <strong>Tip:</strong> Always use <code>&lt;?php ?&gt;</code> tags. Variables start with <code>$</code>. Concatenate strings with <code>.</code>
            </div>
        `
    },

    ruby: {
        title: "Ruby Tutorial",
        content: `
            <h2>Ruby Tutorial</h2>
            <p><strong>Ruby</strong> is a dynamic, open-source programming language with a focus on simplicity.</p>
            
            <h3>What is Ruby?</h3>
            <ul>
                <li>Ruby is a dynamic, object-oriented programming language</li>
                <li>Ruby focuses on simplicity and productivity</li>
                <li>Ruby has elegant syntax that is natural to read and easy to write</li>
                <li>Ruby is used for web development (Ruby on Rails), scripting, and more</li>
                <li>Everything in Ruby is an object</li>
            </ul>

            <h3>Ruby Syntax</h3>
            <p>Ruby has a clean, simple syntax:</p>
            <pre><code>puts "Hello World!"</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>puts</code> - Output text to console (with newline)</li>
                <li>No semicolons needed</li>
                <li>No parentheses required for method calls</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>Ruby is a dynamic, object-oriented language known for its elegant syntax and productivity.</p>
            
            <h3>Variables</h3>
            <pre><code># Variables
name = "Alice"
age = 25
price = 19.99
is_active = true

# Constants
MAX_SIZE = 100

# Symbols (immutable strings)
status = :active</code></pre>

            <h3>Data Structures</h3>
            <pre><code># Array
fruits = ["apple", "banana", "orange"]
fruits << "grape"  # Add item
fruits.push("mango")

# Hash (dictionary)
person = {
  name: "John",
  age: 30,
  city: "New York"
}

puts person[:name]</code></pre>

            <h3>Methods</h3>
            <pre><code>def greet(name)
  "Hello, #{name}!"
end

def add(a, b = 0)  # Default parameter
  a + b
end

# Block syntax
numbers = [1, 2, 3, 4, 5]
numbers.each { |num| puts num }

numbers.each do |num|
  puts num * 2
end</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('ruby-example-1', 'ruby')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('ruby-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-ruby-example-1" data-original="# Try editing this Ruby code!
name = 'Alice'
age = 25
fruits = ['apple', 'banana', 'cherry']

puts 'Name: ' + name
puts 'Age: ' + age.to_s

# Loop through array
fruits.each do |fruit|
  puts 'I like ' + fruit
end

# Times loop
5.times do |i|
  puts 'Count: ' + i.to_s
end

# Method
def greet(name)
  'Hello, ' + name + '!'
end

puts greet(name)"># Try editing this Ruby code!
name = "Alice"
age = 25
fruits = ["apple", "banana", "cherry"]

puts "Name: " + name
puts "Age: " + age.to_s

# Loop through array
fruits.each do |fruit|
  puts "I like " + fruit
end

# Times loop
5.times do |i|
  puts "Count: " + i.to_s
end

# Method
def greet(name)
  "Hello, " + name + "!"
end

puts greet(name)</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-ruby-example-1"></div>
                </div>
            </div>

            <h3>Conditionals</h3>
            <pre><code>if age >= 18
  puts "Adult"
elsif age >= 13
  puts "Teenager"
else
  puts "Child"
end

# Unless (opposite of if)
unless age < 18
  puts "Adult"
end

# Ternary operator
status = age >= 18 ? "Adult" : "Minor"</code></pre>

            <h3>Loops</h3>
            <pre><code># Times loop
5.times do |i|
  puts i
end

# Each loop
fruits.each do |fruit|
  puts fruit
end

# For loop
for i in 0..4
  puts i
end

# While loop
while count < 10
  count += 1
end</code></pre>

            <h3>Classes</h3>
            <pre><code>class Person
  attr_accessor :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def greet
    "Hi, I'm #{@name}"
  end
end

person = Person.new("Alice", 25)
puts person.greet</code></pre>

            <h3>String Manipulation</h3>
            <pre><code>text = "hello"
text.upcase      # "HELLO"
text.capitalize  # "Hello"
text.reverse     # "olleh"
text.length      # 5</code></pre>

            <div class="note">
                <strong>Tip:</strong> Ruby emphasizes readability. Use snake_case for variables and methods, CamelCase for classes.
            </div>
        `
    },

    go: {
        title: "Go Tutorial",
        content: `
            <h2>Go Tutorial</h2>
            <p><strong>Go</strong> (Golang) is a modern programming language developed by Google.</p>
            
            <h3>What is Go?</h3>
            <ul>
                <li>Go (Golang) is a statically typed, compiled programming language</li>
                <li>Go was designed at Google for system programming and web development</li>
                <li>Go is known for its simplicity, efficiency, and excellent concurrency support</li>
                <li>Go is great for building scalable network services and cloud applications</li>
                <li>Go compiles to native machine code for fast execution</li>
            </ul>

            <h3>Go Syntax</h3>
            <p>A simple Go program:</p>
            <pre><code>package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>package main</code> - Every Go program starts with a package declaration</li>
                <li><code>import "fmt"</code> - Import packages</li>
                <li><code>func main()</code> - Main function, entry point</li>
                <li><code>fmt.Println()</code> - Print output</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>Go is a statically typed, compiled language designed for simplicity and efficiency.</p>
            
            <h3>Basic Structure</h3>
            <pre><code>package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}</code></pre>

            <h3>Variables</h3>
            <pre><code>// Explicit type
var name string = "Alice"
var age int = 25
var price float64 = 19.99
var isActive bool = true

// Type inference
var city = "New York"

// Short declaration (inside functions)
message := "Hello"

// Constants
const MaxSize = 100</code></pre>

            <h3>Data Structures</h3>
            <pre><code>// Array (fixed size)
var numbers [5]int = [5]int{1, 2, 3, 4, 5}

// Slice (dynamic)
fruits := []string{"apple", "banana", "orange"}
fruits = append(fruits, "grape")

// Map
person := map[string]interface{}{
    "name": "John",
    "age":  30,
}

fmt.Println(person["name"])</code></pre>

            <h3>Functions</h3>
            <pre><code>func greet(name string) string {
    return "Hello, " + name
}

func add(a, b int) int {
    return a + b
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if age >= 18 {
    fmt.Println("Adult")
} else if age >= 13 {
    fmt.Println("Teenager")
} else {
    fmt.Println("Child")
}

// Switch
switch day {
case 1:
    fmt.Println("Monday")
case 2:
    fmt.Println("Tuesday")
default:
    fmt.Println("Other day")
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop (only loop in Go)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// Range loop
for index, fruit := range fruits {
    fmt.Println(index, fruit)
}

// While-style loop
for count < 10 {
    count++
}

// Infinite loop
for {
    break
}</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('go-example-1', 'go')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('go-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-go-example-1" data-original="// Try editing this Go code!
package main

import 'fmt'

func main() {
    name := 'Alice'
    age := 25
    fruits := []string{'apple', 'banana', 'cherry'}
    
    fmt.Println('Name:', name)
    fmt.Println('Age:', age)
    
    // Loop through slice
    for _, fruit := range fruits {
        fmt.Println('I like', fruit)
    }
    
    // For loop
    for i := 0; i < 5; i++ {
        fmt.Println('Count:', i)
    }
    
    // Function
    greeting := greet(name)
    fmt.Println(greeting)
}

func greet(name string) string {
    return 'Hello, ' + name + '!'
}">// Try editing this Go code!
package main

import "fmt"

func main() {
    name := "Alice"
    age := 25
    fruits := []string{"apple", "banana", "cherry"}
    
    fmt.Println("Name:", name)
    fmt.Println("Age:", age)
    
    // Loop through slice
    for _, fruit := range fruits {
        fmt.Println("I like", fruit)
    }
    
    // For loop
    for i := 0; i < 5; i++ {
        fmt.Println("Count:", i)
    }
    
    // Function
    greeting := greet(name)
    fmt.Println(greeting)
}

func greet(name string) string {
    return "Hello, " + name + "!"
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-go-example-1"></div>
                </div>
            </div>

            <h3>Structs</h3>
            <pre><code>type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return "Hi, I'm " + p.Name
}

person := Person{Name: "Alice", Age: 25}
fmt.Println(person.Greet())</code></pre>

            <h3>Goroutines (Concurrency)</h3>
            <pre><code>func printNumbers() {
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }
}

// Run concurrently
go printNumbers()

// Channels
ch := make(chan string)
go func() {
    ch <- "Hello"
}()
message := <-ch</code></pre>

            <div class="note">
                <strong>Tip:</strong> Go is opinionated about formatting. Use <code>gofmt</code> to automatically format your code.
            </div>
        `
    },

    rust: {
        title: "Rust Tutorial",
        content: `
            <h2>Rust Tutorial</h2>
            <p><strong>Rust</strong> is a systems programming language focused on safety and performance.</p>
            
            <h3>What is Rust?</h3>
            <ul>
                <li>Rust is a systems programming language focused on safety, speed, and concurrency</li>
                <li>Rust prevents memory errors at compile-time (no garbage collector)</li>
                <li>Rust is used for systems programming, web assembly, embedded systems, and more</li>
                <li>Rust provides performance comparable to C and C++</li>
                <li>Rust has a strong type system and ownership model</li>
            </ul>

            <h3>Rust Syntax</h3>
            <p>A simple Rust program:</p>
            <pre><code>fn main() {
    println!("Hello World!");
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>fn main()</code> - Main function, entry point</li>
                <li><code>println!()</code> - Macro for printing (note the !)</li>
                <li>Statements end with semicolon <code>;</code></li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>Rust is a systems programming language focused on safety, speed, and concurrency.</p>
            
            <h3>Basic Structure</h3>
            <pre><code>fn main() {
    println!("Hello, World!");
}</code></pre>

            <h3>Variables</h3>
            <pre><code>// Immutable by default
let name = "Alice";
let age = 25;

// Mutable
let mut count = 0;
count += 1;

// Type annotations
let price: f64 = 19.99;
let is_active: bool = true;

// Constants
const MAX_SIZE: u32 = 100;</code></pre>

            <h3>Data Types</h3>
            <pre><code>// Integers: i8, i16, i32, i64, u8, u16, u32, u64
let x: i32 = -42;
let y: u32 = 42;

// Floats: f32, f64
let pi: f64 = 3.14159;

// Strings
let s1: &str = "string slice";  // Immutable
let s2: String = String::from("owned string");  // Mutable</code></pre>

            <h3>Collections</h3>
            <pre><code>// Vector (dynamic array)
let mut numbers = vec![1, 2, 3, 4, 5];
numbers.push(6);

// Array (fixed size)
let arr: [i32; 5] = [1, 2, 3, 4, 5];

// HashMap
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert("Blue", 10);
scores.insert("Red", 50);</code></pre>

            <h3>Functions</h3>
            <pre><code>fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn add(a: i32, b: i32) -> i32 {
    a + b  // No semicolon = return value
}</code></pre>

            <h3>Conditionals</h3>
            <pre><code>if age >= 18 {
    println!("Adult");
} else if age >= 13 {
    println!("Teenager");
} else {
    println!("Child");
}

// Match (like switch)
match number {
    1 => println!("One"),
    2 => println!("Two"),
    _ => println!("Other"),
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// Loop (infinite)
loop {
    break;
}

// While
while count < 10 {
    count += 1;
}

// For
for i in 0..5 {
    println!("{}", i);
}

// Iterate over collection
for num in numbers.iter() {
    println!("{}", num);
}</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('rust-example-1', 'rust')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('rust-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-rust-example-1" data-original="// Try editing this Rust code!
fn main() {
    let name = 'Alice';
    let age = 25;
    let fruits = vec!['apple', 'banana', 'cherry'];
    
    println!('Name: {}', name);
    println!('Age: {}', age);
    
    // Loop through vector
    for fruit in &fruits {
        println!('I like {}', fruit);
    }
    
    // Range loop
    for i in 0..5 {
        println!('Count: {}', i);
    }
    
    // Function
    let greeting = greet(name);
    println!('{}', greeting);
}

fn greet(name: &str) -> String {
    format!('Hello, {}!', name)
}">// Try editing this Rust code!
fn main() {
    let name = "Alice";
    let age = 25;
    let fruits = vec!["apple", "banana", "cherry"];
    
    println!("Name: {}", name);
    println!("Age: {}", age);
    
    // Loop through vector
    for fruit in &fruits {
        println!("I like {}", fruit);
    }
    
    // Range loop
    for i in 0..5 {
        println!("Count: {}", i);
    }
    
    // Function
    let greeting = greet(name);
    println!("{}", greeting);
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-rust-example-1"></div>
                </div>
            </div>

            <h3>Structs and Impl</h3>
            <pre><code>struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> Person {
        Person { name, age }
    }
    
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}

let person = Person::new(String::from("Alice"), 25);
println!("{}", person.greet());</code></pre>

            <h3>Option and Result</h3>
            <pre><code>// Option (nullable)
let some_number: Option<i32> = Some(5);
let no_number: Option<i32> = None;

// Result (error handling)
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}</code></pre>

            <div class="note">
                <strong>Tip:</strong> Rust's ownership system prevents memory errors. Learn about borrowing, references, and lifetimes.
            </div>
        `
    },

    swift: {
        title: "Swift Tutorial",
        content: `
            <h2>Swift Tutorial</h2>
            <p><strong>Swift</strong> is a powerful programming language for iOS, macOS, and more.</p>
            
            <h3>What is Swift?</h3>
            <ul>
                <li>Swift is a powerful and intuitive programming language by Apple</li>
                <li>Swift is used for iOS, macOS, watchOS, and tvOS app development</li>
                <li>Swift is modern, safe, fast, and interactive</li>
                <li>Swift is designed to work with Apple's Cocoa and Cocoa Touch frameworks</li>
                <li>Swift is open-source and runs on Linux</li>
            </ul>

           <h3>Swift Syntax</h3>
            <p>A simple Swift program:</p>
            <pre><code>import Foundation

print("Hello, World!")</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>import Foundation</code> - Import system framework</li>
                <li><code>print()</code> - Output text to console</li>
                <li>No semicolons required (optional)</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>Swift is Apple's modern programming language for iOS, macOS, and other Apple platforms.</p>
            
            <h3>Variables</h3>
            <pre><code>// Variables (mutable)
var name = "Alice"
var age = 25

// Constants (immutable)
let pi = 3.14159
let maxSize = 100

// Type annotations
var price: Double = 19.99
var isActive: Bool = true</code></pre>

            <h3>Data Types</h3>
            <pre><code>// Basic types
let integer: Int = 42
let decimal: Double = 3.14
let text: String = "Hello"
let isTrue: Bool = true
let character: Character = "A"

// Optional (nullable)
var optionalName: String? = "Bob"
optionalName = nil</code></pre>

            <h3>Collections</h3>
            <pre><code>// Array
var fruits = ["apple", "banana", "orange"]
fruits.append("grape")

// Dictionary
var person = [
    "name": "John",
    "age": "30"
]

// Set
var uniqueNumbers: Set = [1, 2, 3, 4]</code></pre>

            <h3>Functions</h3>
            <pre><code>func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// Default parameters
func greet(name: String = "World") -> String {
    return "Hello, \\(name)!"
}</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('swift-example-1', 'swift')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('swift-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-swift-example-1" data-original="// Try editing this Swift code!
let name = 'Alice'
let age = 25
let fruits = ['apple', 'banana', 'cherry']

print('Name: \\(name)')
print('Age: \\(age)')

// Loop through array
for fruit in fruits {
    print('I like \\(fruit)')
}

// Range loop
for i in 0..<5 {
    print('Count: \\(i)')
}

// Function
func greet(name: String) -> String {
    return 'Hello, \\(name)!'
}

print(greet(name: name))">// Try editing this Swift code!
let name = "Alice"
let age = 25
let fruits = ["apple", "banana", "cherry"]

print("Name: \\(name)")
print("Age: \\(age)")

// Loop through array
for fruit in fruits {
    print("I like \\(fruit)")
}

// Range loop
for i in 0..<5 {
    print("Count: \\(i)")
}

// Function
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: name))</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-swift-example-1"></div>
                </div>
            </div>

            <h3>Conditionals</h3>
            <pre><code>if age >= 18 {
    print("Adult")
} else if age >= 13 {
    print("Teenager")
} else {
    print("Child")
}

// Switch
switch number {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}</code></pre>

            <h3>Loops</h3>
            <pre><code>// For-in loop
for i in 0..<5 {
    print(i)
}

// For-in with array
for fruit in fruits {
    print(fruit)
}

// While loop
while count < 10 {
    count += 1
}</code></pre>

            <h3>Classes and Structs</h3>
            <pre><code>class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func greet() -> String {
        return "Hi, I'm \\(name)"
    }
}

let person = Person(name: "Alice", age: 25)
print(person.greet())</code></pre>

            <h3>Optionals and Unwrapping</h3>
            <pre><code>var optionalName: String? = "Alice"

// Optional binding
if let name = optionalName {
    print("Name is \\(name)")
}

// Guard statement
guard let name = optionalName else {
    return
}

// Nil-coalescing
let displayName = optionalName ?? "Unknown"</code></pre>

            <div class="note">
                <strong>Tip:</strong> Use <code>let</code> by default and <code>var</code> only when mutation is needed. Handle optionals safely!
            </div>
        `
    },

    kotlin: {
        title: "Kotlin Tutorial",
        content: `
            <h2>Kotlin Tutorial</h2>
            <p><strong>Kotlin</strong> is a modern programming language for Android and JVM.</p>
            
            <h3>What is Kotlin?</h3>
            <ul>
                <li>Kotlin is a modern, statically typed programming language</li>
                <li>Kotlin is officially supported for Android development</li>
                <li>Kotlin runs on the JVM and is interoperable with Java</li>
                <li>Kotlin is concise, safe, and expressive</li>
                <li>Kotlin is used for server-side development, Android apps, and more</li>
            </ul>

            <h3>Kotlin Syntax</h3>
            <p>A simple Kotlin program:</p>
            <pre><code>fun main() {
    println("Hello World!")
}</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>fun main()</code> - Main function, entry point</li>
                <li><code>println()</code> - Print output</li>
                <li>No semicolons required</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>Kotlin is a modern, concise language for Android and JVM development, fully interoperable with Java.</p>
            
            <h3>Variables</h3>
            <pre><code>// Immutable (val)
val name = "Alice"
val age = 25

// Mutable (var)
var count = 0
count++

// Type annotations
val price: Double = 19.99
val isActive: Boolean = true

// Constants
const val MAX_SIZE = 100</code></pre>

            <h3>Data Types</h3>
            <pre><code>val number: Int = 42
val decimal: Double = 3.14
val text: String = "Hello"
val isTrue: Boolean = true
val letter: Char = 'A'

// Nullable types
var nullableName: String? = "Bob"
nullableName = null</code></pre>

            <h3>Collections</h3>
            <pre><code>// List (immutable)
val fruits = listOf("apple", "banana", "orange")

// MutableList
val mutableFruits = mutableListOf("apple", "banana")
mutableFruits.add("orange")

// Map
val person = mapOf(
    "name" to "John",
    "age" to 30
)

// Set
val uniqueNumbers = setOf(1, 2, 3, 4)</code></pre>

            <h3>Functions</h3>
            <pre><code>fun greet(name: String): String {
    return "Hello, $name!"
}

// Single expression
fun add(a: Int, b: Int) = a + b

// Default parameters
fun greet(name: String = "World"): String {
    return "Hello, $name!"
}

// Named arguments
greet(name = "Alice")</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('kotlin-example-1', 'kotlin')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('kotlin-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-kotlin-example-1" data-original="// Try editing this Kotlin code!
fun main() {
    val name = 'Alice'
    val age = 25
    val fruits = listOf('apple', 'banana', 'cherry')
    
    println('Name: $name')
    println('Age: $age')
    
    // Loop through list
    for (fruit in fruits) {
        println('I like $fruit')
    }
    
    // Range loop
    for (i in 0..4) {
        println('Count: $i')
    }
    
    // Function
    fun greet(name: String): String {
        return 'Hello, $name!'
    }
    
    println(greet(name))
}">// Try editing this Kotlin code!
fun main() {
    val name = "Alice"
    val age = 25
    val fruits = listOf("apple", "banana", "cherry")
    
    println("Name: $name")
    println("Age: $age")
    
    // Loop through list
    for (fruit in fruits) {
        println("I like $fruit")
    }
    
    // Range loop
    for (i in 0..4) {
        println("Count: $i")
    }
    
    // Function
    fun greet(name: String): String {
        return "Hello, $name!"
    }
    
    println(greet(name))
}</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-kotlin-example-1"></div>
                </div>
            </div>

            <h3>Conditionals</h3>
            <pre><code>if (age >= 18) {
    println("Adult")
} else if (age >= 13) {
    println("Teenager")
} else {
    println("Child")
}

// When (switch)
when (number) {
    1 -> println("One")
    2 -> println("Two")
    else -> println("Other")
}

// If as expression
val status = if (age >= 18) "Adult" else "Minor"</code></pre>

            <h3>Loops</h3>
            <pre><code>// For loop
for (i in 0..4) {
    println(i)
}

// For with step
for (i in 0..10 step 2) {
    println(i)
}

// For with collection
for (fruit in fruits) {
    println(fruit)
}

// While loop
while (count < 10) {
    count++
}</code></pre>

            <h3>Classes</h3>
            <pre><code>class Person(val name: String, var age: Int) {
    fun greet(): String {
        return "Hi, I'm $name"
    }
}

val person = Person("Alice", 25)
println(person.greet())

// Data class
data class User(val name: String, val age: Int)</code></pre>

            <h3>Null Safety</h3>
            <pre><code>var nullableName: String? = "Alice"

// Safe call
val length = nullableName?.length

// Elvis operator
val name = nullableName ?: "Unknown"

// Safe cast
val text = value as? String</code></pre>

            <h3>Extension Functions</h3>
            <pre><code>fun String.addExclamation(): String {
    return this + "!"
}

val greeting = "Hello".addExclamation()</code></pre>

            <div class="note">
                <strong>Tip:</strong> Kotlin's null safety prevents NullPointerExceptions. Use <code>?</code> for nullable types.
            </div>
        `
    },

    typescript: {
        title: "TypeScript Tutorial",
        content: `
            <h2>TypeScript Tutorial</h2>
            <p><strong>TypeScript</strong> is a typed superset of JavaScript.</p>
            
            <h3>What is TypeScript?</h3>
            <ul>
                <li>TypeScript is a strict syntactical superset of JavaScript</li>
                <li>TypeScript adds optional static typing to JavaScript</li>
                <li>TypeScript compiles to plain JavaScript</li>
                <li>TypeScript is developed and maintained by Microsoft</li>
                <li>TypeScript helps catch errors early and improves code quality</li>
            </ul>

            <h3>TypeScript Syntax</h3>
            <p>TypeScript adds type annotations to JavaScript:</p>
            <pre><code>let message: string = "Hello World!";
console.log(message);</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>: string</code> - Type annotation</li>
                <li>Types are optional but recommended</li>
                <li>All JavaScript code is valid TypeScript</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>TypeScript is JavaScript with type safety, providing better tooling and error detection.</p>
            
            <h3>Basic Types</h3>
            <pre><code>// Explicit types
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;
let items: number[] = [1, 2, 3];
let tuple: [string, number] = ["Alice", 25];

// Any (avoid when possible)
let anything: any = "hello";

// Unknown (safer than any)
let uncertain: unknown = 10;</code></pre>

            <h3>Interfaces</h3>
            <pre><code>interface Person {
    name: string;
    age: number;
    email?: string;  // Optional
}

const person: Person = {
    name: "John",
    age: 30
};

// Interface for functions
interface MathFunc {
    (a: number, b: number): number;
}

const add: MathFunc = (a, b) => a + b;</code></pre>

            <h3>Functions</h3>
            <pre><code>function greet(name: string): string {
    return \`Hello, \${name}\`;
}

// Arrow function with types
const add = (a: number, b: number): number => {
    return a + b;
};

// Optional parameters
function buildName(first: string, last?: string): string {
    return last ? \`\${first} \${last}\` : first;
}

// Default parameters
function greet(name: string = "World"): string {
    return \`Hello, \${name}\`;
}</code></pre>

            <h3>Type Aliases</h3>
            <pre><code>type ID = string | number;
type Point = { x: number; y: number };

let userId: ID = "abc123";
let point: Point = { x: 10, y: 20 };</code></pre>

            <h3>Classes</h3>
            <pre><code>class Person {
    private name: string;
    public age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    greet(): string {
        return \`Hi, I'm \${this.name}\`;
    }
}

const person = new Person("Alice", 25);
console.log(person.greet());</code></pre>

            <h3>Generics</h3>
            <pre><code>function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("hello");

// Generic interface
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: "hello" };</code></pre>

            <h3>Union and Intersection Types</h3>
            <pre><code>// Union (OR)
type Status = "active" | "inactive" | "pending";
let userStatus: Status = "active";

type ID = string | number;

// Intersection (AND)
type A = { name: string };
type B = { age: number };
type Person = A & B;

const person: Person = { name: "Alice", age: 25 };</code></pre>

            <h3>Type Guards</h3>
            <pre><code>function isString(value: any): value is string {
    return typeof value === "string";
}

if (isString(value)) {
    console.log(value.toUpperCase());
}</code></pre>

            <h3>Enums</h3>
            <pre><code>enum Direction {
    Up,
    Down,
    Left,
    Right
}

let dir: Direction = Direction.Up;

// String enums
enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE"
}</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('typescript-example-1', 'typescript')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('typescript-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-typescript-example-1" data-original="// Try editing this TypeScript code!
const name: string = 'Alice';
const age: number = 25;
const fruits: string[] = ['apple', 'banana', 'cherry'];

console.log('Name: ' + name);
console.log('Age: ' + age);

// Loop through array
fruits.forEach((fruit: string) => {
    console.log('I like ' + fruit);
});

// Interface
interface Person {
    name: string;
    age: number;
}

const person: Person = { name: name, age: age };
console.log('Person:', person);

// Function with type annotations
function greet(name: string): string {
    return 'Hello, ' + name + '!';
}

console.log(greet(name));">// Try editing this TypeScript code!
const name: string = "Alice";
const age: number = 25;
const fruits: string[] = ["apple", "banana", "cherry"];

console.log("Name: " + name);
console.log("Age: " + age);

// Loop through array
fruits.forEach((fruit: string) => {
    console.log("I like " + fruit);
});

// Interface
interface Person {
    name: string;
    age: number;
}

const person: Person = { name: name, age: age };
console.log("Person:", person);

// Function with type annotations
function greet(name: string): string {
    return "Hello, " + name + "!";
}

console.log(greet(name));</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-typescript-example-1"></div>
                </div>
            </div>

            <div class="note">
                <strong>Tip:</strong> Use <code>interface</code> for object shapes, <code>type</code> for unions/intersections. Enable strict mode in tsconfig.json!
            </div>
        `
    },

    sql: {
        title: "SQL Tutorial",
        content: `
            <h2>SQL Tutorial</h2>
            <p><strong>SQL</strong> (Structured Query Language) is used to manage and query databases.</p>
            
            <h3>What is SQL?</h3>
            <ul>
                <li>SQL stands for Structured Query Language</li>
                <li>SQL is used to communicate with databases</li>
                <li>SQL can retrieve, insert, update, and delete database records</li>
                <li>SQL is the standard language for relational database systems</li>
                <li>SQL works with MySQL, PostgreSQL, Oracle, SQL Server, and more</li>
            </ul>

            <h3>SQL Syntax</h3>
            <p>Basic SQL commands:</p>
            <pre><code>-- Select data
SELECT * FROM users;

-- Insert data
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- Update data
UPDATE users SET name = 'Jane' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;</code></pre>

            <p><strong>Explanation:</strong></p>
            <ul>
                <li><code>SELECT</code> - Retrieve data from database</li>
                <li><code>INSERT</code> - Add new records</li>
                <li><code>UPDATE</code> - Modify existing records</li>
                <li><code>DELETE</code> - Remove records</li>
                <li>SQL keywords are NOT case-sensitive (SELECT = select)</li>
            </ul>
            
            <h3>Basic Structure</h3>
            <p>SQL is the standard language for managing and querying relational databases.</p>
            
            <h3>SELECT Statement</h3>
            <pre><code>-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- With conditions
SELECT * FROM users WHERE age >= 18;

-- Multiple conditions
SELECT * FROM users 
WHERE age >= 18 AND status = 'active';

-- Order results
SELECT * FROM users ORDER BY created_at DESC;

-- Limit results
SELECT * FROM users LIMIT 10;</code></pre>

            <h3>INSERT Statement</h3>
            <pre><code>-- Insert single row
INSERT INTO users (name, email, age) 
VALUES ('Alice', 'alice@example.com', 25);

-- Insert multiple rows
INSERT INTO users (name, email, age) 
VALUES 
    ('Bob', 'bob@example.com', 30),
    ('Charlie', 'charlie@example.com', 28);</code></pre>

            <h3>UPDATE Statement</h3>
            <pre><code>-- Update single column
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET email = 'new@example.com', age = 26 
WHERE name = 'Alice';</code></pre>

            <h3>DELETE Statement</h3>
            <pre><code>-- Delete specific rows
DELETE FROM users WHERE id = 1;

-- Delete with condition
DELETE FROM users WHERE status = 'inactive';

-- Delete all rows (be careful!)
DELETE FROM users;</code></pre>

            <h3>CREATE TABLE</h3>
            <pre><code>CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>

            <h3>Joins</h3>
            <pre><code>-- INNER JOIN
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT u.name, o.total, p.name AS product
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id;</code></pre>

            <h3>Aggregate Functions</h3>
            <pre><code>-- Count
SELECT COUNT(*) FROM users;

-- Sum, Average
SELECT SUM(total) AS total_sales FROM orders;
SELECT AVG(age) FROM users;

-- Group by
SELECT status, COUNT(*) AS count
FROM users
GROUP BY status;

-- Having (filter groups)
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;</code></pre>

            <h3>Subqueries</h3>
            <pre><code>-- Subquery in WHERE
SELECT name FROM users
WHERE id IN (
    SELECT user_id FROM orders WHERE total > 100
);

-- Subquery in SELECT
SELECT name,
    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) AS order_count
FROM users;</code></pre>

            <h3>Common Functions</h3>
            <pre><code>-- String functions
SELECT UPPER(name), LOWER(email) FROM users;
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

-- Date functions
SELECT NOW(), CURDATE(), CURTIME();
SELECT DATE_FORMAT(created_at, '%Y-%m-%d') FROM users;

-- Math functions
SELECT ROUND(price, 2), CEIL(value), FLOOR(value) FROM products;</code></pre>

            <div class="try-it-editor">
                <div class="try-it-header">
                    <h4>Try it Yourself »</h4>
                    <div class="try-it-actions">
                        <button class="try-it-btn try-it-run" onclick="runCode('sql-example-1', 'sql')">Run Code</button>
                        <button class="try-it-btn try-it-reset" onclick="resetCode('sql-example-1')">Reset</button>
                    </div>
                </div>
                <div class="try-it-code">
                    <textarea id="code-sql-example-1" data-original="-- Try editing this SQL code!
-- Select all data
SELECT * FROM users;

-- Select specific columns
SELECT name, email, age FROM users;

-- Filter with WHERE
SELECT name, age FROM users
WHERE age >= 25;

-- Order results
SELECT name, age FROM users
ORDER BY age DESC;

-- Count records
SELECT COUNT(*) AS total_users FROM users;

-- Group by
SELECT age, COUNT(*) AS count
FROM users
GROUP BY age;

-- Join tables
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;">-- Try editing this SQL code!
-- Select all data
SELECT * FROM users;

-- Select specific columns
SELECT name, email, age FROM users;

-- Filter with WHERE
SELECT name, age FROM users
WHERE age >= 25;

-- Order results
SELECT name, age FROM users
ORDER BY age DESC;

-- Count records
SELECT COUNT(*) AS total_users FROM users;

-- Group by
SELECT age, COUNT(*) AS count
FROM users
GROUP BY age;

-- Join tables
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;</textarea>
                </div>
                <div class="try-it-output">
                    <h5>Output:</h5>
                    <div class="try-it-result" id="output-sql-example-1"></div>
                </div>
            </div>

            <div class="note">
                <strong>Tip:</strong> Always use WHERE clauses in UPDATE and DELETE. Use transactions for multiple operations. Index frequently queried columns.
            </div>
        `
    }
};

// Show tutorial function
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    const btn = document.querySelector('.nav-dropdown-btn');
    menu.classList.toggle('show');
    btn.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        const menu = document.getElementById('languageMenu');
        const btn = document.querySelector('.nav-dropdown-btn');
        if (menu) menu.classList.remove('show');
        if (btn) btn.classList.remove('active');
    }
});

function showTutorial(lang) {
    // Hide landing page
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.style.display = 'none';
    
    // Show content title and tutorial content
    const contentTitle = document.getElementById('contentTitle');
    const tutorialContent = document.getElementById('tutorialContent');
    if (contentTitle) contentTitle.style.display = 'block';
    if (tutorialContent) tutorialContent.style.display = 'block';
    
    // Update URL hash
    window.location.hash = lang;
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // If no event (called programmatically), find the link by lang
        const link = document.querySelector(`.nav-link[href="#${lang}"]`);
        if (link) link.classList.add('active');
    }
    
    // Update current language display
    const currentLang = document.getElementById('current-language');
    if (currentLang) {
        currentLang.textContent = lang.toUpperCase();
    }
    
    // Close dropdown menu
    const menu = document.getElementById('languageMenu');
    const btn = document.querySelector('.nav-dropdown-btn');
    if (menu) menu.classList.remove('show');
    if (btn) btn.classList.remove('active');
    
    // Display tutorial content
    const content = tutorials[lang];
    const pageTitle = document.getElementById('page-title');
    
    if (content) {
        tutorialContent.innerHTML = `
            <div class="tutorial-section active">
                ${content.content}
            </div>
        `;
        // Update page title
        if (pageTitle) {
            pageTitle.textContent = content.title || lang.toUpperCase() + ' Tutorial';
        }
    } else {
        tutorialContent.innerHTML = `
            <div class="tutorial-section active">
                <h2>Tutorial Coming Soon</h2>
                <p>The tutorial for ${lang} is currently being developed.</p>
            </div>
        `;
        if (pageTitle) {
            pageTitle.textContent = lang.toUpperCase() + ' Tutorial';
        }
    }
    
    // Scroll to top of content
    window.scrollTo(0, 0);
}

// Load tutorial based on URL hash or show landing page
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    
    if (hash) {
        // If there's a hash, show that tutorial
        showTutorial(hash);
    } else {
        // No hash, show landing page
        const landingPage = document.getElementById('landingPage');
        const contentTitle = document.getElementById('contentTitle');
        const tutorialContent = document.getElementById('tutorialContent');
        
        if (landingPage) landingPage.style.display = 'flex';
        if (contentTitle) contentTitle.style.display = 'none';
        if (tutorialContent) tutorialContent.style.display = 'none';
        
        // Update dropdown to show "Select Language"
        const currentLang = document.getElementById('current-language');
        if (currentLang) currentLang.textContent = 'Select Language';
    }
});

// Interactive Code Editor Functions
const languageNames = {
    'python': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'csharp': 'C#',
    'php': 'PHP',
    'ruby': 'Ruby',
    'go': 'Go',
    'rust': 'Rust',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'typescript': 'TypeScript',
    'sql': 'SQL'
};

function createTryItEditor(code, language, id) {
    const escapedCode = code.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `
        <div class="try-it-editor" id="editor-${id}">
            <div class="try-it-header">
                <h4>Try it Yourself »</h4>
                <div class="try-it-actions">
                    <button class="try-it-btn try-it-run" onclick="runCode('${id}', '${language}')">Run Code</button>
                    <button class="try-it-btn try-it-reset" onclick="resetCode('${id}')">Reset</button>
                </div>
            </div>
            <div class="try-it-code">
                <textarea id="code-${id}">${code}</textarea>
            </div>
            <div class="try-it-output">
                <h5>Output:</h5>
                <div class="try-it-result" id="output-${id}"></div>
            </div>
        </div>
    `;
}

function runCode(id, language) {
    const code = document.getElementById(`code-${id}`).value;
    const output = document.getElementById(`output-${id}`);
    
    if (language === 'html' || language === 'web') {
        // For HTML/CSS/JS, use iframe
        output.innerHTML = `<iframe id="iframe-${id}" style="width: 100%; min-height: 200px; border: 1px solid #ddd; border-radius: 4px;"></iframe>`;
        const iframe = document.getElementById(`iframe-${id}`);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
    } else if (language === 'javascript') {
        // For pure JavaScript
        output.innerHTML = '';
        const logs = [];
        const oldLog = console.log;
        console.log = function(...args) {
            logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            oldLog.apply(console, args);
        };
        
        try {
            eval(code);
            output.textContent = logs.length > 0 ? logs.join('\\n') : 'Code executed successfully (no output)';
            output.style.color = '#000';
        } catch (error) {
            output.textContent = 'Error: ' + error.message;
            output.style.color = '#f44336';
        } finally {
            console.log = oldLog;
        }
    } else {
        // For server-side languages, use OneCompiler embed
        const languageMap = {
            'python': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'csharp': 'csharp',
            'php': 'php',
            'ruby': 'ruby',
            'go': 'go',
            'rust': 'rust',
            'swift': 'swift',
            'kotlin': 'kotlin',
            'typescript': 'typescript',
            'sql': 'mysql'
        };
        
        const oneCompilerLang = languageMap[language] || language;
        const encodedCode = encodeURIComponent(code);
        
        output.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="margin-bottom: 15px; color: #666;">Click below to run your code in an interactive environment:</p>
                <a href="https://onecompiler.com/${oneCompilerLang}" target="_blank" 
                   style="display: inline-block; padding: 12px 24px; background: #4caf50; color: white; 
                          text-decoration: none; border-radius: 4px; font-weight: 500; transition: background 0.2s;"
                   onmouseover="this.style.background='#45a049'" 
                   onmouseout="this.style.background='#4caf50'">
                    Run ${languageNames[language]} Code on OneCompiler
                </a>
                <p style="margin-top: 10px; font-size: 12px; color: #999;">
                    (Code will be copied to clipboard - paste it in the compiler)
                </p>
            </div>
        `;
        
        // Copy code to clipboard for easy pasting
        navigator.clipboard.writeText(code).then(() => {
            console.log('Code copied to clipboard');
        }).catch(err => {
            console.log('Could not copy code:', err);
        });
    }
}

function resetCode(id) {
    const textarea = document.getElementById(`code-${id}`);
    const originalCode = textarea.getAttribute('data-original');
    if (originalCode) {
        textarea.value = originalCode;
    }
    document.getElementById(`output-${id}`).innerHTML = '';
}

// Store original code when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.try-it-code textarea').forEach(textarea => {
        textarea.setAttribute('data-original', textarea.value);
    });
});

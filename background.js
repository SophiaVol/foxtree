// geting canvas by Boujjou Achraf
var c = document.getElementById("c");
var ctx = c.getContext("2d");
        
// Check if user prefers dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Listen for changes in color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    location.reload(); // Reload to update the canvas background
});


//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 


// Function to generate random colors
function getRandomColor() {
    // Method 1: Expanded predefined color palette with more vibrant options
    const colors = [
      // Reds & Oranges
      "#FF5733", // Orange/Red
      "#FF3333", // Bright Red
      "#FF8C33", // Orange
      "#FF5500", // Deep Orange
      "#FF0066", // Hot Pink
      
      // Greens
      "#33FF57", // Bright Green
      "#00FF66", // Mint Green
      "#33FF99", // Sea Green
      "#00CC00", // Pure Green
      "#66FF00", // Lime Green
      
      // Blues
      "#3357FF", // Bright Blue
      "#0099FF", // Sky Blue
      "#3333FF", // Pure Blue
      "#00CCFF", // Cyan Blue
      "#0066FF", // Royal Blue
      
      // Purples & Pinks
      "#F533FF", // Pink/Purple
      "#CC33FF", // Violet
      "#9900FF", // Purple
      "#FF33A8", // Magenta
      "#FF00CC", // Hot Magenta
      
      // Cyans & Aquas
      "#33FFF5", // Cyan
      "#00FFFF", // Aqua
      "#33FFCC", // Teal
      "#00FFCC", // Turquoise
      
      // Yellows
      "#F0FF33", // Yellow
      "#FFFF00", // Bright Yellow
      "#FFCC00", // Gold
      "#FFEE00", // Canary
      
      // Special Colors
      "#FFFFFF", // White (rare, for emphasis)
      "#00FFAA", // Neon Mint
      "#FF00FF"  // Neon Pink
    ];
    
    // Method 2: HSL color generation for even more variety
    // Randomly decide whether to use predefined colors or generate one
    if (Math.random() > 0.4) {
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      // Generate vibrant colors using HSL
      // Use high saturation (100%) and optimized lightness (50-70%)
      const hue = Math.floor(Math.random() * 360); // Any hue value 0-359
      const saturation = 100; // Always fully saturated
      const lightness = Math.floor(Math.random() * 20) + 50; // Between 50-70% for visibility
      
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}

// Store colors for each column
var columnColors = [];
for(var i = 0; i < columns; i++) {
    columnColors[i] = getRandomColor();
}

// draw function draws the characters
function draw() {
    // Set background based on color scheme
    if (prefersDarkMode) {
        // Dark mode: dark background with low opacity
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    } else {
        // Light mode: light background with low opacity
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    }
    ctx.fillRect(0, 0, c.width, c.height);

    // Looping over drops
    for(var i = 0; i < drops.length; i++) {
        // Set random color for this column
        ctx.fillStyle = columnColors[i];
        ctx.font = font_size + "px arial";
        
        // A random character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        
        // x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        
        if(drops[i]*font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
            // Change color when the drop resets
            columnColors[i] = getRandomColor();
        }
        
        // Incrementing Y coordinate
        drops[i]++;
    }
}


setInterval(draw, 20);
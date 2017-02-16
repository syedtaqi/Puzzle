//Author:Syed Taqi Raza
// ----- Game Specific Variables ----- //
var Title = "NET3010 - Concentration"; // Name of game
var Images = 8; // Total number of unique images
var ImageWidth = 125; // Width of images
var ImageHeight = 125; // Height of images
var ImagesPerRow =4; // Number of images per row
var ImageExt = ".jpg"; // File Extension used for images (Example: .jpg or .gif)

// ----- Border Specific Variables ----- //
var UseBorder = 0; // 0 = Off  1 = On
var BorderCornerWidth = 10; // Width of Border Corner
var BorderCornerHeight = 10; // Height of Border Corner
var BorderHorizontalWidth = 100; // Width of Horizontal Border
var BorderVerticalHeight = 100; // Height of Vertical Border

// ----- Look and Feel ----- //
var DisplayTitle = 1; // Show title at top of page. 0 = Off  1 = On
var DisplayCredits = 1; // Show footer at bottom of page. 0 = Off  1 = On
var StartingBGColor = "#9999FF"; // Background color when game starts.
var CompletedBGColor = "#990066"; // Background color when game is completed.
var WidthBetweenImages = 10; // Width between each image
var BeforeWrongTimer = .5; // Length in seconds before wrong indication is displayed.
var WrongTimer = .5; // Length in seconds that wrong indicator will be displayed.
var ImagesBeginAs = 1; // 1 = Hidden 2 = Displayed

// ----- Debugging Options ----- //
// 1 = On   2 = Off //
var OptionRevealImages = 1; // Reveal Images Option
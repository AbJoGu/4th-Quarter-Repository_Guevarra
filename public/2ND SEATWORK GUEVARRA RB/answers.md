### Step 1
- Adds margins that are a set number of pixel away from the edges of the viewport and follows document flow

### Step 2
- position: fixed, fixes the element to a certain place in the viewport, no matter if you scroll, it stays in the same place

### Step 3
- position: absolute separtes the element from document flow, it differs from fixed as it changes with the scroll of the page

### Step 4
- .notice appears on top of .content because it has a higher the z-index, the higher the z-index the more "forward" it is, if you switch their z-indecies, they switch places

### Challenge questions
- Fixed does not follow the document flow, but relative does. Realtive is much lower in the viewport, but fixed is where it was when it was using position: absolute
- The higher the z-index, the more it is on top of other elements

### Reflection Questions
- a.) Static follows the document flow, with no margins or special properties. Relative lets you follow document flow while changing the element's distance from the viewport edges. Fixed does not allow the position of the element to change even when you scroll. Absolutes allows you to remove the element from document flow, allowing other elements to treat it like it doesn't  exist.
- b.) Absolute positioning allows the child element to only stay within its parent element, and cannot move outside of it.
- c.) Sticky acts like a position: relative element until a certain trigger point is hit, then it acts like a fixed element. But fixed always stays in the same place despite scrolling and does not require a trigger point.
- d.) Using ALAB as an example I would use position: absolute; top: 5%; left: 50%; tocenter it. Then I would create a background element for the text "ALAB: 2026" and set its z-index to 1, and the title text to 2. 
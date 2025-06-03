const moods = {
  adventurous: {
    base: [
      { baseHue: [25, 35], saturation: [10, 25], lightness: [15, 30] }, // warm earth brown
      { baseHue: [210, 230], saturation: [10, 20], lightness: [20, 35] }, // slate blue-gray
    ],
    secondary: [
      { baseHue: [15, 35], saturation: [70, 90], lightness: [55, 70] }, // golden orange
      { baseHue: [40, 50], saturation: [60, 80], lightness: [60, 75] }, // sun-washed amber
    ],
    accent: [
      { baseHue: [90, 110], saturation: [60, 80], lightness: [60, 75] }, // fresh jungle green
      { baseHue: [280, 300], saturation: [70, 90], lightness: [60, 75] }, // wild purple snap
    ],
  },
  affective: {
    base: [
      { baseHue: [330, 360], saturation: [10, 25], lightness: [20, 35] }, // deep rose/burgundy neutral
      { baseHue: [0, 10], saturation: [15, 25], lightness: [25, 35] }, // muted clay red
    ],
    secondary: [
      { baseHue: [340, 360], saturation: [50, 75], lightness: [65, 80] }, // romantic pinks
      { baseHue: [10, 20], saturation: [55, 75], lightness: [60, 75] }, // soft corals
    ],
    accent: [
      { baseHue: [250, 270], saturation: [40, 60], lightness: [70, 85] }, // dreamy lavender
      { baseHue: [45, 55], saturation: [50, 70], lightness: [70, 85] }, // champagne peach
    ],
  },
  affordable: {
    base: [
      { baseHue: [200, 220], saturation: [10, 20], lightness: [20, 35] }, // navy-teal or denim
      { baseHue: [90, 110], saturation: [10, 25], lightness: [25, 35] }, // muted olive
    ],
    secondary: [
      { baseHue: [160, 180], saturation: [40, 60], lightness: [65, 80] }, // mint greens
      { baseHue: [200, 220], saturation: [35, 55], lightness: [70, 85] }, // clear sky blues
    ],
    accent: [
      { baseHue: [45, 55], saturation: [60, 80], lightness: [70, 85] }, // golden yellows
      { baseHue: [20, 30], saturation: [60, 75], lightness: [65, 80] }, // value-focused terracottas
    ],
  },
  ageless: {
    base: [
      { baseHue: [220, 240], saturation: [5, 15], lightness: [20, 30] }, // slate blue-gray
      { baseHue: [30, 40], saturation: [10, 20], lightness: [25, 35] }, // warm taupe
    ],
    secondary: [
      { baseHue: [20, 40], saturation: [30, 50], lightness: [60, 75] }, // beige, sand, clay
      { baseHue: [260, 270], saturation: [25, 40], lightness: [65, 75] }, // lavender-gray
    ],
    accent: [
      { baseHue: [90, 110], saturation: [30, 50], lightness: [65, 80] }, // sage green
      { baseHue: [160, 180], saturation: [30, 45], lightness: [65, 80] }, // celadon
    ],
  },
  cozy: {
    base: [
      { baseHue: [10, 20], saturation: [10, 20], lightness: [20, 30] }, // deep red-browns
      { baseHue: [30, 35], saturation: [10, 25], lightness: [25, 35] }, // warm caramel/tan
    ],
    secondary: [
      { baseHue: [25, 40], saturation: [60, 80], lightness: [65, 75] }, // toasty golds and oranges
      { baseHue: [0, 10], saturation: [55, 75], lightness: [60, 70] }, // firelight reds
    ],
    accent: [
      { baseHue: [340, 360], saturation: [60, 80], lightness: [70, 80] }, // cranberry pinks
      { baseHue: [50, 60], saturation: [60, 80], lightness: [70, 80] }, // soft butterscotch
    ],
  },
  calm: {
    base: [
      { baseHue: [200, 220], saturation: [10, 20], lightness: [20, 30] }, // cool navy-gray
      { baseHue: [180, 200], saturation: [10, 20], lightness: [25, 35] }, // desaturated seafoam
    ],
    secondary: [
      { baseHue: [180, 200], saturation: [40, 60], lightness: [70, 85] }, // soft aquas
      { baseHue: [120, 150], saturation: [30, 50], lightness: [70, 85] }, // mint greens
    ],
    accent: [
      { baseHue: [250, 270], saturation: [30, 50], lightness: [75, 85] }, // periwinkle
      { baseHue: [220, 240], saturation: [30, 50], lightness: [70, 80] }, // dusty sky blue
    ],
  },
  bold: {
    base: [
      { baseHue: [0, 10], saturation: [10, 20], lightness: [15, 25] }, // burgundy/oxblood base
      { baseHue: [240, 260], saturation: [10, 20], lightness: [20, 30] }, // navy steel
    ],
    secondary: [
      { baseHue: [0, 60], saturation: [85, 100], lightness: [45, 60] }, // red/orange/yellow range
      { baseHue: [200, 240], saturation: [80, 100], lightness: [45, 60] }, // bold royal blues
    ],
    accent: [
      { baseHue: [280, 310], saturation: [85, 100], lightness: [55, 70] }, // electric magenta
      { baseHue: [50, 70], saturation: [90, 100], lightness: [60, 75] }, // shocking yellow
    ],
  },
  earthy: {
    base: [
      { baseHue: [30, 40], saturation: [10, 25], lightness: [20, 30] }, // warm soil brown
      { baseHue: [90, 110], saturation: [10, 25], lightness: [25, 35] }, // deep olive
    ],
    secondary: [
      { baseHue: [90, 120], saturation: [40, 60], lightness: [55, 70] }, // natural greens
      { baseHue: [30, 50], saturation: [40, 60], lightness: [55, 70] }, // clay/ochre
    ],
    accent: [
      { baseHue: [15, 25], saturation: [50, 70], lightness: [55, 70] }, // cinnamon/rust
      { baseHue: [200, 220], saturation: [40, 60], lightness: [65, 75] }, // blue stone
    ],
  },
  neon: {
    base: [
      { baseHue: [240, 260], saturation: [10, 20], lightness: [15, 25] }, // neutral dark violet
      { baseHue: [220, 230], saturation: [15, 25], lightness: [20, 30] }, // deep steel blue
    ],
    secondary: [
      { baseHue: [290, 310], saturation: [90, 100], lightness: [60, 70] }, // hot pink to purple neon
      { baseHue: [180, 200], saturation: [90, 100], lightness: [60, 75] }, // aqua-cyan neon
    ],
    accent: [
      { baseHue: [50, 70], saturation: [90, 100], lightness: [65, 80] }, // lime or electric yellow
      { baseHue: [0, 10], saturation: [90, 100], lightness: [60, 70] }, // neon red
    ],
  },
};

export default moods;

# Account Number Generator

A web-based application for generating account numbers based on various patterns with advanced pagination and export features.

## 🌟 Features

- **Pattern-Based Generation**: Support for 6 different pattern types
  - The Soloist (identical digits)
  - Hyphen-separated (block patterns)
  - The Full Straight (ascending/descending)
  - Cyclic Straight (cyclic sequences)
  - The Rhythmic Bridge (repeating patterns)
  - Thai Mobile No. (Thai mobile number patterns)

- **Advanced Pagination**
  - Display 1,000 items per page
  - Direct page navigation input
  - Smart pagination controls
  - Performance optimized for large datasets

- **Click-to-Copy Functionality**
  - Click any account number to copy to clipboard
  - Visual "Copied!" feedback
  - Clean number format (no dashes)

- **CSV Export**
  - Export all generated numbers
  - Column order: pattern_type, pattern, account_number
  - Duplicate removal with priority ordering

- **Wildcard Support**
  - Use "?" for any digit (0-9)
  - Wildcards can duplicate across positions
  - Full pattern flexibility

## 🚀 Live Demo

Visit: [https://saharatpaov.github.io/NumberGenerator](https://saharatpaov.github.io/NumberGenerator)

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/saharatpaov/NumberGenerator.git
cd NumberGenerator
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

3. Navigate to `http://localhost:8000`

## 📁 File Structure

```
├── index.html              # Main application
├── app.js                  # Core application logic
├── styles.css              # Styling and responsive design
├── performance-monitor.js  # Performance monitoring
└── README.md              # This file
```

## 🎯 Usage

1. **Select Pattern**: Choose from dropdown menu
2. **Add Pattern**: Click "เพิ่ม Pattern" to generate numbers
3. **Navigate**: Use pagination controls or direct page input
4. **Copy Numbers**: Click any account number to copy
5. **Export**: Click "Export เป็น CSV" to download all numbers

## 🔧 Pattern Types

### The Soloist
- All identical digits: `aaaaaaaaaa` → 0000000000, 1111111111, etc.
- 9 identical + 1 different: `?bbbbbbbbb` → 0111111111, 0222222222, etc.

### Hyphen-separated
- Block patterns: `bbbaaaaaaa` → 000-111-1111, 111-000-0000, etc.
- Mixed blocks: `aaabbbcccc` → 012-345-6789, etc.

### The Full Straight
- Ascending: `abcdefghij` → 123-456-7890
- Descending: `jihgfedcba` → 987-654-3210

### Cyclic Straight
- Cyclic ascending: `zabcdefghi` → 901-234-5678, etc.
- Cyclic descending: `ihgfedcbaz` → 876-543-2109, etc.

### The Rhythmic Bridge
- Repeating patterns: `abc???abc?` → 123-456-1237, etc.
- Front-middle repeat: `abcabc????` → 123-123-4567, etc.
- Middle-end repeat: `???abcabc?` → 456-123-1237, etc.
- Fully linked: `abcabcabc?` → 123-123-1234, etc.

### Thai Mobile No.
- Started with 06: `06????????` → 060-123-4567, 061-987-6543, etc.
- Started with 08: `08????????` → 080-234-5678, 081-876-5432, etc.
- Started with 09: `09????????` → 090-345-6789, 091-765-4321, etc.

## 🎨 Customization

The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-pink: #e91e63;
  --secondary-red: #f44336;
  --accent-orange: #ff9800;
  /* ... more variables */
}
```

## 📊 Performance

- Optimized for datasets up to 10M+ numbers
- Efficient pagination with caching
- Minimal DOM updates for smooth UX
- Memory-efficient CSV generation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2026 Saharat Paovarangkul

## 🐛 Bug Reports

Please report bugs via [GitHub Issues](https://github.com/saharatpaov/NumberGenerator/issues)
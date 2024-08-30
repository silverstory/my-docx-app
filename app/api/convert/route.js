// // app/api/convert/route.js
// import mammoth from 'mammoth';
// import path from 'path';
// import fs from 'fs';
// import { generateDocx } from '../../../lib/generateDocx';

// export async function GET() {
//   try {
//     // Dummy data for demonstration
//     const data = Array.from({ length: 500 }, (_, i) => ({
//       name: `Name ${i + 1}`,
//       telephone: `123-456-${String(i + 1).padStart(4, '0')}`,
//       email: `email${i + 1}@example.com`,
//       address: `Address ${i + 1}`,
//     }));

//     // Generate the .docx file
//     const outputPath = generateDocx(data);

//     // Convert .docx to HTML using Mammoth.js
//     const outputBuffer = fs.readFileSync(outputPath);
//     const { value: html } = await mammoth.convertToHtml({ buffer: outputBuffer });

//     return new Response(html, {
//       headers: { 'Content-Type': 'text/html' }
//     });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return new Response("An error occurred", { status: 500 });
//   }
// }


import mammoth from 'mammoth';
import path from 'path';
import fs from 'fs';
import { generateDocx } from '../../../lib/generateDocx';

export async function GET() {
  try {
    // Dummy data for demonstration
    const data = Array.from({ length: 500 }, (_, i) => ({
      name: `Name ${i + 1}`,
      telephone: `123-456-${String(i + 1).padStart(4, '0')}`,
      email: `email${i + 1}@example.com`,
      address: `Address ${i + 1}`,
    }));

    // Generate the .docx file
    const outputPath = await generateDocx(data);

    // Convert .docx to HTML using Mammoth.js
    const outputBuffer = fs.readFileSync(outputPath);
    const { value: html } = await mammoth.convertToHtml({ buffer: outputBuffer });

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("An error occurred", { status: 500 });
  }
}

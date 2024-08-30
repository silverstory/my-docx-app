// import fs from 'fs';
// import path from 'path';
// import { Document, Packer, Paragraph, TextRun } from 'docx';

// export async function generateDocx(data) {
//   try {
//     // Create a new Document
//     const doc = new Document({
//       creator: "Nigga",
//       title: "Sample Document",
//     });


//     // Create an array of children (Paragraphs) for the section
// const children = data.map(record => [
//   new Paragraph({
//     children: [new TextRun(`Name: ${record.name}`)],
//   }),
//   new Paragraph({
//     children: [new TextRun(`Telephone: ${record.telephone}`)],
//   }),
//   new Paragraph({
//     children: [new TextRun(`Email: ${record.email}`)],
//   }),
//   new Paragraph({
//     children: [new TextRun(`Address: ${record.address}`)],
//   }),
//   new Paragraph({
//     children: [new TextRun('-----------------------------------')],
//   }),
// ]).flat();

//     // Add the section to the document
//     doc.addSection({
//       children: children,
//     });

//     // Save the document to the 'public' directory
// const outputPath = path.resolve('./public/output.docx');
// const buffer = await Packer.toBuffer(doc);
// fs.writeFileSync(outputPath, buffer);

// return outputPath;
//   } catch (error) {
//     console.error("Error generating .docx file:", error.message);
//     throw error;
//   }
// }


// const para = new Paragraph({
//   text: "To whom it may concern:",
//   heading: HeadingLevel.HEADING_2,
//   alignment: AlignmentType.CENTER,
// });

// const name = new TextRun({
//   text: "Name:",
//   bold: true,
//   font: "Calibri",
//   allCaps: true,
// });

import * as fs from "fs";
import { AlignmentType, PageBreak, PageNumber, NumberFormat, convertInchesToTwip, Footer, Header, Document, HeadingLevel, LevelFormat, Packer, Paragraph, TextRun, UnderlineType } from "docx";

export async function generateDocx(data) {

  const children = data.map(record =>
    new Paragraph({
      spacing: {
        before: 200,
      },
      children: [
        new TextRun({
          text: `${record.name}`,
          bold: true,
        }),
        new TextRun({
          text: `\t${record.telephone}`,
          bold: true,
        }),
        new TextRun({
          text: `\t${record.email}`,
          bold: true,
        }),
        new TextRun({
          text: "_______________________________________________________________________",
          break: 1,
        }),
      ],
    }),
  );

  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  const doc = new Document({
    sections: [
      {
        properties: { titlePage: true, },
        // properties: {},
        headers: {
          default: new Header({ // The standard default header on every page or header on odd pages when the 'Different Odd & Even Pages' option is activated
            children: [
              new Paragraph({
                text: "HEADER ON EVERY PAGE",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          first: new Header({ // The header on first page when the 'Different First Page' option is activated
            children: [
              new Paragraph({
                text: "HEADER ON FIRST PAGE",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          even: new Header({ // The header on even pages when the 'Different Odd & Even Pages' option is activated
            children: [],
          }),
        },
        footers: {
          default: new Footer({ // The standard default footer on every page or footer on odd pages when the 'Different Odd & Even Pages' option is activated
            children: [
              new Paragraph({
                text: "FOOTER ON EVERY PAGE",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun("Foo Bar corp. "),
                  new TextRun({
                    children: ["Page Number: ", PageNumber.CURRENT],
                  }),
                  new TextRun({
                    children: [" to ", PageNumber.TOTAL_PAGES],
                  }),
                ],
              }),
            ],
          }),
          first: new Footer({ // The footer on first page when the 'Different First Page' option is activated
            children: [
              new Paragraph({
                text: "HEADER ON FIRST PAGE",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          even: new Footer({ // The footer on even pages when the 'Different Odd & Even Pages' option is activated
            children: [],
          }),
        },
        children: [...children],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("./public/output.docx", buffer);
  });

  // Done! A file called 'My Document.docx' will be in your file system.

  const outputPath = path.resolve('./public/output.docx');
  return outputPath;

}



// working
// import * as fs from "fs";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// export async function generateDocx() {
//   // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
//   // This simple example will only contain one section
//   const doc = new Document({
//     sections: [
//       {
//         properties: {},
//         children: [
//           new Paragraph({
//             children: [
//               new TextRun("Hello World"),
//               new TextRun({
//                 text: "Foo Bar",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: "\tGithub is the best",
//                 bold: true,
//               }),
//             ],
//           }),

//           new Paragraph({
//             children: [
//               new TextRun("Hello shit"),
//               new TextRun({
//                 text: "Foo shit",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: "\tGithub is the shit",
//                 bold: true,
//               }),
//             ],
//           }),

//         ],
//       },
//     ],
//   });

//   // Used to export the file into a .docx file
//   Packer.toBuffer(doc).then((buffer) => {
//     fs.writeFileSync("./My Document.docx", buffer);
//   });

//   // Done! A file called 'My Document.docx' will be in your file system.
// }
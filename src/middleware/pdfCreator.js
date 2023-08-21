const path = require('path');
const PDFDocument = require('pdfkit');
const fsnop = require('fs');
const fs = require('fs').promises;
const fsPromises = require('fs').promises;
const pdfKit = require('pdfkit');
exports.createPDF = () => {



// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF output to a file
doc.pipe(fs.createWriteStream('./receipt.pdf'));

// Add content to the PDF document
doc.fontSize(16).text('Receipt');
doc.moveDown();
doc.text('Thank you for your purchase!');
doc.moveDown();
doc.fontSize(12).text('Item 1: $10');
doc.text('Item 2: $20');
doc.moveDown();
doc.fontSize(16).text('Total: $30');

// Finalize the PDF document
doc.end();
}
function createPDF1() {
//exports.createPDF1 = () => {



// Create a new PDF document
const doc = new PDFDocument();



let companyLogo = "./images/companyLogo.png";
let fileName = 'sample-invoice.pdf';
let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';

let sellerInfo = {
"companyName": "Best Sales Pvt. Ltd.",
"address": "Mumbai Central",
"city": "Mumbai",
"state": "Maharashtra",
"pincode": "400017",
"country": "India",
"contactNo": "+910000000600"
}

let customerInfo = {
"customerName": "Customer ABC",
"address": "R783, Rose Apartments, Santacruz (E)",
"city": "Mumbai",
"state": "Maharashtra",
"pincode": "400054",
"country": "India",
"contactNo": "+910000000787"
}

let orderInfo = {
"orderNo": "15484659",
"invoiceNo": "MH-MU-1077",
"invoiceDate": "11/05/2021",
"invoiceTime": "10:57:00 PM",
"products": [
{
"id": "15785",
"name": "Acer Aspire E573",
"company": "Acer",
"unitPrice": 39999,
"totalPrice": 39999,
"qty": 1
},
{
"id": "15786",
"name": "Dell Magic Mouse WQ1545",
"company": "Dell",
"unitPrice": 2999,
"totalPrice": 5998,
"qty": 2
}
],
"totalValue": 45997
}

async function createPdf() {
try {

let pdfDoc = new pdfKit();
let stream =await fs.writeFile(path.join(__dirname,'receipt.pdf'),pdfDoc)
//let stream = fs.createWriteStream(path.join(__dirname,fileName));
pdfDoc.pipe(stream);

pdfDoc.text("Node.js - PDF Invoice creation using PDFKit library.", 5, 5, { align: "center", width: 600 });
//pdfDoc.image(companyLogo, 25, 20, { width: 50, height: 50 });
pdfDoc.font(fontBold).text('PARALLELCODES', 7, 75);
pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice/Bill Receipt', 400, 30, { width: 200 });
pdfDoc.fontSize(10).text('11-MAY-2021 10:24 PM', 400, 46, { width: 200 });

pdfDoc.font(fontBold).text("Sold by:", 7, 100);
pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, { width: 250 });
pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, { width: 250 });

pdfDoc.font(fontBold).text("Customer details:", 400, 100);
pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 145, { width: 250 });
pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 160, { width: 250 });

pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });

pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
pdfDoc.text("Product", 110, 256, { width: 190 });
pdfDoc.text("Qty", 300, 256, { width: 100 });
pdfDoc.text("Price", 400, 256, { width: 100 });
pdfDoc.text("Total Price", 500, 256, { width: 100 });

let productNo = 1;
orderInfo.products.forEach(element => {
console.log("adding", element.name);
let y = 256 + (productNo * 20);
pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
pdfDoc.text(element.name, 110, y, { width: 190 });
pdfDoc.text(element.qty, 300, y, { width: 100 });
pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
productNo++;
});

pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
productNo++;

pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

pdfDoc.end();
console.log("pdf generate successfully");
} catch (error) {
console.log("Error occurred", error);
}
}

createPdf();
}


async function generateReceipt1() {
    try {
      const doc = new PDFDocument();
      const outputPath = './receipt.pdf';
  
      doc.pipe(fs.createWriteStream(outputPath));
  
      doc.fontSize(18).text('Receipt', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text('Product: ABC', { align: 'left' });
      doc.moveDown();
      doc.fontSize(12).text('Price: $9.99', { align: 'left' });
      doc.moveDown();
      //doc.image('./product_image.jpg', { fit: [250, 250], align: 'center' });
  
      doc.end();
  
      console.log('Receipt generated successfully!');
    } catch (err) {
      console.error('Error generating receipt: ', err);
    }
  }
  

  async function generateReceipt(products, total) {
    let receipt = 'RECEIPT\n\n';
  
    products.forEach((product) => {
      receipt += `${product.name} - $${product.price}\n`;
    });
  
    receipt += `\nTOTAL: $${total}`;
  
    try {
        await fs.writeFile(path.join(__dirname,'receipt.pdf'), receipt)
        .then(() => console.log('Receipt saved to receipt.pdf....',))
        .catch((error) => console.error(`Error saving receipt: ${error}`));

    } catch (error) {
      console.error(`Error saving receipt: ${error}`);
    }
  }

  function createPDF2() {
    //exports.createPDF1 = () => {
    
    
    
    // Create a new PDF document
    const doc = new PDFDocument();
    
    
    
    let companyLogo = "./images/companyLogo.png";
    let fileName = 'sample-invoice.pdf';
    let fontNormal = 'Helvetica';
    let fontBold = 'Helvetica-Bold';
    
    let sellerInfo = {
    "companyName": "Best Sales Pvt. Ltd.",
    "address": "Mumbai Central",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400017",
    "country": "India",
    "contactNo": "+910000000600"
    }
    
    let customerInfo = {
    "customerName": "Customer ABC",
    "address": "R783, Rose Apartments, Santacruz (E)",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400054",
    "country": "India",
    "contactNo": "+910000000787"
    }
    
    let orderInfo = {
    "orderNo": "15484659",
    "invoiceNo": "MH-MU-1077",
    "invoiceDate": "11/05/2021",
    "invoiceTime": "10:57:00 PM",
    "products": [
    {
    "id": "15785",
    "name": "Acer Aspire E573opoop",
    "company": "Acer",
    "unitPrice": 39999,
    "totalPrice": 39999,
    "qty": 1
    },
    {
    "id": "15786",
    "name": "Dell Magic Mouse WQ1545",
    "company": "Dell",
    "unitPrice": 2999,
    "totalPrice": 5998,
    "qty": 2
    }
    ],
    "totalValue": 45997
    }

  async function generateReceipt() {
    try {
    const pdfDoc = new pdfKit();
    //const stream = fs.createWriteStream(path.join(__dirname, 'receipt.pdf'));
    //pdfDoc.pipe(stream);
    pdfDoc.text("Node.js - PDF Invoice creation using PDFKit library.", 5, 5, { align: "center", width: 600 });
    //pdfDoc.image(companyLogo, 25, 20, { width: 50, height: 50 });
    pdfDoc.font(fontBold).text('PARALLELCODES', 7, 75);
    pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice/Bill Receipt', 400, 30, { width: 200 });
    pdfDoc.fontSize(10).text('11-MAY-2021 10:24 PM', 400, 46, { width: 200 });

    pdfDoc.font(fontBold).text("Sold by:", 7, 100);
    pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
    pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
    pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, { width: 250 });
    pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, { width: 250 });

    pdfDoc.font(fontBold).text("Customer details:", 400, 100);
    pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
    pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
    pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 145, { width: 250 });
    pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 160, { width: 250 });

    pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
    pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
    pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });

    pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
    pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
    pdfDoc.text("Product", 110, 256, { width: 190 });
    pdfDoc.text("Qty", 300, 256, { width: 100 });
    pdfDoc.text("Price", 400, 256, { width: 100 });
    pdfDoc.text("Total Price", 500, 256, { width: 100 });

    let productNo = 1;
    orderInfo.products.forEach(element => {
    console.log("adding", element.name);
    let y = 256 + (productNo * 20);
    pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
    pdfDoc.text(element.name, 110, y, { width: 190 });
    pdfDoc.text(element.qty, 300, y, { width: 100 });
    pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
    pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
    productNo++;
    });

    pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
    productNo++;

    pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
    pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));
    //console.log('pdfDoc',pdfDoc)
    try {
        await fs.writeFile(path.join(__dirname,'receipt.pdf'), pdfDoc)
        .then(() => console.log('Receipt saved to receipt.pdf....',))
        .catch((error) => console.error(`Error saving receipt: ${error}`));

    } catch (error) {
      console.error(`Error saving receipt: ${error}`);
    }
    pdfDoc.end();
    } catch (error) {
    console.log("Error occurred", error);
    }
    }
    generateReceipt()

}

async function generateReceipts() {
    let companyLogo = "./images/companyLogo.png";
    let fileName = 'sample-invoice.pdf';
    let fontNormal = 'Helvetica';
    let fontBold = 'Helvetica-Bold';
    
    let sellerInfo = {
    "companyName": "Best Sales Pvt. Ltd.",
    "address": "Mumbai Central",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400017",
    "country": "India",
    "contactNo": "+910000000600"
    }
    
    let customerInfo = {
    "customerName": "Customer ABC",
    "address": "R783, Rose Apartments, Santacruz (E)",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400054",
    "country": "India",
    "contactNo": "+910000000787"
    }
    
    let orderInfo = {
    "orderNo": "15484659",
    "invoiceNo": "MH-MU-1077",
    "invoiceDate": "11/05/2021",
    "invoiceTime": "10:57:00 PM",
    "products": [
    {
    "id": "15785",
    "name": "Acer Aspire E573opoop",
    "company": "Acer",
    "unitPrice": 39999,
    "totalPrice": 39999,
    "qty": 1
    },
    {
    "id": "15786",
    "name": "Dell Magic Mouse WQ1545",
    "company": "Dell",
    "unitPrice": 2999,
    "totalPrice": 5998,
    "qty": 2
    }
    ],
    "totalValue": 45997
    }
    try {
      const pdfDoc = new pdfKit();
      pdfDoc.text("Node.js - PDF Invoice creation using PDFKit library.", 5, 5, { align: "center", width: 600 });
      pdfDoc.font(fontBold).text('PARALLELCODES', 7, 75);
      pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice/Bill Receipt', 400, 30, { width: 200 });
      pdfDoc.fontSize(10).text('11-MAY-2021 10:24 PM', 400, 46, { width: 200 });
      pdfDoc.font(fontBold).text("Sold by:", 7, 100);
      pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
      pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
      pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, { width: 250 });
      pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, { width: 250 });
      
      pdfDoc.font(fontBold).text("Customer details:", 400, 100);
      pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
      pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
      pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 145, { width: 250 });
      pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 160, { width: 250 });
      
      pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
      pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
      pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });
      
      pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
      pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
      pdfDoc.text("Product", 110, 256, { width: 190 });
      pdfDoc.text("Qty", 300, 256, { width: 100 });
      pdfDoc.text("Price", 400, 256, { width: 100 });
      pdfDoc.text("Total Price", 500, 256, { width: 100 });

      let productNo = 1;
      orderInfo.products.forEach(element => {
        console.log("adding", element.name);
        let y = 256 + (productNo * 20);
        pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
        pdfDoc.text(element.name, 110, y, { width: 190 });
        pdfDoc.text(element.qty, 300, y, { width: 100 });
        pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
        pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
        productNo++;
      });
  
      pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
      productNo++;
  
      pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
      pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));
  
      pdfDoc.end();
  
      const data = await new Promise((resolve, reject) => {
        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.on('error', reject);
      });
  
      await fs.writeFile(path.join(__dirname,'receipt.pdf'), data);
      console.log("pdf generate successfully");
    } catch (error) {
      console.log("Error occurred", error);
    }
  }

// const fs = require('fs');
//const path = require('path');
//const pdfKit = require('pdfkit');
const numberToText = require('number-to-text');
//const ordinal = require('number-to-text/converters/ordinal');

async function generatecustomReceipt(receivedFrom, amount) {
  // Generate a unique receipt number using the current timestamp
  const companyImage = fsnop.readFileSync(path.join(__dirname,'./house.png'))


  try {
    const receiptNumber = 9000;//`R${Date.now()}`;

    // Create a new PDF document
    const pdfDoc = new pdfKit();
    
    // Create a write stream for the PDF document
  
    
    // Set the font styles for the receipt
    const fontBold = 'Helvetica-Bold';
    const fontNormal = 'Helvetica';
    
    // Set the receipt title and header
    pdfDoc.font(fontBold).fontSize(20).text('Receipt', { align: 'center' });
    pdfDoc.font(fontBold).fontSize(20).text('Capital Hustle Building', { align: 'center' });

    pdfDoc.moveDown(2);
    pdfDoc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right', lineGap: 0 });
    pdfDoc.font(fontNormal).fontSize(16).text(`R No: ${receiptNumber}`, { lineGap: 0 });

    
    // Set the received from and amount fields
    pdfDoc.moveDown();
    //pdfDoc.fontSize(12).text(`Received from: ${receivedFrom}`);
    pdfDoc.fontSize(12).text(`Received from:\u00A0\u00A0\u00A0 ${receivedFrom}\u00A0\u00A0\u00A0`, { 
        underline: { color: '#000000', dash: 2, thickness: 0.5 } 
      });
    pdfDoc.moveDown(0.5);

    pdfDoc.fontSize(12).text(`The sum of Kenya shillings : ${receivedFrom}\u00A0\u00A0\u00A0Received from: ${receivedFrom}\u00A0\u00A0\u00A0`);
    pdfDoc.moveDown(0.5);
    pdfDoc.fontSize(12).text(`Being Payment of  : ${receivedFrom}`);

    pdfDoc.fontSize(12).text(`Received from: ${receivedFrom}\u00A0\u00A0\u00A0Date: ${new Date().toLocaleDateString()}`, { underline: true });
 
    pdfDoc.fontSize(12).text(`Received from: `);
    pdfDoc.moveUp();
    pdfDoc.moveDown(10);
    pdfDoc.fontSize(12).text(`Amount in words:`);



    pdfDoc.fontSize(12).text(`Amount: ${amount}`, { align: 'right' });
    pdfDoc.fontSize(12).text(`Amount in words:  dollars only.`);
    //pdfDoc.fontSize(12).text(`Amount in words: ${numberToText.convertToText(amount, { language: 'en', converter: ordinal })} dollars only.`);
    
    // End the PDF document
    pdfDoc.end();

    const data = await new Promise((resolve, reject) => {
      const chunks = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
    });

    await fs.writeFile(path.join(__dirname,'receipt.pdf'), data);
    console.log("pdf generate successfully");
  } catch (error) {
    console.log("Error occurred", error);
  }
}

// Example usage

  
    module.exports = {generateReceipts,generateReceipt,createPDF1,createPDF2,generatecustomReceipt};
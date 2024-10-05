
function addItem() {
  const itemContainer = document.getElementById("itemContainer");
  const newItem = document.createElement("div");
  newItem.className = "item";

  newItem.innerHTML = `
    <label for="itemDescription">Item Description:</label>
    <input type="text" class="itemDescription" required />

    <label for="itemQuantity">Quantity:</label>
    <input type="number" class="itemQuantity" required />

    <label for="itemPrice">Price per Item:</label>
    <input type="number" class="itemPrice" step="0.01" required />

    <label for="sgst">SGST (%):</label>
    <input type="number" class="sgst" step="0.01" required />

    <label for="cgst">CGST (%):</label>
    <input type="number" class="cgst" step="0.01" required />
  `;

  itemContainer.appendChild(newItem);
}

function generateInvoice() {
  const clientName = document.getElementById("clientName").value;
  const clientAddress = document.getElementById("clientAddress").value;

  const items = document.querySelectorAll(".item");
  let totalAmount = 0;
  let grandTotal = 0;
  let invoiceDetails = "";

  items.forEach(item => {
    const itemDescription = item.querySelector(".itemDescription").value;
    const itemQuantity = parseFloat(item.querySelector(".itemQuantity").value);
    const itemPrice = parseFloat(item.querySelector(".itemPrice").value);
    const cgstRate = parseFloat(item.querySelector(".cgst").value) / 100;
    const sgstRate = parseFloat(item.querySelector(".sgst").value) / 100;

    const itemTotal = itemQuantity * itemPrice;
    const cgstAmount = itemTotal * cgstRate;
    const sgstAmount = itemTotal * sgstRate;
    const itemGrandTotal = itemTotal + cgstAmount + sgstAmount;

    totalAmount += itemTotal;
    grandTotal += itemGrandTotal;

    invoiceDetails += `
      <h3>Item Description: ${itemDescription}</h3>
      <p>Quantity: ${itemQuantity}</p>
      <p>Price per Item: $${itemPrice.toFixed(2)}</p>
      <p>SGST (${(sgstRate * 100).toFixed(2)}%): $${sgstAmount.toFixed(2)}</p>
      <p>CGST (${(cgstRate * 100).toFixed(2)}%): $${cgstAmount.toFixed(2)}</p>
    `;
  });

  const invoiceContent = `
    <h1>Invoice</h1>
    <h2>Client Information</h2>
    <p><strong>Name:</strong> ${clientName}</p>
    <p><strong>Address:</strong> ${clientAddress}</p>
    <h2>Invoice Details</h2>
    ${invoiceDetails}
    <h2>Total Amount: Rs${totalAmount.toFixed(2)}</h2>
    <h2>Grand Total: Rs${grandTotal.toFixed(2)}</h2>
  `;

  const blob = new Blob([invoiceContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "invoice.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

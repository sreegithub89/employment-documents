// Document types (common for all companies)
const docTypes = [
  "Offer Letter",
  "Relieving Letter",
  "Experience Letter",
  "Resignation Letter",
  "Revision Letter",
  "Payslips"
];

// Function to generate a card dynamically
function generateCard(employee, company) {
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // clear previous card

  // Create card div
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.employee = employee;
  card.dataset.company = company;

  // Company heading
  const heading = document.createElement("h3");
  heading.textContent = company;
  card.appendChild(heading);

  // Document links
  const docLinks = document.createElement("div");
  docLinks.className = "doc-links";

  docTypes.forEach(doc => {
    const link = document.createElement("a");
    link.href = "#"; // replace with actual file URL
    link.textContent = doc;
    docLinks.appendChild(link);
  });

  card.appendChild(docLinks);
  container.appendChild(card);
}

// Initialize selectors
function init() {
  const employeeSelect = document.getElementById("emp-name");
  const companySelect = document.getElementById("company");

  function updateCard() {
    generateCard(employeeSelect.value, companySelect.value);
  }

  employeeSelect.addEventListener("change", updateCard);
  companySelect.addEventListener("change", updateCard);

  // Generate initial card
  updateCard();
}

document.addEventListener("DOMContentLoaded", init);

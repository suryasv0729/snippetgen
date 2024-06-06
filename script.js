const snippetOpt = [
  { label: "", type: "link", selector: "", apply_on: [""] },
  { label: "", type: "associate_link", selector: "", apply_on: [""] },
  {
    label: "",
    type: "click",
    delay: "1000",
    click_type: "click_once",
    "scrape on": "each_click",
    no_of_click: "",
    selector: "",
    apply_on: [""],
  },
  {
    label: "",
    type: "scroll",
    no_of_scroll: "",
    delay: "1000",
    apply_on: [""],
  },
  { label: "", type: "text", selector: "", regex: "", apply_on: [""] },
  {
    label: "",
    type: "attribute",
    selector: "",
    extract_attribute: "href",
    apply_on: [""],
  },
  { label: "", type: "element", selector: "", apply_on: [""] },
  {
    label: "",
    type: "key_value",
    selector: "",
    key_selector: "",
    value_selector: "",
    apply_on: [""],
  },
  {
    label: "",
    type: "table",
    selector: "",
    header_row_selector: "",
    data_row_selector: "",
    apply_on: [""],
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const typeList = document.querySelector(".List");
  const copyButton = document.querySelector(".copyBtn");
  const clearButton = document.querySelector(".clearBtn");
  const output = document.querySelector(".output");

  typeList.addEventListener("change", updateOutput);
  copyButton.addEventListener("click", copyToClipboard);
  clearButton.addEventListener("click", clearAll);

  function updateOutput() {
    const selectedOptions = [];

    document.querySelectorAll(".type").forEach((item) => {
      const type = item.getAttribute("data-type");
      const option = snippetOpt.find((opt) => opt.type === type);
      const checkboxes = item.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

      for (let i = 0; i < checkboxes.length; i++) {
        selectedOptions.push({ ...option });
      }
    });

    output.textContent = JSON.stringify(selectedOptions, null, 2);
  }

  function copyToClipboard() {
    const outputText = output.textContent;
    navigator.clipboard.writeText(outputText).then(
      () => {
        copyButton.textContent = "Copied";

        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  }

  function clearAll() {
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    output.textContent = "";
  }
});

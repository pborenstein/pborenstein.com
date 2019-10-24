module.exports = function hasMermaid(content, opt) {  
  if (content.includes('class="mermaid"')) {
    return `<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>
  <script>mermaid.initialize({ startOnLoad: true });</script>
`;
    } else {
    return "";
  }
}

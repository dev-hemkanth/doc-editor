var pages = [];
var currentPageIndex = 0;
var printDOM = document.getElementById('print-pages');
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [ 'link', 'image', 'video', 'formula' ], 
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: '                     Type here ...',
  theme: 'snow'
});


var editorContainer = document.querySelector('#editor');
var editorContainerHeight = editorContainer.getBoundingClientRect().height;

quill.on('text-change', function (delta, oldDelta, source) {
  var editorContentHeight = editorContainer.getBoundingClientRect().height;
  if (editorContentHeight > editorContainerHeight) {
    quill.deleteText(quill.getLength() - 1, 1);
  }
  console.log('change')
  updatePrintPageContent();
});


quill.root.addEventListener('paste', (event) => {
  // Get the editor's container element and its height
  var editorContentHeight = editorContainer.getBoundingClientRect().height;
  if (editorContentHeight > editorContainerHeight) {
    event.preventDefault();
  }
  updatePrintPageContent();
});


function clearContent() {
  quill.setContents([]);
}
function updateContent() {
  quill.root.innerHTML = pages[currentPageIndex];
}

function updatePrintPageContent() {
  pages[currentPageIndex] = quill.root.getInnerHTML()
}

function addPage() {
  currentPageIndex = pages.length;
  pages.push('');
  clearContent();
  updatePageIndexInNavBar();
}

function navNextPage() {
  if (currentPageIndex >= (pages.length - 1)) return;
  currentPageIndex++;
  updateContent();
  updatePageIndexInNavBar();
}

function navLastPage() {
  currentPageIndex = pages.length - 1;
  updateContent();
  updatePageIndexInNavBar();
}

function navPrevPage() {
  if (currentPageIndex <= 0) return;
  currentPageIndex--;
  updateContent();
  updatePageIndexInNavBar();
}

function navFirstPage() {
  currentPageIndex = 0;
  updateContent();
  updatePageIndexInNavBar();
}

function updatePageIndexInNavBar() {
  document.getElementById('current-page-index').innerText = currentPageIndex + 1;
  document.getElementById('total-page').innerText = pages.length;

}

function updatePrintPagesDOM() {
  printDOM.innerHTML = "";
  for (let i = 0; i < pages.length; i++) {
    const content = pages[i];
    const el = document.createElement('div');
    el.className ="print-page"
    el.innerHTML = content;
    printDOM.appendChild(el);
  }

  window.print()
}

addPage();
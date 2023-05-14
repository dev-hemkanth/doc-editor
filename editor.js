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

});


quill.root.addEventListener('paste', (event) => {
  console.log('copy', event)
  // Get the editor's container element and its height
  const container = quill.container;
  var editorContentHeight = editorContainer.getBoundingClientRect().height;
  if (editorContentHeight > editorContainerHeight) {
    event.preventDefault();
  }
});